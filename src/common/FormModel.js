/**
 * ADM 2.0
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 业务表单基类
 * @author maoquan(maoquan@baidu.com)
 */
define(
    function (require) {
        var BaseFormModel = require('ub-ria/mvc/FormModel');
        var GlobalData = require('common/GlobalData');
        var util = require('er/util');
        var u = require('underscore');
        var moment = require('moment');
        var datasource = require('er/datasource');

        /**
         * 数据源配置
         *
         * @type {Object}
         * @override
         */
        var BASE = {
            base: {
                retrieve: function(model) {
                    var url = model.get('url');

                    var path = url.getPath();
                    var splits = path.split('/');
                    var type = splits[1] || 'experience';
                    return {
                        entityName: type,
                        pascalEntityName: type.charAt(0).toUpperCase() + type.slice(1)
                    }
                },
                dump: true
            },
            timeList: {
                retrieve: function(model) {
                    var timeList = [];
                    var start = moment('2000-01-01 23:30:00');
                    for (var i = 0; i < 48; i++) {
                        var time = start.add(30, 'm').format('hh:mm A');
                        timeList.push(
                            {
                                text: time,
                                value: time
                            }
                        );
                    }
                    return timeList;
                }
            },
            cityList: function (model) {
                var system = model.getSystem();
                return u.map(system.mallList, function (item) {return u.omit(item, 'children')});
            },
            mallList: function (model) {
                var data = model.get('data') || {};
                return model.getMallList(data.city);
            }
        };

        var SHOP = {
            shopList: function (model) {
                return [{text: '请选择', value: ''}];
            }
        };

        function FormModel() {
            BaseFormModel.apply(this, arguments);
            this.addData('global', GlobalData.getInstance());

            this.putDatasource(BASE);
            this.putDatasource(SHOP);
        }

        util.inherits(FormModel, BaseFormModel);

        /**
         * 对数据源进行预处理
         */
        FormModel.prototype.prepare = function () {

            this.set('user', GlobalData.getInstance().getUser());

            if (this.get('formType') === 'create') {
                this.set('data', {});
            }
            else if (this.get('formType') === 'update') {
                var data = this.get('data');
                var startTime = data.startTime;
                if (startTime) {
                    startTime = moment(startTime, 'YYYY-MM-DD hh:mm');
                    data.startDate = startTime.format('YYYY-MM-DD');
                    data.startTime = startTime.format('hh:mm A');
                }

                var endTime = data.endTime;
                if (endTime) {
                    endTime = moment(endTime, 'YYYY-MM-DD hh:mm');
                    data.endDate = endTime.format('YYYY-MM-DD');
                    data.endTime = endTime.format('hh:mm A');
                }
            }
        };

        /**
         * 检验实体有效性
         *
         * @param {Object} entity 提交的实体
         * @return {Object[] | true} 返回`true`表示验证通过，否则返回错误字体
         */
        FormModel.prototype.validateEntity = function (entity) {
            return true;
        };

        /**
         * 判断实体是否有变化
         *
         * @param {Object} entity 新的实体
         * @return {boolean}
         * @overide
         */
        FormModel.prototype.isEntityChanged = function (entity) {
            // 新建模式下的数据修正
            if (this.get('formType') === 'create') {
            }

            // 编辑模式下的数据修正
            if (this.get('formType') === 'update') {
            }
            return false;
        };

        /**
         * 临时保存实体信息
         *
         * @param {Object} entity 实体
         */
        FormModel.prototype.saveEntityState = function (entity) {
            var session = require('common/global/session');
            session.once('editingNews', entity);
        };

        /**
         * 检查实体数据完整性，可在此补充一些视图无法提供的属性
         *
         * @param {Object} entity 实体数据
         * @return {Object} 补充完整的实体数据
         */
        FormModel.prototype.fillEntity = function (entity) {
            var startDate = entity.startDate;
            var startTime = entity.startTime;
            if (startDate && startTime) {
                startDate = moment(startDate).format('YYYY-MM-DD');
                entity.startTime = moment(startDate + ' ' + startTime, 'YYYY-MM-DD hh:mm A').format('YYYY-MM-DD HH:mm');
                entity.startDate = undefined;
            }
            var endDate = entity.endDate;
            var endTime = entity.endTime;
            if (endDate && endTime) {
                endDate = moment(endDate).format('YYYY-MM-DD');
                entity.endTime = moment(endDate + ' ' + endTime, 'YYYY-MM-DD hh:mm A').format('YYYY-MM-DD HH:mm');
                entity.endDate = undefined;
            }
            return entity;
        };

        FormModel.prototype.getUrlType = function (pascalType) {
            var url = this.get('url');
            var path = url.getPath();
            var splits = path.split('/');
            var type = splits[1] || 'experience';
            if (pascalType) {
                type = type.charAt(0).toUpperCase() + type.slice(1);
            }
            return type;
        };

        FormModel.prototype.getSystem = function () {
            var globalData = this.data('global');
            return globalData.getSystem();
        };

        FormModel.prototype.getMallList = function (city) {
            var system = this.getSystem();
            var mallList = u.findWhere(system.mallList, {value: city}) || system.mallList[0];
            return mallList && mallList.children || [];
        };

        return FormModel;
    }
);
