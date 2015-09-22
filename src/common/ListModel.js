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

        ListModel.prototype.defaultDatasource = {
            base: {
                retrieve: function(model) {
                    var url = model.get('url');
                    // var query = url.getQuery();
                    // query = u.purify(query, null, true);

                    var path = url.getPath();
                    var splits = path.split('/');
                    var type = splits[1] || 'experience';
                    return {
                        entityName: type,
                        pascalEntityName: type.charAt(0).toUpperCase() + type.slice(1)
                    }
                },
                dump: true
            }
        };

        /**
         * 数据源配置
         *
         * @type {Object}
         * @override
         */
        ListModel.prototype.datasource = {
        };

        ListModel.prototype.getDatasource = function () {
            return u.extend(
                this.defaultDatasource,
                this.datasource
            );
        };

        /**
         * 对数据源进行预处理
         */
        ListModel.prototype.prepare = function () {
            this.set('user', GlobalData.getInstance().getUser());
        };

        /**
         * 获取请求后端的参数
         *
         * @return {Object}
         * @override
         */
        ListModel.prototype.getQuery = function () {
            var query = BaseListModel.prototype.getQuery.apply(this, arguments);
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

        ListModel.prototype.getUrlType = function (pascalType) {
            var url = this.get('url');
            var path = url.getPath();
            var splits = path.split('/');
            var type = splits[1] || 'experience';
            if (pascalType) {
                type = type.charAt(0).toUpperCase() + type.slice(1);
            }
            return type;
        };

        return ListModel;
    }
);
