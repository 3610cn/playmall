/**
 * ADM 2.0
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file FormAction基类
 * @author maoquan(maoquan0515@163.com)
 */
define(
    function (require) {
        var BaseFormAction = require('ub-ria/mvc/FormAction');
        var util = require('er/util');
        var u = require('underscore');

        /**
         * @constructor
         * @extends ub-ria/mvc/FormAction
         */
        function FormAction() {
            BaseFormAction.apply(this, arguments);
        }

        util.inherits(FormAction, BaseFormAction);

        /**
         * 当前Action的分组名称
         *
         * @type {string}
         * @override
         */
        FormAction.prototype.group = '';

        /**
         * 当前Action负责的实体的描述名称
         *
         * @type {string}
         * @override
         */
        FormAction.prototype.entityDescription = '';

        /**
         * 视图类型
         *
         * @type {function}
         * @override
         */
        FormAction.prototype.viewType = require('./FormView');

        /**
         * 数据模型类型
         *
         * @type {function}
         * @override
         */
        FormAction.prototype.modelType = require('./FormModel');

        /**
         * 临时保存实体，用于回来后恢复
         */
        function saveEntity() {
            var entity = this.view.getRawEntity();
            this.model.saveEntityState(entity);
        }

        FormAction.prototype.enter = function (context) {
            return BaseFormAction.prototype.enter.call(this, context);
        };

        /**
         * 获取表单提交成功后显示的信息
         * @return {string}
         */
        FormAction.prototype.getToastMessage = function () {
            var message = this.toastMessage;
            if (message == null) {
                return '';
            }

            if (message) {
                return u.template(message, entity || {});
            }
            else {
                var actionType = this.context.formType === 'update'
                    ? '修改'
                    : '创建';
                return actionType + '成功'
            }
        };

        /**
         * 初始化交互行为
         *
         * @override
         */
        FormAction.prototype.initBehavior = function () {
            BaseFormAction.prototype.initBehavior.apply(this, arguments);

            var me = this;
            this.view.on(
                'citychange',
                function () {
                    var city = this.get('city');
                    var mall = this.get('mall');
                    if (!city || !mall) {
                        return false;
                    }
                    var cityValue = city.getValue();
                    mall.setProperties(
                        {
                            datasource: me.model.getMallList(parseInt(cityValue, 10))
                        }
                    );
                }
            );

            this.view.on(
                'mallchange',
                function (event) {
                    var mall = this.get('mall');
                    var shop = this.get('shop');
                    if (!mall || !shop) {
                        return false;
                    }
                    var mallId = mall.getValue();
                    require('common/GlobalData').getInstance().loadShopList(mallId).then(
                        function (shopList) {
                            var newProperties = {datasource: shopList};
                            if (event.isFirst === true) {
                                var data = me.model.get('data');
                                u.extend(newProperties, {rawValue: data.shop})
                            }
                            shop.setProperties(newProperties);
                        }
                    );
                }
            );

            this.on(
                'entercomplete',
                function () {
                    this.view.fire('mallchange', {isFirst: true});
                }
            );
        };

        /**
         * 处理提交数据时发生的错误，默认无行为，如验证信息显示等需要实现此方法
         *
         * @protected
         * @method mvc.FormAction#handleSubmitError
         * @param {er.meta.FakeXHR | meta.FieldError[]} errors `XMLHttpRequest`对象，或者model校验的错误结果集
         * @return {boolean} 返回`true`表示错误已经处理完毕
         */
        FormAction.prototype.handleSubmitError = function (errors) {
            // 处理全局错误
            if (u.isString(errors.fields)) {
                this.view.notifyGlobalError(errors.fields);
                return true;
            }
            // 处理model校验产生的错误信息，或者后端校验返回的错误信息
            if (u.isObject(errors.fields)) {
                this.view.notifyErrors(errors);
                return true;
            }

            return false;
        };

        /**
         * 提交后的跳转
         */
        FormAction.prototype.submitHandler = {
            handle: function (entity, action) {
                var listPath = '/' + action.getEntityName() + '/list';
                action.redirect(listPath);
            }
        };

        /**
         * 在取消编辑后重定向
         */
        FormAction.prototype.redirectAfterCancel = function () {
            var listPath = '/' + this.getEntityName() + '/list';
            this.back(listPath);
        };

        FormAction.prototype.getEntityName = function () {
            var model = this.model;
            var data = model.data();
            return data.getEntityName();
        };

        return FormAction;
    }
);
