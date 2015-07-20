define(
    function (require) {
        var BaseFormModel = require('common/FormModel');
        var Data = require('./Data');
        var datasource = require('er/datasource');
        var m = require('moment');

        function FormModel() {
            BaseFormModel.apply(this, arguments);
            var entityName = this.getUrlType();
            this.addData(new Data(entityName));
        }

        FormModel.prototype.prepare = function () {
            BaseFormModel.prototype.prepare.call(this);
        };

        FormModel.prototype.verify = function(data) {
            return this.data().verify(data);
        };

        require('er/util').inherits(FormModel, BaseFormModel);
        return FormModel;
    }
);
