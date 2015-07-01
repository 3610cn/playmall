define(
    function(require) {
        var Action = require('er/Action');

        var $ = require('jquery');

        function ExperienceForm() {
            Action.apply(this, arguments);
        }

        function cancelSubmit() {
            this.redirect('/experience/list');
        }

        function submitExperience(e) {
            // var uploadData = uploader.getRawValue();
            // if (uploadData) {
            //     data.file = uploadData.data.id;
            // }
            // data.content = ue.getContent();
            this.model.save(e.experience).then(saveCallBack.bind(this));
        }

        function saveCallBack(response) {
            if (response.status === 0) {
                this.redirect('/experience/list');
            }
            else {
                alert('出错啦！');
            }
        }

        ExperienceForm.prototype.modelType = require('./FormModel');

        ExperienceForm.prototype.viewType = require('./FormView');

        ExperienceForm.prototype.initBehavior = function() {
            this.view.on('submit', submitExperience.bind(this));
            this.view.on('cancel', cancelSubmit.bind(this));

            var me = this;
            this.on(
                'entercomplete',
                function () {
                    var ue = UE.getEditor('editor');
                    ue.ready(
                        function () {
                            var data = me.model.get('data');
                            ue.setContent(data.content);
                        }
                    );
                }
            );

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
