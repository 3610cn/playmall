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

        function FormModel() {
            BaseFormModel.apply(this, arguments);
            this.addData('global', GlobalData.getInstance());
        }

        util.inherits(FormModel, BaseFormModel);

        var baseDefaultDatasource = BaseFormModel.prototype.defaultDatasource;

        /**
         * 数据源配置
         *
         * @type {Object}
         * @override
         */
        FormModel.prototype.defaultDatasource = {
            /*
             * 日期起始时间
             */
            dateRange: function (model) {
                var rangeStart = moment().format('YYYY-MM-DD');
                var rangeEnd = '2030-12-31';
                return [rangeStart, rangeEnd].join(',');
            }
        };

        u.extend(FormModel.prototype.defaultDatasource, baseDefaultDatasource);

        /**
         * 对数据源进行预处理
         */
        FormModel.prototype.prepare = function () {

            if (this.get('formType') === 'create') {

            }
            else if (this.get('formType') === 'update') {
                // 设置发布日期
                var date = moment(
                    this.get('createTime'),
                    'YYYYMMDD'
                );
                date = date.format('YYYY-MM-DD');
                this.set('createTime', date);
            }
        };

        /**
         * 检验实体有效性
         *
         * @param {Object} entity 提交的实体
         * @return {Object[] | true} 返回`true`表示验证通过，否则返回错误字体
         */
        FormModel.prototype.validateEntity = function (entity) {
            var errorMsg = [];

            // 验证逻辑示例
            if (entity.hasOwnProperty('test')) {
                errorMsg.push(
                    {
                        field: '错误字段名',
                        message: '错误信息'
                    }
                );
            }

            if (errorMsg.length > 0) {
                return errorMsg;
            }
            else {
                return true;
            }
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
            return entity;
        };

        return FormModel;
    }
);
