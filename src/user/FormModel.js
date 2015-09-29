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

        function UserFormModel() {
            BaseFormModel.apply(this, arguments);
            var entityName = this.getUrlType();
            this.addData(new Data(entityName));

            this.putDatasource(ROLE);
        }

        UserFormModel.prototype.prepare = function () {
            BaseFormModel.prototype.prepare.call(this);
            var data = this.get('data');
            this.set('data', data);
        }

        UserFormModel.prototype.save = function(data) {
            if (data.date) {
                data.date = m(data.date).format('YYYYMMDD');
            }
            return BaseFormModel.prototype.save.apply(this, arguments);
        };

        UserFormModel.prototype.validateEntity = function (entity) {
            var errorMsg = [];

            if (entity.password !== entity.confirmPassword) {
                errorMsg.push(
                    {
                        field: 'confirmPassword',
                        message: '两次输入的密码不一致'
                    }
                );
            }
            if (errorMsg.length > 0) {
                return errorMsg;
            }
            return BaseFormModel.prototype.validateEntity.apply(this, arguments);
        };

        require('er/util').inherits(UserFormModel, BaseFormModel);
        return UserFormModel;
    }
);
