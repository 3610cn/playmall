define(
    function(require) {
        var Action = require('common/FormAction');

        var $ = require('jquery');

        function ExperienceForm() {
            Action.apply(this, arguments);
        }

        ExperienceForm.prototype.modelType = require('./FormModel');

        ExperienceForm.prototype.viewType = require('./FormView');

        ExperienceForm.prototype.initBehavior = function() {
            Action.prototype.initBehavior.apply(this, arguments);
        };

        require('er/util').inherits(ExperienceForm, Action);

        return ExperienceForm;
    }
);
