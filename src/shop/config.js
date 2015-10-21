define(
    function (require) {
        var actions = [
            {
                path: '/shop/list',
                type: 'shop/List'
            },
            {
                path: '/shop/create',
                type: 'shop/Form',
                args: { formType: 'create' }
            },
            {
                path: '/shop/update',
                type: 'shop/Form',
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
