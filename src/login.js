define(
    function (require) {

        var $ = require('jquery');
        var ui = require('esui');

        require('esui/Form');
        require('esui/TextBox');
        require('esui/Button');

        ui.init();
        initEvents();

        // 初始化事件
        function initEvents() {
            var form = ui.get('form');
            form.on(
                'submit',
                function () {
                    var data = form.getData();
                    $.post(
                        '/mockup/login.json',
                        data,
                        function (data) {
                            if (data.status === 0) {
                                location.href='/main.html';
                            }
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
