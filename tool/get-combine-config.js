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
    var dependencies = [
        'eoo', 'er', 'ef', 'ub-ria', 'etpl', 'esui', 'mini-event', 'underscore', 'moment'
    ];

    // esl的延迟执行`factory`只是解决类似`extension`这种没有显式`require`进行依赖的模块，在业务系统上能保证加载顺序的情况，
    // 但并不代表esl会不主动去加载所需的依赖，如果一个打包脚本中有一些信赖的模块没打包进来，是会重新去加载单个模块文件的
    //
    // 解决这个问题需要多个条件：
    //
    // 1. 合并模块的启动脚本里一定包含依赖模块，但可能多个启动脚本依赖同一个模块，而启动脚本的加载顺序未定，因此需要重复打包
    // 2. 为了解决上一条的问题，使用HTML的`<script>`标签来加载启动脚本，保证顺序，这样可以将通用依赖模块只放在一个启动脚本中
    //
    // 如果esl支持类似`noRequest`的配置，也可以不使用`<script>`标签，但是几乎没有啥收益

    // 先来梳理下依赖关系，`echarts`、`saber-cookie`等相对独立所以不用列进来，处理了间接依赖以便看着清楚些
    //
    // |        | eoo | uioc | etpl | mini-event | underscore | moment | er | esui | ef | ub-ria |
    // | er     |     |      | ✓    | ✓          |            |        |    |      |    |        |
    // | esui   |     |      | ✓    | ✓          | ✓          | ✓      |    |      |    |        |
    // | ef     |     |      | ✓    | ✓          | ✓          | ✓      | ✓  | ✓    |    |        |
    // | ub-ria | ✓   |      | ✓    | ✓          | ✓          | ✓      | ✓  | ✓    | ✓  |        |
    // | common | ✓   | ✓    | ✓    | ✓          | ✓          | ✓      | ✓  | ✓    | ✓  | ✓      |
    //
    // 基本是阶梯式地增长，但如果把它们放在一个启动脚本里就实在太大了，肯定要拆成多个方向。
    //
    // 从上表再结合实际各库的大小来看，以各个包大小差距尽可能小为目标，比较合理的方案可能是这么来：
    //
    // 1. `esui`和`echarts`分别单独一个包，实在太大了
    // 2. `er`、`ub-ria`和`ef`这一类的东西，合成一个包
    // 3. 需要使用的主业务模块合成一个包，主业务模块应该包含用户点击一次导航所能到达的所有页面，以及2次点击所能到达的重要页面
    //
    // 根据日后代码的变化，可能产生的合并策略的变更：
    //
    // - 如果业务模块大小超过`esui`的大小，考虑把业务控件也放进`ui`中
    //
    // 上帝保佑你理得清这里的逻辑- -|||

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
        'experience/**'
    ];

    // 3个启动脚本
    var config = {
        'startup/ui': {
            files: [
                uiPackages,

                // 排除干扰
                negative(basePackages),
            ]
        },
        'startup/ria': {
            files: [
                // 包含RIA方向基础库
                basePackages, riaPackages,

                // 不包含上面`ui`已经有了的库，主要是`esui`的依赖库
                negative(uiPackages)
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
