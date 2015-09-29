define(
    function(require) {
        var BaseForm = require('common/FormAction');

        var $ = require('jquery');

        function Form() {
            BaseForm.apply(this, arguments);
        }

        Form.prototype.modelType = require('./FormModel');

        Form.prototype.viewType = require('./FormView');

        Form.prototype.initBehavior = function() {
            BaseForm.prototype.initBehavior.apply(this, arguments);
        };

        require('er/util').inherits(Form, BaseForm);

        return Form;
    }
);
