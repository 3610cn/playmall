define(
    function (require) {
        var ui = require('esui');
        require('esui/Select');
        require('esui/TextBox');
        require('esui/BoxGroup');
        require('ub-ria-ui/TokenField');
        require('esui/RangeCalendar');
        ui.init();
        var ue = UE.getEditor('editor');
    }
);
