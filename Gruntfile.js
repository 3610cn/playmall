var config = {
};

process.argv.forEach(function(val, index) {
    if (/^-(\w+):?(.*)?/.test(val)) {
        config[RegExp.$1] = RegExp.$2 === '' ? true : RegExp.$2;
    }
});

module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig(
        {
            watch: {
                less: {
                    files: 'src/css/*.less',
                    tasks: ['less:dev'],
                    options: {
                        debounceDelay: 250
                    }
                }
            },
            less: {
                dev: {
                    options: {
                        paths: [
                        ]
                    },
                    files: {
                        'src/css/main.css': 'src/css/main.less'
                    }
                }
            }
        }
    );

    // 加载自定义task
    // grunt.loadTasks('grunt');

    /**
     * 默认启动时的执行顺序
     *
     * $ grunt
     */
    grunt.registerTask('default', ['watch']);
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
};
