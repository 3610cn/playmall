/**
 * ADM 2.0
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 体验、大咖模块数据类
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
        function ExperienceData(entityName) {
            RequestManager.call(this, entityName);
            this.setRequestStrategy(new RequestStrategy());
        }

        util.inherits(ExperienceData, RequestManager);

        var requests = {
        };

        /**
         * 获取列表
         *
         * @return {er.Promise}
         */
        ExperienceData.prototype.search = function (query) {
            var entityName = this.getEntityName();
            var pascalEntityName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
            return this.request(
                'experience/list',
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
        ExperienceData.prototype.findById = function (id) {
            var entityName = this.getEntityName();
            var pascalEntityName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
            id = id ? '/' + id : '';
            return this.request(
                'experience/detail',
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
        ExperienceData.prototype.update = function (entity) {
            var entityName = this.getEntityName();
            var pascalEntityName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
            return this.request(
                'experience/update',
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
        ExperienceData.prototype.save = function (entity) {
            return this.update(entity);
        };

        /**
         * 删除
         *
         * @param {Number} id
         * @return {er.Promise}
         */
        ExperienceData.prototype.deleteById = function (id) {
            var entityName = this.getEntityName();
            var pascalEntityName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
            return this.request(
                'experience/delete',
                {
                    id: id
                },
                {
                    method: 'post',
                    url: '/api/delete' + pascalEntityName
                }
            );
        };

        /**
         * 获取优惠详情
         *
         * @return {er.Promise}
         */
        ExperienceData.prototype.findCouponByMallId = function (id) {
            return this.request(
                'coupon/detail',
                null,
                {
                    method: 'GET',
                    url: '/api/getCouponList?mallId=' + id
                }
            );
        };


        u.each(
            requests,
            function (config) {
                var RequestManager = require('ub-ria/mvc/RequestManager');
                RequestManager.register(ExperienceData, config.name, config);
            }
        );

        return ExperienceData;
    }
);
