module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
          '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
          ' License: <%= pkg.license %> */\n',
    jshint: {
      options: {
        jshintrc: true
      },
      build: ['<%= pkg.name %>.js']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: {
          block: true
        }
      },
      build: {
        src: ['<%= pkg.name %>.js'],
        dest: '<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
        mangle: true
      },
      build: {
        src: '<%= pkg.name %>.js',
        dest: '<%= pkg.name %>.min.js'
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'],
        commit: true,
        commitMessage: 'chore(release): %VERSION%',
        commitFiles: ['.'],
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: 'Release %VERSION%',
        pushTo: 'origin'
      }
    }
  });


  grunt.registerTask("release", "Release a new version, push it and publish it", function(target) {
    if (!target) {
      target = "patch";
    }
    return grunt.task.run("bump-only:" + target, "build", "bump-commit");
  });
  grunt.registerTask('build', ['jshint:build', 'concat:build', 'uglify:build']);
  grunt.registerTask('default', ['build']);

};