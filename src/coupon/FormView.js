define(
    function (require) {
        require('er/tpl!./form.tpl');

        require('esui/Form');
        require('esui/Select');
        require('esui/TextBox');
        require('esui/BoxGroup');
        require('esui/Calendar');
        require('ui/UMEditor');
        require('ui/uploader/Uploader');
        require('ui/ImageList');

        var u = require('underscore');

        var BaseFormView = require('common/FormView');

        function CouponFormView() {
            BaseFormView.apply(this, arguments);
        }

        CouponFormView.prototype.template = 'couponForm';

        CouponFormView.prototype.enterDocument = function() {
            BaseFormView.prototype.enterDocument.apply(this, arguments);
            var me = this;
        };

        /**
         * 从表单中获取实体数据
         *
         * @return {Object}
         */
        CouponFormView.prototype.getEntity = function () {
            var entity = BaseFormView.prototype.getEntity.apply(this, arguments);
            return entity;
        };

        require('er/util').inherits(CouponFormView, BaseFormView);
        return CouponFormView;
    }
);
