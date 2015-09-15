define(
    function (require) {
        require('er/tpl!./couponForm.tpl');

        require('esui/Form');
        require('esui/Select');
        require('esui/TextBox');
        require('esui/BoxGroup');

        var u = require('underscore');

        var BaseFormView = require('common/FormView');

        function FormView() {
            BaseFormView.apply(this, arguments);
        }

        FormView.prototype.template = 'couponForm';

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
            var eid = this.model.get('eid');
            if (eid) {
                entity.eid = eid;
            }
            var type = this.model.get('type');
            if (type) {
                entity.type = type;
            }
            return entity;
        };

        require('er/util').inherits(FormView, BaseFormView);
        return FormView;
    }
);
