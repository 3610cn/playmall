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
            this.view.on(
                'modify',
                function (e) {
                    action.redirect('/experience/update~id=' + e.args);
                }
            );
            this.view.on(
                'create',
                this.redirect.bind(this, '/experience/create')
            );
            this.view.on(
                'delete',
                function (event) {
                    action.model.delete(event.args).then(
                        function (data) {
                            if (data.status === 0) {
                                action.reload();
                            }
                        }
                    );
                }
            );
        };

        require('er/util').inherits(ExperienceList, Action);
        return ExperienceList;
    }
);
