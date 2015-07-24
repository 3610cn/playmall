/**
 * tool/get-combine-config.js
 * @author leeight(liyubei@baidu.com), otakustay(otakustay@gmail.com)
 **/
var getBizNamespaces = require('./util').getBizNamespaces;
var getStandaloneBizBaseModules = require('./util').getStandaloneBizBaseModules;

function negative(array){
    return array.map(function(item){ return '!' + item; });
}

function expand(array) {
    var result = [];
    array.forEach(function(item) { result.push(item, item + '/**'); });
    return result;
}

function generateModuleCombineConfig() {

    // 基础库包
    var basePackages = [
        '~eoo', '~etpl', '~mini-event',
        '~underscore', 'moment', 'moment/moment',
        '~jquery', 'promise'
    ];

    // esui很大，所以单独一个包
    var uiPackages = [
        '~esui',
        '~ub-ria-ui',
        'ui/**'
    ];

    // RIA体系下的基础库包
    var riaPackages = [
        '~ub-ria', '~er', '~ef'
    ];

    // 业务模块包
    var bizPackages = [
        // 基础类
        'common/**',
        'experience/**',
        'fresh/**'
    ];

    // 3个启动脚本
    var config = {
        'startup/base': {
            files: [
                basePackages
            ]
        },
        'startup/ui': {
            files: [
                uiPackages,

                // 排除干扰
                negative(basePackages)
            ]
        },
        'startup/ria': {
            files: [
                // 包含RIA方向基础库
                riaPackages,

                // 不包含上面`ui`已经有了的库，主要是`esui`的依赖库
                negative(uiPackages),
                negative(basePackages)
            ]
        },
        'startup/biz': {
            files: [
                // 业务模块
                bizPackages,

                negative(basePackages),
                negative(uiPackages),
                negative(riaPackages) // 排除所有第三方库
            ]
        }
    };

    return config;
}

module.exports = generateModuleCombineConfig;

if (require.main === module) {
    // console.log(getBizNamespaces());
    console.log(JSON.stringify(generateModuleCombineConfig(), null, 2));
}
