/**
 * PlayMall
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @file 控件默认属性
 * @author otakustay
 */
define(
    function (require) {
        /* eslint-disable fecs-camelcase */
        return {
            Wizard: {
                steps: [
                    {number:'1', text: '基本信息'},
                    {number:'2', text: '活动审核'},
                    {number:'3', text: '活动上线'}
                ],
                nodeTemplate: '<span class="ui-wizard-node-number">${number}</span><span class="ui-wizard-node-text">${text}</span>'
            }
        };
    }
);
