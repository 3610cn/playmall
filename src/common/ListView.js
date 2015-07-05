/**
 * ADM 2.0
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 列表视图基类类
 * @author maoquan(maoquan0515@163.com)
 */
define(
    function (require) {
        var u = require('underscore');
        var BaseListView = require('ub-ria/mvc/ListView');
        var util = require('er/util');

        /**
         * 频道分组列表视图类
         *
         * @constructor
         * @extends ub-ria/mvc/ListView
         */
        function ListView() {
            BaseListView.apply(this, arguments);
        }

        util.inherits(ListView, BaseListView);

        /**
         * 控件事件配置
         *
         * @type {Object}
         * @override
         */
        ListView.prototype.uiEvents = {
            'range:change': search
        };

        /**
         * 收集检索数据
         *
         * @param {ReportView} this 当前视图实例
         * @param {Object} e 控件事件对象
         */
        function search(e) {
            var args = this.getSearchArgs();
            this.fire('search', { args: args });
        }

        /**
         * 获取查询参数，
         * 这个方法是日历选择所触发的查询操作调用的方法，用来从控件里抽取参数
         * 如果还有其它的参数，可以重写这个方法
         *
         * @return {Object}
         */
        ListView.prototype.getSearchArgs = function () {
            var moment = require('moment');
            var args = BaseListView.prototype.getSearchArgs.call(this);

            // 日期是独立的
            var range = this.get('range').getValue().split(',');
            args.startTime = moment(range[0]).format('YYYYMMDD');
            args.endTime = moment(range[1]).format('YYYYMMDD');

            return args;
        };


        /**
         * 使用的模板名称
         *
         * @type {string}
         */
        ListView.prototype.template = '';

        return ListView;
    }
);
