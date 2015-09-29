define(
    function (require) {
        var Action = require('er/Action');

        function UserList() {
            Action.apply(this, arguments);
        }

        UserList.prototype.modelType = require('./ListModel');

        UserList.prototype.viewType = require('./ListView');

        UserList.prototype.initBehavior = function () {
            var action = this;
            var type = this.model.get('entityName');
            this.view.on(
                'modify',
                function (e) {
                    action.redirect('/' + type + '/update~id=' + e.args);
                }
            );
            // 新建
            this.view.on(
                'create',
                this.redirect.bind(this, '/' + type + '/create')
            );
            // 核销抢鲜码
            this.view.on(
                'verify',
                this.redirect.bind(this, '/' + type + '/verify')
            );

            this.view.on(
                'delete',
                function (event) {
                    action.model.data().deleteById(event.args).then(
                        function (data) {
                            if (data.status === 0) {
                                action.reload();
                            }
                        }
                    );
                }
            );
        };

        require('er/util').inherits(UserList, Action);
        return UserList;
    }
);
