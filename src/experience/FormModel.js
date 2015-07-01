define(
    function (require) {
        var UIModel = require('ef/UIModel');
        var datasource = require('er/datasource');

        function ExperienceFormModel() {
            UIModel.apply(this, arguments);

            var url = this.get('url');

            this.datasource = {
                detail: datasource.remote(
                    '/api/getExperience',
                    {
                        method: 'GET',
                        data: {
                            id: url.getQuery('id'),
                        }
                    }
                )
            };
        }

        ExperienceFormModel.prototype.prepare = function () {
            var data = this.get('detail').data;
            data.tags = data.tagList.join(',');
            data.uploadUrl1 = '/api/upload/1';
            data.uploadUrl2 = '/api/upload/2';
            this.set('data', data);
        }

        ExperienceFormModel.prototype.save = function(data) {
            this.fill(data);

            var postData = this.getPart.apply(this, Object.keys(data));
            // update请求要多个id字段
            if (this.get('formType') === 'update') {
                var url = this.get('url');
                postData.id = url.getQuery('id');
            }

            var ajax = require('er/ajax');
            var url = '/api/addExperience';
            return ajax.post(url, postData);
        };

        ExperienceFormModel.prototype.formatters = {
            time: UIModel.formatters.time
        };

        require('er/util').inherits(ExperienceFormModel, UIModel);
        return ExperienceFormModel;
    }
);
