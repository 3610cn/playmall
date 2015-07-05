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
         * 健康资讯模块数据类
         *
         * @constructor
         * @extends ub-ria/mvc/RequestManager
         */
        function ExperienceData() {
            RequestManager.call(this, 'experience');
            this.setRequestStrategy(new RequestStrategy());
        }

        util.inherits(ExperienceData, RequestManager);

        var requests = {
        };

        /**
         * 获取健康资讯类别列表
         *
         * @return {er.Promise}
         */
        ExperienceData.prototype.search = function (query) {
            return this.request(
                'experience/list',
                query,
                {
                    method: 'GET',
                    url: '/experience/list'
                }
            );
        };

        /**
         * 获取健康资讯类别详情
         *
         * @return {er.Promise}
         */
        ExperienceData.prototype.findById = function (id) {
            return this.request(
                'experience/detail',
                null,
                {
                    method: 'GET',
                    url: '/api/getExperience/' + id
                }
            );
        };

        /**
         * 更新健康资讯类别
         *
         * @param {entity} entity
         * @return {er.Promise}
         */
        ExperienceData.prototype.update = function (entity) {
            return this.request(
                'experience/update',
                entity,
                {
                    method: 'POST',
                    url: '/api/addExperience'
                }
            );
        };
        /**
         * 保存健康资讯类别
         *
         * @param {entity} entity
         * @return {er.Promise}
         */
        ExperienceData.prototype.save = function (entity) {
            return this.update(entity);
        };

        /**
         * 停用指定类别
         *
         * @param {entity} entity
         * @return {er.Promise}
         */
        ExperienceData.prototype.disableById = function (id) {
            return this.request(
                'experience/disable',
                null,
                {
                    method: 'PUT',
                    url: '/experience/' + id + '/1'
                }
            );
        };

        /**
         * 恢复指定类别
         *
         * @param {Number} id
         * @return {er.Promise}
         */
        ExperienceData.prototype.enableById = function (id) {
            return this.request(
                'experience/enable',
                null,
                {
                    method: 'PUT',
                    url: '/experience/' + id + '/0'
                }
            );
        };

        /**
         * 删除指定类别
         *
         * @param {Number} id
         * @return {er.Promise}
         */
        ExperienceData.prototype.deleteById = function (id) {
            return this.request(
                'experience/delete',
                null,
                {
                    method: 'DELETE',
                    url: '/experience/' + id
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
