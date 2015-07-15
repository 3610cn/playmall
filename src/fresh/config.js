define(
    function (require) {
        var actions = [
            {
                path: '/fresh/list',
                type: 'fresh/List'
            },
            {
                path: '/fresh/create',
                type: 'fresh/Form',
                args: { formType: 'create' }
            },
            {
                path: '/fresh/update',
                type: 'fresh/Form',
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
