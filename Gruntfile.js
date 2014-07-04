module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: true
      },
      build: ['rl-velocity.js']
    },
    uglify: {
      options: {
        mangle: true,
        banner: '/*! <%= pkg.name %> - <%= pkg.author %> - <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'rl-velocity.js',
        dest: 'rl-velocity.min.js'
      }
    }
  });

  grunt.registerTask('build', ['jshint:build', 'uglify:build']);
  grunt.registerTask('default', ['build']);

};