define(
    function (require) {
        var BaseFormModel = require('common/FormModel');
        var Data = require('./Data');
        var datasource = require('er/datasource');
        var m = require('moment');

        function FreshFormModel() {
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

        FreshFormModel.prototype.prepare = function () {
            BaseFormModel.prototype.prepare.call(this);
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
