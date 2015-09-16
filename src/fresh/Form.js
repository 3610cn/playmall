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
            var imageList = this.view.get('imageList');
            this.view.on(
                'upload',
                function (event) {
                    var files = event.data;
                    if (files.length) {
                        var file = files[0];
                        var data = file.serverData.data;
                        imageList.addItem(
                            {
                                content: '<img src="' + data.url + '" />',
                                value: data.url
                            }
                        );
                    }
                }
            );
        };

        require('er/util').inherits(Form, BaseForm);

        return Form;
    }
);
