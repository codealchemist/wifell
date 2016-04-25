/*global module:false*/
module.exports = function(grunt) {

  // load tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;*/',
    // Task configuration.
    clean: {
      dist: [
        'dist'
      ]
    },
    copy: {
      dist: {
        files: [
          // fonts
          {expand: true, flatten: true, src: ['bower_components/bootstrap/dist/fonts/'], dest: 'dist/fonts/', filter: 'isFile'},

          // html
          {expand: true, flatten: true, src: ['views/**/*.html'], dest: 'dist/', filter: 'isFile'}
        ]
      }
    },
    sass: {
        options: {
          sourceMap: true
        },
        dist: {
          src: ['app/styles/main.scss'],
          dest: 'dist/css/<%= pkg.name %>.css'
        }
    },
    concat: {
      options: {
        banner: '<%= banner %>\n',
        stripBanners: true,
        sourceMap: true,
        process: true
      },
      dist_js: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js',
          'app/js/main.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      },
      dist_css: {
        src: [
          'bower_components/bootstrap/dist/css/bootstrap.min.css',
          '<%= sass.dist.dest %>'
        ],
        dest: '<%= sass.dist.dest %>'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>\n',
        stripBanners: true
      },
      dist: {
        src: '<%= concat.dist_js.dest %>',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },
    cssmin: {
      css:{
        src: '<%= concat.dist_css.dest %>',
        dest: 'dist/css/<%= pkg.name %>.min.css'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', [
    // 'jshint',
    'clean',
    'copy',
    'sass',
    'concat',
    'cssmin',
    'uglify'
  ]);
};
