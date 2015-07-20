define(
    function (require) {
        require('er/tpl!./form.tpl');

        require('esui/Form');
        require('esui/TextBox');

        var u = require('underscore');

        // css
        // require('css!./css/form.css');

        var BaseFormView = require('common/FormView');

        function FormView() {
            BaseFormView.apply(this, arguments);
        }

        FormView.prototype.template = 'verifyFreshForm';

        FormView.prototype.enterDocument = function() {
            BaseFormView.prototype.enterDocument.apply(this, arguments);

            this.get('code').on('enter', this.fire.bind(this, 'enter'));
        };

        /**
         * 从表单中获取实体数据
         *
         * @return {Object}
         */
        FormView.prototype.getEntity = function () {
            var entity = BaseFormView.prototype.getEntity.apply(this, arguments);
            return entity;
        };

        require('er/util').inherits(FormView, BaseFormView);
        return FormView;
    }
);
