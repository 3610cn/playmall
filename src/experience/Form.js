define(
    function(require) {
        var Action = require('common/FormAction');

        var $ = require('jquery');

        function ExperienceForm() {
            Action.apply(this, arguments);
        }

        ExperienceForm.prototype.modelType = require('./FormModel');

        ExperienceForm.prototype.viewType = require('./FormView');

        ExperienceForm.prototype.initBehavior = function() {

            Action.prototype.initBehavior.apply(this, arguments);

            var me = this;

            for (var i = 1; i <= 2; i++) {
                this.view.on(
                    'upload' + i,
                    (function (i) {
                        return function (e) {
                            var files = e.data;
                            if (files.length) {
                                var file = files[0];
                                var data = file.serverData.data;
                                var $preview = $('#preview' + i);
                                $preview.html(
                                    '<img src="' + data.url + '" />'
                                );
                            }
                        };
                    }(i))
                );
                var uploader = this.view.get('uploader' + i);
                uploader.setRawValue(this.model.get('data')['pic' + i]);
            }

            this.view.on(
                'citychange',
                function () {
                    var city = this.get('city');
                    var mall = this.get('mall');
                    var cityValue = city.getValue();
                    mall.setProperties(
                        {
                            datasource: me.model.getMallList(parseInt(cityValue, 10))
                        }
                    );
                }
            );
        };

        require('er/util').inherits(ExperienceForm, Action);

        return ExperienceForm;
    }
);
