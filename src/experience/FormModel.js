define(
    function (require) {
        var BaseFormModel = require('common/FormModel');
        var Data = require('./Data');
        var datasource = require('er/datasource');
        var m = require('moment');

        function ExperienceFormModel() {
            BaseFormModel.apply(this, arguments);
            this.addData(new Data());

            if (this.get('formType') === 'create') {
                this.datasource.push(
                    {
                        retrieve: datasource.remote('/api/getExperience'),
                        dump: true
                    }
                );
            }

            var timeList = [];
            var start = m('2000-01-01 23:30:00');
            for (var i = 0; i < 48; i++) {
                var time = start.add(30, 'm').format('hh:mm A');
                timeList.push(
                    {
                        text: time,
                        value: time
                    }
                );
            }

            this.datasource.push(
                {
                    name: 'timeList',
                    retrieve: datasource.constant(timeList)
                }
            );
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
