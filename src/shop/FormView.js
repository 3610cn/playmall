define(
    function (require) {
        require('er/tpl!./form.tpl');

        require('esui/Form');
        require('esui/Select');
        require('esui/TextBox');
        require('esui/BoxGroup');
        require('ui/uploader/Uploader');

        var u = require('underscore');

        var BaseFormView = require('common/FormView');

        function ShopFormView() {
            BaseFormView.apply(this, arguments);
        }

        ShopFormView.prototype.template = 'shopForm';

        ShopFormView.prototype.enterDocument = function() {
            BaseFormView.prototype.enterDocument.apply(this, arguments);
            var me = this;
            var uploader = this.get('uploader');
            uploader.on(
                'complete',
                function (event) {
                    me.fire('upload', event);
                }
            );
        };

        /**
         * 从表单中获取实体数据
         *
         * @return {Object}
         */
        ShopFormView.prototype.getEntity = function () {
            var entity = BaseFormView.prototype.getEntity.apply(this, arguments);
            if (u.isObject(entity.logo)) {
                entity.logo = entity.logo.data.url;
            }
            return entity;
        };

        require('er/util').inherits(ShopFormView, BaseFormView);
        return ShopFormView;
    }
);
