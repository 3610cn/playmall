define(
    function(require) {
        var BaseForm = require('common/FormAction');

        function Form() {
            BaseForm.apply(this, arguments);
        }

        Form.prototype.modelType = require('./CouponFormModel');

        Form.prototype.viewType = require('./CouponFormView');

        Form.prototype.initBehavior = function() {
            BaseForm.prototype.initBehavior.apply(this, arguments);

            this.view.on(
                'submit',
                function () {
                    this.fire('submit');
                },
                this
            )
        };

        require('er/util').inherits(Form, BaseForm);

        return Form;
    }
);
