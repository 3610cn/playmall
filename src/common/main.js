define(
    function (require) {
        function init() {
            require('er/Deferred').syncModeEnabled = true;
            require('../experience/config');
            // rule
            require('esui/validator/MaxRule');
            require('esui/validator/MinRule');
            require('esui/validator/MaxLengthRule');
            require('esui/validator/PatternRule');
            require('esui/validator/RequiredRule');
            require('esui/validator/MaxRule');

            require('common/ajax').enable();
            require('er').start();
        }

        return {
            init: init
        };
    }
);
