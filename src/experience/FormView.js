define(
    function (require) {
        require('er/tpl!./form.tpl');

        require('esui/Form');
        require('esui/Select');
        require('esui/TextBox');
        require('esui/BoxGroup');
        require('ub-ria-ui/TokenField');
        require('esui/Calendar');
        require('uploader/Uploader');

        // css
        // require('css!./css/form.css');

        var UIView = require('ef/UIView');

        function ExperienceFormView() {
            UIView.apply(this, arguments);
        }

        function submit() {
            var form = this.get('form');
            var data = form.getData();
            this.fire('submit', {experience: data});
        }

        function cancel() {
            this.fire('cancel');
        }

        ExperienceFormView.prototype.template = 'experienceForm';

        ExperienceFormView.prototype.enterDocument = function() {
            UIView.prototype.enterDocument.apply(this, arguments);

            var me = this;

            var form = this.get('form');
            form.on('submit', require('er/util').bind(submit, this));

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


        require('er/util').inherits(ExperienceFormView, UIView);
        return ExperienceFormView;
    }
);
