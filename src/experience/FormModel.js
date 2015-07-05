define(
    function (require) {
        var BaseFormModel = require('common/FormModel');
        var Data = require('./Data');
        var datasource = require('er/datasource');

        function ExperienceFormModel() {
            BaseFormModel.apply(this, arguments);
            this.addData(new Data());

            if (this.get('formType') === 'create') {
                this.datasource = datasource.remote('/api/getExperience');
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
            return BaseFormModel.prototype.save.apply(this, arguments);
        };

        require('er/util').inherits(ExperienceFormModel, BaseFormModel);
        return ExperienceFormModel;
    }
);
