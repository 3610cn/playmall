define(
    function(require) {
        var BaseForm = require('common/FormAction');

        var $ = require('jquery');
        var u = require('underscore');

        function Form() {
            BaseForm.apply(this, arguments);
        }

        Form.prototype.modelType = require('./VerifyFormModel');

        Form.prototype.viewType = require('./VerifyFormView');

        Form.prototype.initBehavior = function() {
            BaseForm.prototype.initBehavior.apply(this, arguments);
            var me = this;
            this.view.on(
                'enter',
                function (event) {
                    me.view.get('form').validateAndSubmit();
                }
            );
        };

        Form.prototype.getSubmitMethod = function() {
            return 'verify';
        };

        Form.prototype.handleSubmitError = function (errors) {
            var error = errors.error;
            if (u.isObject(error)) {
                var fields = [
                    {
                        field: 'code',
                        message: error.code
                    }
                ];
                this.view.notifyErrors({fields: fields});
                $('#verifyMessage').hide();
                return true;
            }
            return false;
        };

        Form.prototype.handleSubmitResult = function (data) {
            $('#verifyMessage').html('验证码已成功核销!').show(200);
            this.view.get('code').setValue('');
        };

        require('er/util').inherits(Form, BaseForm);

        return Form;
    }
);
