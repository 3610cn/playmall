define(
    function (require) {
        var Model = require('er/Model');
        var datasource = require('er/datasource');

        function ExperienceListModel() {
            Model.apply(this, arguments);

            var url = this.get('url');
            this.datasource = {
                list: datasource.remote(
                    '/api/experience/list',
                    {
                        method: 'GET',
                        data: {
                            page: url.getQuery('page') || 0,
                            pageSize: url.getQuery('pageSize') || 0
                        }
                    }
                )
            };
        }

        ExperienceListModel.prototype.delete = function (id) {
            return datasource.remote(
                '/api/deleteExperience',
                {
                    data: {
                        id: id
                    }
                }
            )();
        };

        require('er/util').inherits(ExperienceListModel, Model);
        return ExperienceListModel;
    }
);
