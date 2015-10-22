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
                title: '用户名',
                field: 'username' ,
                resizable : true,
                width: 150,
                content: function (item) {
                    return '<span class="list-link" data-command-args="' + item.id + '" data-command="modify">' + item.username + '</a>';
                }
            },
            {
                title: '手机号',
                field: 'phone' ,
                sortable: true,
                resizable : true,
                width: 120,
                content: function (item) {
                    return item.phone;
                }
            },
            {
                title: '角色',
                field: 'role' ,
                sortable: true,
                resizable : true,
                width: 100,
                content: function (item) {
                    return item.role;
                }
            },
            {
                title: '单位',
                field: 'belong' ,
                sortable: true,
                resizable : true,
                width: 100,
                content: function (item) {
                    return item.shopname || item.mallname || 'N / A';
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

        function UserListView() {
            UIView.apply(this, arguments);
        }

        UserListView.prototype.template = 'userListPage';

        UserListView.prototype.uiProperties = {
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

        UserListView.prototype.enterDocument = function () {
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

        require('er/util').inherits(UserListView, UIView);
        return UserListView;
    }
);
