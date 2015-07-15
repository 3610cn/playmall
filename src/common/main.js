define(
    function (require) {

        var GlobalData = require('./GlobalData');
        var Deferred = require('er/Deferred');
        var $ = require('jquery');
        var u = require('underscore');

        /**
         * 开始初始化系统常量和用户常量，此时已经获取用户的全部信息
         *
         * @ignore
         */
        function initializeUserAndSystem() {
            var data = GlobalData.getInstance();
            return Deferred.all(data.loadUser());
        }

        /**
         * 跳转到首页，在用户未登录的情况下执行
         *
         * @ignore
         */
        function redirectToIndex() {
            var baseURL = 'index.html';
            location.href = baseURL + location.hash;
            // 在`Promise`中，抛出异常会使其进入失败状态，
            // 一般来说跳转了就不会有下面的代码执行，这里就是防止进入成功状态
            throw new Error('Failed to redirect to index');
        }

        /**
         * 开始系统执行
         *
         * @ignore
         */
        function start() {
            // 初始化流程：
            //
            // 1. 并行加载：
            //     - 当前用户信息，用户未登录会返回403，失败就跳回首页
            //     - 系统静态资源
            //     - 用户处理模块和系统常量模块
            // 2. 开始用户和系统信息初始化
            // 3. 加载依赖基础库（moment, esui, er, ef, common, bizpkg）
            // 4. 初始化应用系统其它部分
            initializeUserAndSystem()
                .then(initializeApplication, redirectToIndex);
        }

        function initializeApplication() {
            require('er/Deferred').syncModeEnabled = true;
            require('../experience/config');
            require('../fresh/config');
            // rule
            require('esui/validator/MaxRule');
            require('esui/validator/MinRule');
            require('esui/validator/MaxLengthRule');
            require('esui/validator/PatternRule');
            require('esui/validator/RequiredRule');
            require('esui/validator/MaxRule');

            require('common/ajax').enable();
            require('er').start();

            // 显示用户信息
            var user = GlobalData.getInstance().getUser();
            $('#username').html(user['username'])
            $('#userInfo').show();


            var controller = require('er/controller');
            controller.getEventBus().on(
                'enteraction',
                function (event) {
                    var action = event.action;
                    action.on(
                        'modelloaded',
                        function (e) {
                            this.model.set('user', user);
                        }
                    );
                }
            );
            controller.getEventBus().on(
                'enteractioncomplete',
                function (event) {
                    var action = event.action;
                    var nav = action.view.get('nav');
                    if (nav) {
                        var url = action.model.get('url');
                        var path = url.getPath();
                        var splits = path.split('/');
                        var type = splits[1] || 'experience';
                        u.each(
                            nav.tabs,
                            function (tab) {
                                if (u.contains(tab.classes, type)) {
                                    nav.activate(tab);
                                }
                            }
                        );
                        nav.on(
                            'activate',
                            function (e) {
                                var tab = this.getActiveTab();
                                var type = tab.classes[0];
                                require('er/locator').redirect('/' + type + '/list');
                            }
                        );
                    }
                }
            );
        }

        return {
            start: start
        };
    }
);
