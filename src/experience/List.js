define(
    function (require) {
        var Action = require('er/Action');

        function ExperienceList() {
            Action.apply(this, arguments);
        }

        ExperienceList.prototype.modelType = require('./ListModel');

        ExperienceList.prototype.viewType = require('./ListView');

        ExperienceList.prototype.initBehavior = function () {
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
            this.view.on(
                'bindCouple',
                function (event) {
                    var panel = this.getChild('couplePanel');
                    var options = {
                        url: '/creative/image/update~id=' + id
                    };
                    if (!panel) {
                        var ActionPanel = require('ef/ActionPanel');
                        panel = new ActionPanel(options);
                        this.addChild(panel, 'couplePanel');
                    }
                    else {
                        panel.setProperties(options);
                    }

                    panel.appendTo(document.body);
                    panel.on('actionloaded', u.bind(bindCouple, this, action));
                    return panel;
                }
            );
        };

        /**
         * 往子action上捆绑各种事件
         *
         */
        function bindCouple(action, id) {
            var coupleAction = ui.get('couple-action-wrapper');
            if (coupleAction) {
                coupleAction.destroy();
            }
            action.get('action').on(
                'cancel',
                function (e) {
                    e.preventDefault();
                    action.dispose();
                }
            );
            var me = this;
            action.get('action').on(
                'entitysave',
                function (e) {
                    e.preventDefault();
                    me.view.fire(
                        'savecouple',
                        {
                            entity: e.entity
                        }
                    );
                    action.dispose();
                },
                this
            );
        }


        require('er/util').inherits(ExperienceList, Action);
        return ExperienceList;
    }
);
