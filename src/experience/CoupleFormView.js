define(
    function (require) {
        require('er/tpl!./coupleForm.tpl');

        require('esui/Form');
        require('esui/Select');
        require('esui/TextBox');
        require('esui/BoxGroup');

        var u = require('underscore');

        // css
        // require('css!./css/form.css');

        var BaseFormView = require('common/FormView');

        function FormView() {
            BaseFormView.apply(this, arguments);
        }

        FormView.prototype.template = 'coupleForm';

        FormView.prototype.enterDocument = function() {
            BaseFormView.prototype.enterDocument.apply(this, arguments);
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
