/**
 * ADM 2.0
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 列表Action基类
 * @author maoquan(maoquan0515@163.com)
 */
define(
    function (require) {
        var util = require('er/util');
        var BaseListAction = require('ub-ria/mvc/ListAction');
        var u = require('underscore');

        /**
         * @constructor
         * @extends ub-ria/mvc/ListAction
         */
        function ListAction() {
            BaseListAction.apply(this, arguments);
        }

        util.inherits(ListAction, BaseListAction);

        /**
         * 当前Action的分组名称
         *
         * @type {string}
         * @override
         */
        ListAction.prototype.group = '';

        /**
         * 当前Action负责的实体的描述名称
         *
         * @type {string}
         * @override
         */
        ListAction.prototype.entityDescription = '';

        /**
         * 视图类型
         *
         * @type {function}
         * @override
         */
        ListAction.prototype.viewType = require('./ListView');

        /**
         * 数据模型类型
         *
         * @type {function}
         * @override
         */
        ListAction.prototype.modelType = require('./ListModel');

        /**
         * 处理重新邀请时发生的错误
         *
         * @param {FakeXHR} xhr `XMLHttpRequest`对象
         * @return {boolean} 返回`true`表示错误已经处理完毕
         */
        ListAction.prototype.handleError = function (xhr) {
            try {
                var result = util.parseJSON(xhr.responseText);
            }
            catch(e) {
                result = {
                    statusCode: 1,
                    msg: '未知错误'
                };
            }
            if (xhr.status === 409 || (result && result.statusCode == '1')) {
                this.view.showToast(result.msg);
            }
        };

        function search (e) {
            // console.log('search', e);
        }

        // 停用
        function disable(e) {
            this.model.disableById(e.args)
                .then(
                    u.bind(handleSubmitResult, this, e),
                    u.bind(this.handleError, this)
                );
        }

        // 恢复
        function enable(e) {
            this.model.enableById(e.args)
                .then(
                    u.bind(handleSubmitResult, this, e),
                    u.bind(this.handleError, this)
                );
        }

        // 删除
        function deleteItem(e) {
            this.model.deleteById(e.args)
                .then(
                    u.bind(handleDeleteResult, this, e),
                    u.bind(this.handleError, this)
                );
        }

        // 处理删除成功
        function handleDeleteResult(e) {
            var row = parseInt(e.args, 10);
            var list = this.model.get('list');
            var originEntity = u.find(list, function(item) { return item.id === row; } )
            var toastMessage = '已成功删除 '
                + '<strong>'
                + (originEntity.name || originEntity.title)
                + '</strong>'
            this.view.showToast(toastMessage);
            this.reload();
        }


        // 处理状态切换成功
        function handleSubmitResult(e) {
            var row = parseInt(e.args, 10);
            var list = this.model.get('list');
            var originEntity = u.find(list, function(item) { return item.id === row; } )
            var actionStr = (originEntity.status == '0' ? '停用' : '恢复');
            var toastMessage = '已成功' + actionStr
                + ' <strong>'
                + (originEntity.name || originEntity.title)
                + '</strong>'
            this.view.showToast(toastMessage);
            this.reload();
        }

        /**
         * 初始化交互行为
         *
         * @override
         */
        ListAction.prototype.initBehavior = function () {
            BaseListAction.prototype.initBehavior.apply(this, arguments);
            this.view.on('search', search, this);
            this.view.on('disable', disable, this);
            this.view.on('enable', enable, this);
            this.view.on('delete', deleteItem, this);
        };


        return ListAction;
    }
);
