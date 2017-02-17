module.exports = function (grunt) {
    grunt.initConfig({
        watch:{
            js : {
                files: ['src/**/*.js','tests/unit/**/*.js'],
                tasks: ['concat']
            }
        },
        uglify: {
            dljs: {
                options: {
                    sourceMap: true
                },
                files: {
                    "dist/dljs.min.js": ['src/*.js']
                }
            }
        },
        "bump": {
            options: {
                files: ['package.json','bower.json'],
                commit: true,
                createTag: true,
                push: true,
                pushTo: 'git@github.com:MikeSpock/dljs.git',
                commitMessage: 'Version bump - v%VERSION%',
                commitFiles: ['package.json','bower.json']
            }
        },
        "karma": {
            unit: {
                configFile: 'tests/unit/karma.conf.js',
                port: 9999,
                singleRun: true,
                browsers: ['PhantomJS'],
                logLevel: 'ERROR'
            },
            continuous: {
                configFile: 'tests/unit/karma.conf.js',
                port: 9999,
                autoWatch: true,
                singleRun: false,
                browsers: ['Chrome'],
                logLevel: 'ERROR'
            }
        },
        clean: ['dist']
    });

    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('watch-and-test', ['karma:continuous']);
    grunt.registerTask('default', ['clean','karma:unit','uglify']);
};