define(
    function (require) {
        var BaseFormModel = require('common/FormModel');
        var Data = require('./Data');

        function FormModel() {
            BaseFormModel.apply(this, arguments);
            var entityName = this.getUrlType();
            this.addData(new Data(entityName));
        }

        FormModel.prototype.prepare = function () {
            BaseFormModel.prototype.prepare.call(this);
            var data = this.get('data');
            if (data.couponList) {
                data.couponList = [{value: '', text: '请选择'}].concat(data.couponList);
            }
            this.set('data', data || {});
        }

        FormModel.prototype.validateEntity = function (entity) {
            var errorMsg = [];

            if (false) {
                errorMsg.push(
                    {
                        field: item,
                        message: '请上传文件'
                    }
                );
            }

            if (errorMsg.length > 0) {
                return errorMsg;
            }
            return BaseFormModel.prototype.validateEntity.apply(this, arguments);
        };

        FormModel.prototype.findById = function(id) {
            var mallId = this.get('mallId');
            return this.data().findCouponByMallId(mallId);
        };

        require('er/util').inherits(FormModel, BaseFormModel);
        return FormModel;
    }
);
