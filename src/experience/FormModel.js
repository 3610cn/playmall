define(
    function (require) {
        var BaseFormModel = require('common/FormModel');
        var Data = require('./Data');
        var datasource = require('er/datasource');
        var m = require('moment');

        function ExperienceFormModel() {
            BaseFormModel.apply(this, arguments);
            var entityName = this.getUrlType();
            this.addData(new Data(entityName));

            if (this.get('formType') === 'create') {
                this.datasource.push(
                    {
                        retrieve: function (model) {
                            return model.data().findById().then(
                                function (data) {
                                    return data;
                                }
                            );
                        },
                        dump: true
                    }
                );
            }
        }

        ExperienceFormModel.prototype.prepare = function () {
            BaseFormModel.prototype.prepare.call(this);
            var data = this.get('data');
            data.uploadUrl1 = '/api/upload/1';
            data.uploadUrl2 = '/api/upload/2';
            if (this.get('formType') === 'update') {
                data.tags = data.tagList.join(',');
            }
            this.set('data', data);
        }

        ExperienceFormModel.prototype.save = function(data) {
            if (data.date) {
                data.date = m(data.date).format('YYYYMMDD');
            }
            return BaseFormModel.prototype.save.apply(this, arguments);
        };

        require('er/util').inherits(ExperienceFormModel, BaseFormModel);
        return ExperienceFormModel;
    }
);
