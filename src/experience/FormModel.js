define(
    function (require) {
        var BaseFormModel = require('common/FormModel');
        var Data = require('./Data');
        var GlobalData = require('common/GlobalData');
        var datasource = require('er/datasource');
        var m = require('moment');
        var u = require('underscore');
        var system = GlobalData.getInstance().getSystem();

        function ExperienceFormModel() {
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
            var cityList = u.map(system.mallList, function (item) {return u.omit(item, 'children')});
            this.datasource.push(
                {
                    cityList: datasource.constant(cityList)
                }
            );
        }

        ExperienceFormModel.prototype.getMallList = function (city) {
            var mallList = u.findWhere(system.mallList, {value: city});
            return mallList && mallList.children || [];
        };

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

            if (data.categoryList) {
                data.categoryList = [{value: '', text: '请选择'}].concat(data.categoryList);
            }
            this.set('data', data);

            this.set('mallList', this.getMallList(data.city || system.mallList[0].value));
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
