/**
 * ADM 2.0
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 用户模块数据类
 * @author maoquan(maoquan0515@163.com)
 */
define(
    function (require) {
        var RequestManager = require('ub-ria/mvc/RequestManager');
        var RequestStrategy = require('ub-ria/mvc/RequestStrategy');
        var util = require('er/util');
        var u = require('underscore');

        /**
         *
         * @constructor
         * @extends ub-ria/mvc/RequestManager
         */
        function MallData(entityName) {
            RequestManager.call(this, entityName);
            this.setRequestStrategy(new RequestStrategy());
        }

        util.inherits(MallData, RequestManager);

        var requests = {
        };

        /**
         * 获取列表
         *
         * @return {er.Promise}
         */
        MallData.prototype.search = function (query) {
            var entityName = this.getEntityName();
            var pascalEntityName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
            return this.request(
                'mall/list',
                query,
                {
                    method: 'GET',
                    url: '/api/get' + pascalEntityName + 'List'
                }
            );
        };

        /**
         * 获取详情
         *
         * @return {er.Promise}
         */
        MallData.prototype.findById = function (id) {
            var entityName = this.getEntityName();
            var pascalEntityName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
            id = id ? '/' + id : '';
            return this.request(
                'mall/detail',
                null,
                {
                    method: 'GET',
                    url: '/api/get' + pascalEntityName + id
                }
            );
        };

        /**
         * 更新
         *
         * @param {entity} entity
         * @return {er.Promise}
         */
        MallData.prototype.update = function (entity) {
            var entityName = this.getEntityName();
            var pascalEntityName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
            return this.request(
                'mall/update',
                entity,
                {
                    method: 'POST',
                    url: '/api/add' + pascalEntityName
                }
            );
        };
        /**
         * 保存
         *
         * @param {entity} entity
         * @return {er.Promise}
         */
        MallData.prototype.save = function (entity) {
            return this.update(entity);
        };

        /**
         * 删除
         *
         * @param {Number} id
         * @return {er.Promise}
         */
        MallData.prototype.deleteById = function (id) {
            var entityName = this.getEntityName();
            var pascalEntityName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
            return this.request(
                'mall/delete',
                {
                    id: id
                },
                {
                    method: 'post',
                    url: '/api/delete' + pascalEntityName
                }
            );
        };

        u.each(
            requests,
            function (config) {
                var RequestManager = require('ub-ria/mvc/RequestManager');
                RequestManager.register(MallData, config.name, config);
            }
        );

        return MallData;
    }
);
