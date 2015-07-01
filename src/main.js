define(
    function (require) {
        var $ = require('jquery');
        var ui = require('esui');

        require('esui/Form');
        require('esui/Select');
        require('esui/TextBox');
        require('esui/BoxGroup');
        require('ub-ria-ui/TokenField');
        require('esui/Calendar');
        require('./uploader/Uploader');

        var ue = UE.getEditor('editor');

        $.get(
            '/mockup/getExperience.json',
            function (data) {
                data = data.data;
                ui.init(
                    document.body,
                    {
                        properties : {
                            name: {
                                value: data.name,
                            },
                            category: {
                                datasource: data.categoryList
                            },
                            mall: {
                                datasource: data.mallList
                            },
                            tags: {
                                tokens: data.tagList.join(',')
                            },
                            date: {
                                value: '2012-12-20'
                            },
                            uploader: {
                                action: '/mockup/upload.json'
                            }
                        }
                    }
                );
                initEvents();
                ue.ready(
                    function () {
                        ue.setContent(data.content);
                    }
                );
            }
        );

        // 初始化事件
        function initEvents() {
            var form = ui.get('form');
            form.on(
                'submit',
                function () {
                    var data = form.getData();
                    var uploadData = uploader.getRawValue();
                    if (uploadData) {
                        data.file = uploadData.data.id;
                    }
                    data.content = ue.getContent();
                    $.post(
                        '/mockup/addExperience.json',
                        data,
                        function () {
                            alert('success');
                        }
                    );
                }
            );


            var submit = ui.get('submit');
            submit.on(
                'click',
                function () {
                    form.validateAndSubmit();
                }
            );
        }
    }
);
