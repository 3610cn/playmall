define(
    function (require) {
        var u = require('underscore');

        var Action = require('er/Action');

        function ExperienceList() {
            Action.apply(this, arguments);
        }

        ExperienceList.prototype.modelType = require('./ListModel');

        ExperienceList.prototype.viewType = require('./ListView');

        ExperienceList.prototype.initBehavior = function () {
            var me = this;
            var type = this.model.get('entityName');
            this.view.on(
                'modify',
                function (e) {
                    me.redirect('/' + type + '/update~id=' + e.args);
                }
            );
            this.view.on(
                'create',
                this.redirect.bind(this, '/' + type + '/create')
            );
            this.view.on(
                'delete',
                function (event) {
                    me.model.data().deleteById(event.args).then(
                        function (data) {
                            if (data.status === 0) {
                                me.reload();
                            }
                        }
                    );
                }
            );
            this.view.on(
                'bindCoupon',
                function (event) {
                    var id = event.args;
                    var items = me.model.get('list').data;
                    var item = u.find(
                        items,
                        function (item) {
                            return item.id == id;
                        }
                    );
                    var url = '/coupon/update~id=' + item.id + '&mallId=' + item.mallId;
                    if (item.couponId) {
                        url += '&couponId=' + item.couponId;
                    }

                    var options = {
                        url: url,
                        title: '设置优惠信息'
                    };

                    var dialog = this.view.popActionDialog(options);
                    dialog.on(
                        'actionloaded',
                        function () {
                            // console.log(arguments);
                        }
                    );
                    dialog.on(
                        'action@entitysave',
                        function () {
                            // me.reload();
                        }
                    );
                    return dialog;
                },
                this
            );
        };

        require('er/util').inherits(ExperienceList, Action);
        return ExperienceList;
    }
);
