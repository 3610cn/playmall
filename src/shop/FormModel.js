define(
    function (require) {
        var BaseFormModel = require('common/FormModel');
        var Data = require('./Data');
        var datasource = require('er/datasource');
        var u = require('underscore');
        var m = require('moment');

        var ROLE = {
            roleList: function (model) {
                var system = model.getSystem();
                return system.roleList;
            }
        };

        function ShopFormModel() {
            BaseFormModel.apply(this, arguments);
            var entityName = this.getUrlType();
            this.addData(new Data(entityName));

            this.putDatasource(ROLE);
        }

        ShopFormModel.prototype.prepare = function () {
            BaseFormModel.prototype.prepare.call(this);
            var data = this.get('data');
            data.uploadUrl = '/api/upload/4';
            if (this.get('formType') === 'update') {
                data.logo = {
                    data: {
                        url: data.logo
                    }
                };
            }
            this.set('data', data);
        }

        ShopFormModel.prototype.save = function(data) {
            if (data.date) {
                data.date = m(data.date).format('YYYYMMDD');
            }
            return BaseFormModel.prototype.save.apply(this, arguments);
        };

        ShopFormModel.prototype.validateEntity = function (entity) {
            var errorMsg = [];

            if (errorMsg.length > 0) {
                return errorMsg;
            }
            return BaseFormModel.prototype.validateEntity.apply(this, arguments);
        };

        require('er/util').inherits(ShopFormModel, BaseFormModel);
        return ShopFormModel;
    }
);
