define(
    function (require) {
        var $ = require('jquery');
        var ui = require('esui');

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
                            }
                        }
                    }
                );
                ue.ready(
                    function () {
                        ue.setContent(data.content);
                    }
                );
            }
        );
    }
);
