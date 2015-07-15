define(
    function (require) {
        var Action = require('er/Action');

        function FreshList() {
            Action.apply(this, arguments);
        }

        FreshList.prototype.modelType = require('./ListModel');

        FreshList.prototype.viewType = require('./ListView');

        FreshList.prototype.initBehavior = function () {
            var action = this;
            var type = this.model.get('entityName');
            this.view.on(
                'modify',
                function (e) {
                    action.redirect('/' + type + '/update~id=' + e.args);
                }
            );
            this.view.on(
                'create',
                this.redirect.bind(this, '/' + type + '/create')
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

        require('er/util').inherits(FreshList, Action);
        return FreshList;
    }
);
