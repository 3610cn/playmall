define(
    function (require) {
        var actions = [
            {
                path: '/coupon/list',
                type: 'coupon/List'
            },
            {
                path: '/coupon/create',
                type: 'coupon/Form',
                args: { formType: 'create' }
            },
            {
                path: '/coupon/update',
                type: 'coupon/Form',
                args: { formType: 'update' }
            },
            {
                path: '/coupon/verify',
                type: 'coupon/VerifyForm'
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
