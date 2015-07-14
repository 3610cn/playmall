define(
    function (require) {
        var actions = [
            {
                path: '/',
                type: 'experience/List'
            },
            {
                path: '/experience/list',
                type: 'experience/List'
            },
            {
                path: '/bigshot/list',
                type: 'experience/List'
            },
            {
                path: '/experience/create',
                type: 'experience/Form',
                args: { formType: 'create' }
            },
            {
                path: '/bigshot/create',
                type: 'experience/Form',
                args: { formType: 'create' }
            },
            {
                path: '/experience/update',
                type: 'experience/Form',
                args: { formType: 'update' }
            },
            {
                path: '/bigshot/update',
                type: 'experience/Form',
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
