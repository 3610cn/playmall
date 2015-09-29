define(
    function (require) {
        require('er/tpl!./list.tpl');
        require('esui/Tab');
        require('esui/Button');
        require('esui/Table');
        require('esui/extension/Command');

        var CouponType = require('./config').CouponType;
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
                title: '优惠标题',
                field: 'title' ,
                resizable : true,
                width: 150,
                content: function (item) {
                    return '<span class="list-link" data-command-args="' + item.id + '" data-command="modify">' + item.title + '</a>';
                }
            },
            {
                title: '店铺名称',
                field: 'shop' ,
                sortable: true,
                resizable : true,
                width: 100,
                content: function (item) {
                    return item.shop;
                }
            },
            {
                title: '原价',
                field: 'oldPrice' ,
                sortable: true,
                resizable : true,
                width: 100,
                content: function (item) {
                    return item.oldPrice;
                }
            },
            {
                title: '活动价',
                field: 'price' ,
                sortable: true,
                resizable : true,
                width: 100,
                content: function (item) {
                    return item.price;
                }
            },
            {
                title: '限制人数',
                field: 'count' ,
                sortable: true,
                resizable : true,
                width: 60,
                content: function (item) {
                    return item.count;
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
                title: '操作',
                field: 'operate' ,
                width: 60,
                content: function (item) {
                    return '<span class="list-link" data-command-args="' + item.id + '" data-command="delete">删除</a>';
                }
            }
        ];

        var UIView = require('ef/UIView');

        function CouponListView() {
            UIView.apply(this, arguments);
        }

        CouponListView.prototype.template = 'couponListPage';

        CouponListView.prototype.uiProperties = {
            list: {
                fields: fields,
                sortable: false,
                columnResizable: true,
                subrow: false,
                followHead: true,
                selectMode: 'line',
                noDataHtml: '<p style="margin:0;">暂无优惠信息!</p>'
            }
        };

        CouponListView.prototype.enterDocument = function () {
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
        }

        require('er/util').inherits(CouponListView, UIView);
        return CouponListView;
    }
);
