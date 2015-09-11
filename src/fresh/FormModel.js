define(
    function (require) {
        var BaseFormModel = require('common/FormModel');
        var Data = require('./Data');
        var datasource = require('er/datasource');
        var u = require('underscore');
        var m = require('moment');

        function FreshFormModel() {
            BaseFormModel.apply(this, arguments);
            var entityName = this.getUrlType();
            this.addData(new Data(entityName));

            if (this.get('formType') === 'create') {
                this.datasource = this.datasource.concat(
                    [
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
                    ]
                );
            }
        }

        FreshFormModel.prototype.prepare = function () {
            BaseFormModel.prototype.prepare.call(this);
            var data = this.get('data');
            data.uploadUrl = '/api/upload/3';

            if (data.imageList) {
                u.each(
                    data.imageList,
                    function (item) {
                        if (item.url) {
                            item.content = '<img src="' + item.url + '" />';
                            item.value = item.url;
                        }
                    }
                );
            }

            this.set('data', data);
        }

        FreshFormModel.prototype.save = function(data) {
            if (data.date) {
                data.date = m(data.date).format('YYYYMMDD');
            }
            return BaseFormModel.prototype.save.apply(this, arguments);
        };

        require('er/util').inherits(FreshFormModel, BaseFormModel);
        return FreshFormModel;
    }
);
