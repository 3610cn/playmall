define(
    function (require) {
        var BaseFormModel = require('common/FormModel');
        var Data = require('./Data');
        var GlobalData = require('common/GlobalData');
        var m = require('moment');
        var u = require('underscore');

        function ExperienceFormModel() {
            BaseFormModel.apply(this, arguments);
            var entityName = this.getUrlType();
            this.addData(new Data(entityName));
        }

        ExperienceFormModel.prototype.prepare = function () {
            BaseFormModel.prototype.prepare.call(this);
            var data = this.get('data');
            data.uploadUrl1 = '/api/upload/1';
            data.uploadUrl2 = '/api/upload/2';
            if (this.get('formType') === 'update') {
                data.tagList = data.tagList || [];
                data.tags = data.tagList.join(',');
                data.pic1 = {
                    data: {
                        url: data.pic1
                    }
                };
                data.pic2 = {
                    data: {
                        url: data.pic2
                    }
                };
            }

            var system = this.getSystem();
            var categoryList = system[this.get('entityName') + 'CategoryList'];
            data.categoryList = [{value: '', text: '请选择'}].concat(categoryList);

            this.set('data', data);
        }

        ExperienceFormModel.prototype.validateEntity = function (entity) {
            var errorMsg = [];

            // 验证逻辑示例
            u.each(
                ['pic1', 'pic2'],
                function (item){
                    if (!entity[item]) {
                        errorMsg.push(
                            {
                                field: item,
                                message: '请上传文件'
                            }
                        );
                    }

                }
            );

            if (errorMsg.length > 0) {
                return errorMsg;
            }
            return BaseFormModel.prototype.validateEntity.apply(this, arguments);
        };

        ExperienceFormModel.prototype.save = function(data) {
            return BaseFormModel.prototype.save.apply(this, arguments);
        };

        require('er/util').inherits(ExperienceFormModel, BaseFormModel);
        return ExperienceFormModel;
    }
);
