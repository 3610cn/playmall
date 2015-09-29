define(
    function (require) {
        var actions = [
            {
                path: '/user/list',
                type: 'user/List'
            },
            {
                path: '/user/create',
                type: 'user/Form',
                args: { formType: 'create' }
            },
            {
                path: '/user/update',
                type: 'user/Form',
                args: { formType: 'update' }
            }
        ];

        var controller = require('er/controller');
        actions.forEach(
            function (action) {
                controller.registerAction(action);
            }
        );

        var config = {};
        config.xxx = {
        };

        return config;
    }
);
