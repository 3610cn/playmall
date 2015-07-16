define(
    function (require) {
        require('er/tpl!common/tpl/common.tpl');
        require('er/tpl!./list.tpl');
        require('esui/Tab');
        require('esui/Button');
        require('esui/Table');
        require('esui/extension/Command');

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
                    return '<span class="list-link" data-command-args="' + item.id + '" data-command="delete">删除</a>';
                }
            }
        ];

        var UIView = require('ef/UIView');

        function ExperienceListView() {
            UIView.apply(this, arguments);
        }

        ExperienceListView.prototype.template = 'experienceListPage';

        ExperienceListView.prototype.uiProperties = {
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
        }

        require('er/util').inherits(ExperienceListView, UIView);
        return ExperienceListView;
    }
);
