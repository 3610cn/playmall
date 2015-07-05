define(
    function(require) {
        var Action = require('common/FormAction');

        var $ = require('jquery');

        function ExperienceForm() {
            Action.apply(this, arguments);
            this.entityName = 'experience';
        }

        function cancelSubmit() {
            this.redirect('/experience/list');
        }

        ExperienceForm.prototype.modelType = require('./FormModel');

        ExperienceForm.prototype.viewType = require('./FormView');

        ExperienceForm.prototype.initBehavior = function() {

            Action.prototype.initBehavior.apply(this, arguments);

            var me = this;

            this.view.on(
                'upload1',
                function (e) {
                    var files = e.data;
                    if (files.length) {
                        var file = files[0];
                        var data = file.serverData.data;
                        var $preview = $('#previewContainer');
                        $preview.html(
                            '<img src="' + data.url + '" />'
                        );
                    }
                }
            );

        };

        require('er/util').inherits(ExperienceForm, Action);

        return ExperienceForm;
    }
);
