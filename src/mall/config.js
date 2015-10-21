define(
    function (require) {
        var actions = [
            {
                path: '/mall/list',
                type: 'mall/List'
            },
            {
                path: '/mall/create',
                type: 'mall/Form',
                args: { formType: 'create' }
            },
            {
                path: '/mall/update',
                type: 'mall/Form',
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
