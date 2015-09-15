var fs = require('fs');

// 后端服务器地址和端口
var proxyTarget = '120.26.76.247';
var proxyTargetPort = 8080;
// mockup开关
var MOCKUP = false;
// mockup目录
var mockupDir = '/mockup';

exports.port = 8848;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;
exports.getLocations = function () {
    return [
        {
            location: /\/$/,
            handler: home( 'index.html' )
        },
        {
            location: /^\/redirect-local/,
            handler: redirect('redirect-target', false)
        },
        {
            location: /^\/redirect-remote/,
            handler: redirect('http://www.baidu.com', false)
        },
        {
            location: '/empty',
            handler: empty()
        },
        {
            location: /\.css($|\?)/,
            handler: [
                autocss()
            ]
        },
        {
            location: /\.less($|\?)/,
            handler: [
                file(),
                less()
            ]
        },
        /**
        {
            location: /^\/api\/editUpload/,
            handler: [
                file('./mockup/editUpload.json')
            ]
        },
        {
            location: /^\/api\/upload/,
            handler: [
                file('./mockup/upload.json')
            ]
        },
        */
        {
            location: /^\/api\/.*$/,
            handler: [
                function(context) {
                    var pathname = context.request.pathname;
                    var method = context.request.method;
                    var conf = context.conf;
                    var docRoot  = conf.documentRoot;
                    var prefix = docRoot + mockupDir + pathname.replace(/^\/api/, '').replace(/\/\d+$/g, '');
                    var filePath = prefix;
                    if (MOCKUP) {
                        addJSONSuffix();
                        console.log('[MOCKUP]', pathname, '[' + method + ']', ' --> ', filePath);
                        file(filePath)(context);
                    }
                    else {
                        context.status = 404;
                    }

                    function addJSONSuffix() {
                        if (!/\.\w+$/.test(pathname)) {
                            filePath += '.json';
                            context.header[ 'Content-Type' ] = 'application/json';
                        }
                    }
                },
                function (context) {
                    if (MOCKUP) {
                    }
                },
                function(context) {
                    if (context.status == 404 || context.status == 302) {
                        proxy(proxyTarget, proxyTargetPort)(context);
                    }
                }
            ]
        },
        {
            location: /^.*$/,
            handler: [
                file()
            ]
        }
    ];
};

exports.injectResource = function ( res ) {
    for ( var key in res ) {
        global[ key ] = res[ key ];
    }
};
