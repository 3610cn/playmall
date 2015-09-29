define(
    function (require) {
        require('er/tpl!./form.tpl');

        require('esui/Form');
        require('esui/Select');
        require('esui/TextBox');
        require('esui/BoxGroup');
        require('esui/Calendar');

        var u = require('underscore');

        var BaseFormView = require('common/FormView');

        function UserFormView() {
            BaseFormView.apply(this, arguments);
        }

        UserFormView.prototype.template = 'userForm';

        UserFormView.prototype.enterDocument = function() {
            BaseFormView.prototype.enterDocument.apply(this, arguments);
            var me = this;
        };

        /**
         * 从表单中获取实体数据
         *
         * @return {Object}
         */
        UserFormView.prototype.getEntity = function () {
            var entity = BaseFormView.prototype.getEntity.apply(this, arguments);
            return entity;
        };

        require('er/util').inherits(UserFormView, BaseFormView);
        return UserFormView;
    }
);
