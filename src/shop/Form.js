define(
    function(require) {
        var BaseForm = require('common/FormAction');

        var $ = require('jquery');

        function Form() {
            BaseForm.apply(this, arguments);
        }

        Form.prototype.modelType = require('./FormModel');

        Form.prototype.viewType = require('./FormView');

        Form.prototype.initBehavior = function() {
            BaseForm.prototype.initBehavior.apply(this, arguments);
                this.view.on(
                    'upload',
                    function (e) {
                        var files = e.data;
                        if (files.length) {
                            var file = files[0];
                            var data = file.serverData.data;
                            var $preview = $('#preview');
                            $preview.html(
                                '<img src="' + data.url + '" />'
                            );
                        }
                    }
                );
                var uploader = this.view.get('uploader');
                uploader.setRawValue(this.model.get('data')['logo']);
        };

        require('er/util').inherits(Form, BaseForm);

        return Form;
    }
);
