var fs = require('fs');
var path = require('path');

var moduleConfigFile = path.resolve(__dirname, '..', 'module.conf');

exports.getSVNRevision = function (callback) {
    var svnInfoOutput = '';
    var svnInfo = require('child_process').exec(
        'svn info',
        function (err) {
            if (err) {
                callback(null);
                return;
            }
            var matches = /Revision: (\d+)/.exec(svnInfoOutput);
            var svnRevision = matches && matches[1];
            callback(svnRevision);
            return;
        }
    );
    svnInfo.stdout.on('data', function (data) { svnInfoOutput += data; });
};
