define(
    function (require) {
        require('er/tpl!./form.tpl');

        require('esui/Form');
        require('esui/Select');
        require('esui/TextBox');
        require('esui/BoxGroup');
        require('esui/Calendar');
        require('ui/UMEditor');

        var u = require('underscore');

        // css
        // require('css!./css/form.css');

        var BaseFormView = require('common/FormView');

        function FreshFormView() {
            BaseFormView.apply(this, arguments);
        }

        FreshFormView.prototype.template = 'freshForm';

        FreshFormView.prototype.enterDocument = function() {
            BaseFormView.prototype.enterDocument.apply(this, arguments);
        };

        /**
         * 从表单中获取实体数据
         *
         * @return {Object}
         */
        FreshFormView.prototype.getEntity = function () {
            var entity = BaseFormView.prototype.getEntity.apply(this, arguments);
            return entity;
        };

        require('er/util').inherits(FreshFormView, BaseFormView);
        return FreshFormView;
    }
);
