define(
    function (require) {
        require('er/tpl!./list.tpl');
        require('esui/Tab');
        require('esui/Button');
        require('esui/Table');
        require('esui/extension/Command');
        require('ui/Rating');

        var u = require('underscore');

        var ExperienceType = require('./config').ExperienceType;
        var fields = [
            {
                title: '编号',
                field: 'id' ,
                sortable: true,
                resizable: true,
                width: 20,
                content: function (item) {
                    return item.id;
                }
            },
            {
                title: '活动名称',
                field: 'name' ,
                resizable : true,
                width: 100,
                content: function (item) {
                    return '<span class="list-link" data-command-args="' + item.id + '" data-command="modify">' + item.name + '</a>';
                }
            },
            {
                title: '活动分类',
                field: 'category' ,
                sortable: true,
                resizable : true,
                width: 70,
                content: function (item) {
                    return item.category;
                }
            },
            {
                title: '开始时间',
                field: 'startTime' ,
                sortable: true,
                resizable : true,
                width: 100,
                content: function (item) {
                    return item.startTime;
                }
            },
            {
                title: '结束时间',
                field: 'endTime' ,
                sortable: true,
                resizable : true,
                width: 100,
                content: function (item) {
                    return item.endTime;
                }
            },
            {
                title: '活动地点',
                field: 'mall' ,
                sortable: true,
                resizable : true,
                width: 120,
                content: function (item) {
                    return item.mall;
                }
            },
            {
                title: '操作',
                field: 'operate' ,
                width: 60,
                content: function (item) {
                    var couponText = item.couponId ? '修改优惠' : '绑定优惠';
                    var couponClass = item.couponId ? 'coupon-list-modify-coupon' : 'coupon-list-bind-coupon';
                    return [
                        '<span class="list-link" data-command-args="' + item.id + '" data-command="delete">删除</a></span>',
                        '<span class="list-link ' + couponClass + '" data-command-args="' + item.id + '" data-command="bindCoupon">' + couponText + '</a></span>'
                    ].join('');
                }
            }
        ];

        var UIView = require('ef/UIView');

        function ExperienceListView() {
            UIView.apply(this, arguments);
        }

        ExperienceListView.prototype.template = 'experienceListPage';

        ExperienceListView.prototype.getUIProperties = function () {
            UIView.prototype.getUIProperties.apply(this, arguments);
            var user = this.model.get('user');
            var starNumIndex = 2;
            if (user.role === 'admin'&& fields[starNumIndex].field !== 'starNum') {
                fields.splice(starNumIndex, 0,
                    {
                        title: '推荐级别',
                        field: 'starNum' ,
                        sortable: true,
                        width: 100,
                        content: function (item) {
                            return '<div data-ui="name:starNum;type:Rating;value:' + (item.starNum || 0) + ';readOnly:true;"></div>';
                        }
                    }
                );
            }
            return {
                list: {
                    fields: fields,
                    sortable: false,
                    columnResizable: true,
                    subrow: false,
                    followHead: true,
                    selectMode: 'line',
                    noDataHtml: '<p style="margin:0;">暂无活动!</p>'
                }
            };
        }


        ExperienceListView.prototype.enterDocument = function () {
            UIView.prototype.enterDocument.apply(this, arguments);

            var me = this;
            this.get('list').on(
                'command',
                function (event) {
                    me.fire(event.name, event);
                }
            );

            this.get('createButton').on(
                'click',
                this.fire.bind(this, 'create')
            );

            this.get('list').initChildren();
        }

        require('er/util').inherits(ExperienceListView, UIView);
        return ExperienceListView;
    }
);
