define(
    function (require) {
        var Action = require('er/Action');

        function ShopList() {
            Action.apply(this, arguments);
        }

        ShopList.prototype.modelType = require('./ListModel');

        ShopList.prototype.viewType = require('./ListView');

        ShopList.prototype.initBehavior = function () {
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

        require('er/util').inherits(ShopList, Action);
        return ShopList;
    }
);
