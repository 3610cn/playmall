define(
    function (require) {
        var $ = require('jquery');
        var ui = require('esui');

        require('esui/Panel');
        require('esui/Table');

        var index = 0;

        var fields = [
            {
                title: '编号',
                field: 'id' ,
                sortable: true,
                resizable: true,
                width: 20,
                content: function (item) {
                    return ++index;
                }
            },
            {
                title: '活动名称',
                field: 'name' ,
                resizable : true,
                width: 100,
                content: function (item) {
                    return '<a href="main.html?id=' + item.id + '">' + item.name + '</a>';
                }
            },
            {
                title: '活动分类',
                field: 'category' ,
                sortable: true,
                resizable : true,
                width: 100,
                content: function (item) {
                    return item.category;
                }
            },
            {
                title: '活动时间',
                field: 'date' ,
                sortable: true,
                resizable : true,
                width: 100,
                content: function (item) {
                    return item.date;
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
                    return '<a href="javascript:deleteExperience(' + item.id + ')">删除</a>'
                }
            }
        ];

        $.get(
            '/mockup/getExperienceList.json',
            function (data) {
                data = data.data;
                ui.init(
                    document.body,
                    {
                        properties : {
                            list: {
                                datasource: data,
                                columnResizable: true,
                                followHead: true,
                                selectMode: 'line',
                                contentEncode: 1,
                                zIndex: 1214,
                                noDataHtml: '<p style="margin:0;">暂无活动!</p>',
                                fields: fields
                            }
                        }
                    }
                );
                initEvents();
            }
        );

        // 初始化事件
        function initEvents() {

        }

        window.deleteExperience = function (id) {
            $.post(
                '/mockup/deleteExperience.json?id=' + id,
                function (data) {
                    if (data.status === 0) {
                        location.reload();
                    }
                }
            );
        }
    }
);
