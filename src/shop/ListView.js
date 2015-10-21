define(
    function (require) {
        require('er/tpl!./list.tpl');
        require('esui/Tab');
        require('esui/Button');
        require('esui/Table');
        require('esui/extension/Command');

        var fields = [
            {
                title: '编号',
                field: 'id' ,
                sortable: true,
                resizable: true,
                width: 40,
                content: function (item) {
                    return item.id;
                }
            },
            {
                title: '店铺名',
                field: 'name' ,
                resizable : true,
                width: 150,
                content: function (item) {
                    return '<span class="list-link" data-command-args="' + item.id + '" data-command="modify">' + item.name + '</a>';
                }
            },
            {
                title: '城市',
                field: 'cityname' ,
                sortable: true,
                resizable : true,
                width: 120,
                content: function (item) {
                    return item.cityname;
                }
            },
            {
                title: '购物中心',
                field: 'mallname' ,
                sortable: true,
                resizable : true,
                width: 100,
                content: function (item) {
                    return item.mallname;
                }
            },
            {
                title: '地址',
                field: 'address' ,
                sortable: true,
                resizable : true,
                width: 300,
                content: function (item) {
                    return item.address;
                }
            },
            {
                title: '电话',
                field: 'phone' ,
                sortable: true,
                resizable : true,
                width: 100,
                content: function (item) {
                    return item.phone;
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

        function ShopListView() {
            UIView.apply(this, arguments);
        }

        ShopListView.prototype.template = 'shopListPage';

        ShopListView.prototype.uiProperties = {
            list: {
                fields: fields,
                sortable: false,
                columnResizable: true,
                subrow: false,
                followHead: true,
                selectMode: 'line',
                noDataHtml: '<p style="margin:0;">暂无抢鲜活动!</p>'
            }
        };

        ShopListView.prototype.enterDocument = function () {
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

        require('er/util').inherits(ShopListView, UIView);
        return ShopListView;
    }
);
