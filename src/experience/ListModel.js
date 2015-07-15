define(
    function (require) {
        var Model = require('common/ListModel');
        var Data = require('./Data');
        var datasource = require('er/datasource');

        function ExperienceListModel() {
            Model.apply(this, arguments);
            var entityName = this.getUrlType();
            this.addData(new Data(entityName));

            this.datasource = {
                list: function (model) {
                    return model.data().search().then(
                        function (data) {
                            return data;
                        }
                    );
                }
            };
        }

        ExperienceListModel.prototype.list = function () {
            var url = this.get('url');
            var type = this.get('entityName');
            return datasource.remote(
                '/api/' + type + '/list',
                {
                    method: 'GET',
                    data: {
                        page: url.getQuery('page') || 0,
                        pageSize: url.getQuery('pageSize') || 0
                    }
                }
            );
        };

        ExperienceListModel.prototype.delete = function (id) {
            var type = this.get('pascalEntityName');
            return datasource.remote(
                '/api/delete' + type,
                {
                    data: {
                        id: id
                    }
                }
            )();
        };

        ExperienceListModel.prototype.getUrlType = function (pascalType) {
            var url = this.get('url');
            var path = url.getPath();
            var splits = path.split('/');
            var type = splits[1] || 'experience';
            if (pascalType) {
                type = type.charAt(0).toUpperCase() + type.slice(1);
            }
            return type;
        };

        require('er/util').inherits(ExperienceListModel, Model);
        return ExperienceListModel;
    }
);
