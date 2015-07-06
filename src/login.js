define(
    function (require) {

        var $ = require('jquery');
        var ui = require('esui');
        var er = require('er');

        require('esui/Form');
        require('esui/TextBox');
        require('esui/Button');
        require('esui/Button');

        require('esui/validator/RequiredRule');

        ui.init();
        initEvents();
        $('.login-wrapper').fadeIn(300);

        // 初始化事件
        function initEvents() {
            var form = ui.get('form');
            form.on(
                'submit',
                function () {
                    $('.error').hide();
                    var data = form.getData();
                    require('er/ajax').request(
                        {
                            url: '/api/login',
                            data: data,
                            method: 'GET',
                            dataType: 'json'
                        }
                    ).then(
                        function (data) {
                            if (data.status === 0) {
                                location.href='/main.html';
                            }
                            else {
                                $('.error').html(data.msg.global || '用户名或密码错误').show();
                            }
                        }
                    );
                }
            );
        }
    }
);
