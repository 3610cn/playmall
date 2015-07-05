/**
 * ADM 2.0
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file ListModel基类,提供日历选择范围处理等  
 * @author maoquan(maoquan0515@163.com)
 */
define(
    function (require) {
        var BaseListModel = require('ub-ria/mvc/ListModel');
        var GlobalData = require('common/GlobalData');
        var util = require('er/util');
        var u = require('underscore');
        var m = require('moment');

        function ListModel() {
            BaseListModel.apply(this, arguments);
            this.addData('global', GlobalData.getInstance());
        }

        util.inherits(ListModel, BaseListModel);

        var datasource = require('er/datasource');

        ListModel.prototype.paramDateFormat = 'YYYYMMDD';
        ListModel.prototype.maxScope = Number.MAX_VALUE;
        // 默认的列表查询范围
        ListModel.prototype.defaultAvailableDays = 365;

        function formatToParamDate() {
            var pattern = this.paramDateFormat;
            var time = this.get('time');
            var begin = m(time.begin).format(pattern);
            var end = m(time.end).format(pattern);
            return {
                begin: begin,
                end: end
            };
        }

        var baseDefaultDatasource = BaseListModel.prototype.defaultDatasource;

        ListModel.prototype.defaultDatasource = {
            base: {
                retrieve: function(model) {
                    var url = model.get('url');
                    var query = url.getQuery();
                    query = u.purify(query, null, true);

                    var user = model.data('global').getUser();
                    var hospitalList = user['hospitalList'];
                    if (hospitalList && hospitalList.length && hospitalList[0].value !== '') {
                        hospitalList.unshift({ name: '全部医院', value: '' });
                    }

                    return {
                        hospitalList: hospitalList,
                        appType: user['appType'],
                        hospital: query.hospital || ''
                    }
                },
                dump: true
            },
            revisedQuery: function (model) {
                var url = model.get('url');
                var query = url.getQuery();
                query = u.purify(query, null, true);

                // 区间校正，
                // 如果需要校正，则返回校正后的值，
                // 如果不需要，则返回false
                return model.reviseQuery(query);
            },
            // 展示区间
            time: function (model) {
                var url = model.get('url');
                var query = url.getQuery();
                var revisedQuery = model.get('revisedQuery');
                if (revisedQuery) {
                    query = revisedQuery.query;
                }
                var startTime = query.startTime;
                var endTime = query.endTime;

                var time = model.getDisplayDuration(startTime, endTime);
                return time;
            },
            // 时间参数要跟随链接，这里保存到model里，方便取用
            timeParam: function (model) {
                var paramTime = formatToParamDate.call(model);
                return 'startTime=' + paramTime.begin
                    + '&endTime=' + paramTime.end;
            },
            // 允许选择的时间区间
            range: function (model) {
                return model.getSelectableRange();
            }
        };

        u.extend(ListModel.prototype.defaultDatasource, baseDefaultDatasource);

        /**
         * 获取pageSize
         */
        ListModel.prototype.getPageSize = function() {
            var getCookie = require('saber-cookie').get;
            return getCookie('pageSize');
        },

        /**
         * 设置pageSize
         */
        ListModel.prototype.updatePageSize = function(pageSize) {
            var setCookie = require('saber-cookie').set;
            setCookie('pageSize', pageSize || 20);
            return require('er/Deferred').resolved();
        },

        /**
         * 数据源配置
         *
         * @type {Object}
         * @override
         */
        ListModel.prototype.datasource = {
        };

        /**
         * 对数据源进行预处理
         */
        ListModel.prototype.prepare = function () {
        };

        /**
         * 请求参数修正，时间跨度判断在这里进行
         *
         * @param {Object} query
         * @return {Object} 修正后的结果，包含错误信息
         */
        ListModel.prototype.reviseQuery = function (query) {
            var begin = query.startTime;
            var end = query.endTime;
            var isRevised = false;
            if (begin && end) {
                begin = m(begin, this.paramDateFormat);
                end = m(end, this.paramDateFormat);
                // 1. 开始时间不能大于结束时间，否则交换。。。
                if (begin.isAfter(end)) {
                    var temp = begin.clone();
                    begin = end.clone();
                    end = temp;
                    isRevised = true;
                }

                var validEnd = m().endOf('day');
                // 2. 结束时间不能是未来
                if (end.toDate() > validEnd.toDate()) {
                    end = validEnd;
                    isRevised = true;
                }
                // 3. 查询日期间隔不能超过maxScope
                var validBegin = end.clone().subtract('d', this.maxScope - 1);
                // 超了
                if (validBegin.toDate() > begin.toDate()) {
                    begin = validBegin;
                    isRevised = true;
                }
            }

            if (isRevised) {
                query.startTime = begin.format(this.paramDateFormat);
                query.endTime = end.format(this.paramDateFormat);
                var displayBeginTime = begin.format(this.tableDateFormat);
                var displayEndTime = end.format(this.tableDateFormat);
                return {
                    message:
                        '日期输入有误：报告查询跨度不能超过'
                        + this.maxScope + '天；'
                        + '不能选择未来日期；起始时间不能在结束时间以后。'
                        + '现修正显示允许时间区间：'
                        + displayBeginTime + '至' + displayEndTime + '的数据。',
                    query: query
                };
            }
            return isRevised;
        };

        /**
         * 获取日历可选范围
         *
         *
         * @return {Object}
         */
        ListModel.prototype.getSelectableRange = function () {
            // 今天之后的日子不能选
            return {
                end: m().startOf('day').toDate()
            };
        };

        /**
         * 获取图表默认显示区间
         *
         * @param {string} beginTime 开始时间
         * @param {string} endTime 结束时间
         * @return {Object}
         */
        ListModel.prototype.getDisplayDuration = function (beginTime, endTime) {
            if (beginTime && endTime) {
                return {
                    begin: m(beginTime, 'YYYYMMDD').toDate(),
                    end: m(endTime, 'YYYYMMDD').toDate()
                };
            }

            var now = m().startOf('day');

            var begin = now.clone().subtract('days', this.defaultAvailableDays).toDate();
            var end = now.clone().subtract('day', -1).toDate();

            return {
                begin: begin,
                end: end
            };
        };

        /**
         * 获取请求后端的参数
         *
         * @return {Object}
         * @override
         */
        ListModel.prototype.getQuery = function () {
            var query = BaseListModel.prototype.getQuery.apply(this, arguments);
            var paramTime = formatToParamDate.call(this);
            util.mix(
                query, 
                {
                    startTime: paramTime.begin,
                    endTime: paramTime.end
                }
            );
            return query;
        };

        /**
         * 停用
         *
         * @return {Object}
         * @override
         */
        ListModel.prototype.disableById = function (id) {
            return this.data().disableById(id);
        }

        /**
         * 恢复
         *
         * @return {Object}
         * @override
         */
        ListModel.prototype.enableById = function (id) {
            return this.data().enableById(id);
        }

        /**
         * 删除指定类别
         *
         * @return {Object}
         * @override
         */
        ListModel.prototype.deleteById = function (id) {
            return this.data().deleteById(id);
        }

        return ListModel;
    }
);
