define(
    function(require) {
        var BaseForm = require('common/FormAction');

        function Form() {
            BaseForm.apply(this, arguments);
        }

        Form.prototype.modelType = require('./CoupleFormModel');

        Form.prototype.viewType = require('./CoupleFormView');

        Form.prototype.initBehavior = function() {

            BaseForm.prototype.initBehavior.apply(this, arguments);
        };

        require('er/util').inherits(Form, BaseForm);

        return Form;
    }
);
