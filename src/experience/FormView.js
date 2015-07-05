define(
    function (require) {
        require('er/tpl!./form.tpl');

        require('esui/Form');
        require('esui/Select');
        require('esui/TextBox');
        require('esui/BoxGroup');
        require('ub-ria-ui/TokenField');
        require('esui/Calendar');
        require('ui/uploader/Uploader');
        require('ui/UMEditor');

        var u = require('underscore');

        // css
        // require('css!./css/form.css');

        var BaseFormView = require('common/FormView');

        function ExperienceFormView() {
            BaseFormView.apply(this, arguments);
        }

        function cancel() {
            this.fire('cancel');
        }

        ExperienceFormView.prototype.template = 'experienceForm';

        ExperienceFormView.prototype.enterDocument = function() {
            BaseFormView.prototype.enterDocument.apply(this, arguments);

            var me = this;

            var uploader = this.get('uploader');
            uploader.on(
                'complete',
                function (event) {
                    me.fire('upload1', event);
                }
            );
            // var cancelButton = this.get('cancel-button');
            // cancelButton.on('click', require('er/util').bind(cancel, this))
        };

        /**
         * 从表单中获取实体数据
         *
         * @return {Object}
         */
        ExperienceFormView.prototype.getEntity = function () {
            var entity = BaseFormView.prototype.getEntity.apply(this, arguments);
            if (u.isObject(entity.upload1)) {
                entity.upload1 = entity.upload1.data.id;
            }
            if (u.isObject(entity.upload2)) {
                entity.upload2 = entity.upload2.data.id;
            }
            return entity;
        };

        require('er/util').inherits(ExperienceFormView, BaseFormView);
        return ExperienceFormView;
    }
);
