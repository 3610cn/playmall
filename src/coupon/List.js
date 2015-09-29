define(
    function (require) {
        var Action = require('er/Action');

        function CouponList() {
            Action.apply(this, arguments);
        }

        CouponList.prototype.modelType = require('./ListModel');

        CouponList.prototype.viewType = require('./ListView');

        CouponList.prototype.initBehavior = function () {
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

        require('er/util').inherits(CouponList, Action);
        return CouponList;
    }
);
