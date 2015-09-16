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
        }

        FreshFormModel.prototype.prepare = function () {
            BaseFormModel.prototype.prepare.call(this);
            var data = this.get('data');
            data.uploadUrl = '/api/upload/3';

            if (u.isString(data.imageList)) {
                var imageList = [];
                u.each(
                    data.imageList.split(','),
                    function (item) {
                        if (item) {
                            imageList.push(
                                {
                                    content: '<img src="' + item + '" />',
                                    value: item
                                }
                            );
                        }
                    }
                );
                data.imageList = imageList;
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
