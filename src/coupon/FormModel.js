define(
    function (require) {
        var BaseFormModel = require('common/FormModel');
        var Data = require('./Data');
        var datasource = require('er/datasource');
        var u = require('underscore');
        var m = require('moment');

        function CouponFormModel() {
            BaseFormModel.apply(this, arguments);
            var entityName = this.getUrlType();
            this.addData(new Data(entityName));
        }

        CouponFormModel.prototype.prepare = function () {
            BaseFormModel.prototype.prepare.call(this);
            var data = this.get('data');
            this.set('data', data);
        }

        CouponFormModel.prototype.save = function(data) {
            if (data.date) {
                data.date = m(data.date).format('YYYYMMDD');
            }
            return BaseFormModel.prototype.save.apply(this, arguments);
        };

        require('er/util').inherits(CouponFormModel, BaseFormModel);
        return CouponFormModel;
    }
);
