define(
    function (require) {

        var GlobalData = require('./GlobalData');
        var Deferred = require('er/Deferred');
        var $ = require('jquery');
        var u = require('underscore');
        var etpl = require('etpl');

        require('er/tpl!common/tpl/common.tpl')


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
            overrideControlDefaults();
            initializeUserAndSystem()
                .then(initializeApplication, redirectToIndex);
        }

        /**
         * 重写控件默认属性
         *
         * @private
         * @method common.Main#overrideControlDefaults
         * @return {er.meta.Promise}
         */
        function overrideControlDefaults() {
            var esui = require('esui');
            var OverrideDefaults = require('ub-ria/ui/extension/OverrideDefaults');
            var defaults = require('common/uiDefaults');
            esui.attachExtension('OverrideDefaults', {overrides: defaults});
        }

        function initializeApplication() {
            require('er/Deferred').syncModeEnabled = true;
            require('er/config').indexURL = '/experience/list';
            require('../experience/config');
            require('../fresh/config');
            // rule
            require('esui/validator/MaxRule');
            require('esui/validator/MinRule');
            require('esui/validator/MaxLengthRule');
            require('esui/validator/PatternRule');
            require('esui/validator/RequiredRule');
            require('esui/validator/MaxRule');

            require('esui/Tab');

            require('common/ajax').enable();
            require('er').start();

            // 显示用户信息
            var user = GlobalData.getInstance().getUser();
            if (!user.role) {
                user.role = 'admin';
            }
            $('#username').html(user['username'])
            $('#userInfo').show();

            // 导航
            var navHtml = etpl.render('nav', user);
            $('#nav').html(navHtml);
            var controls = require('esui').init(document.getElementById('nav'));
            var nav = controls[0];

            var controller = require('er/controller');
            controller.getEventBus().on(
                'enteractioncomplete',
                function (event) {
                    var action = event.action;
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
            );
        }

        return {
            start: start
        };
    }
);
