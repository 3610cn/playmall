define(
    function (require) {
        var Model = require('common/ListModel');
        var Data = require('./Data');
        var datasource = require('er/datasource');

        function UserListModel() {
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

        require('er/util').inherits(UserListModel, Model);
        return UserListModel;
    }
);
