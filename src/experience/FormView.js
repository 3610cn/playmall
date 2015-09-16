define(
    function (require) {
        require('er/tpl!./form.tpl');

        require('esui/Form');
        require('esui/Select');
        require('esui/TextBox');
        require('esui/BoxGroup');
        require('esui/Wizard');
        require('ub-ria-ui/TokenField');
        require('esui/Calendar');
        require('ui/uploader/Uploader');
        require('ui/UMEditor');

        var u = require('underscore');

        var BaseFormView = require('common/FormView');

        function ExperienceFormView() {
            BaseFormView.apply(this, arguments);
        }

        ExperienceFormView.prototype.template = 'experienceForm';

        ExperienceFormView.prototype.enterDocument = function() {
            BaseFormView.prototype.enterDocument.apply(this, arguments);

            var me = this;

            for (var i = 1; i <= 2; i++) {
                var uploader = this.get('uploader' + i);
                uploader.on(
                    'complete',
                    (function (i) {
                        return function (event) {
                            me.fire('upload' + i, event);
                        }
                    }(i))
                );
            }
        };

        /**
         * 从表单中获取实体数据
         *
         * @return {Object}
         */
        ExperienceFormView.prototype.getEntity = function () {
            var entity = BaseFormView.prototype.getEntity.apply(this, arguments);
            if (u.isObject(entity.pic1)) {
                entity.pic1 = entity.pic1.data.url;
            }
            if (u.isObject(entity.pic2)) {
                entity.pic2 = entity.pic2.data.url;
            }
            return entity;
        };

        require('er/util').inherits(ExperienceFormView, BaseFormView);
        return ExperienceFormView;
    }
);
