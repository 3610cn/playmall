/**
 * ADM 2.0
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file FormView基类
 * @author maoquan(maoquan0515@163.com)
 */
define(
    function (require) {
        var BaseFormView = require('ub-ria/mvc/FormView');
        var util = require('er/util');
        var u = require('underscore');
        var moment = require('moment');

        /**
         * FormView基类
         *
         * @constructor
         * @extends ub-ria/mvc/BaseFormView
         */
        function FormView() {
            BaseFormView.apply(this, arguments);
        }

        util.inherits(FormView, BaseFormView);

        /**
         * 使用的模板名称
         *
         * @type {string}
         */
        FormView.prototype.template = '';

        /**
         * 控件额外属性配置
         *
         * @type {Object}
         * @override
         */
        FormView.prototype.uiProperties = {
            // TODO: 添加控件的额外属性配置，如没有则删除该属性
        };

        /**
         * 控件事件配置
         *
         * @type {Object}
         * @override
         */
        FormView.prototype.uiEvents = {
        };

        /**
         * 渲染
         *
         * @override
         */
        FormView.prototype.enterDocument = function () {
            BaseFormView.prototype.enterDocument.apply(this, arguments);

            var model = this.model;

            if (model.get('formType') === 'update') {
            }

            if (model.get('formType') === 'create') {
                var titleInput = this.get('title');
                if (titleInput) {
                    titleInput.setValue('');
                }
            }
        };

        /**
         * 从表单中获取实体数据
         *
         * @return {Object}
         */
        FormView.prototype.getEntity = function () {
            var entity = BaseFormView.prototype.getEntity.apply(this, arguments);

            // 发布时间处理
            if (entity.createTime) {
                entity.createTime =
                    moment(entity.createTime.toString()).format('YYYYMMDD');
            }

            if (this.model.get('formType') === 'create') {
            }
            return entity;
        };

        FormView.prototype.getRawEntity = function () {
            return this.get('form').getData();
        };

        return FormView;
    }
);
