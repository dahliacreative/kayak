module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: ['app']
    },

    copy: {
      build: {
        files: [{
        expand: true,
        cwd: 'src/fonts',
        src: ['**/*.*'],
        dest: 'app/fonts'
      }]
      }
    },

    sass: {
      build: {
        options: {
          style: 'compressed',
          loadPath: require('node-bourbon').includePaths,
          require: 'sass-globbing'
        },
        files: {
          'app/stylesheets/application.css': 'src/stylesheets/application.sass'
        }
      },
      dist: {
        options: {
          style: 'compressed',
          loadPath: require('node-bourbon').includePaths,
          require: 'sass-globbing',
          sourcemap: 'none'
        },
        files: {
          'app/stylesheets/application.css': 'src/stylesheets/application.sass'
        }
      }
    },

    concat: {
      build: {
        options: {
          sourceMap: true
        },
        files: {
          'app/javascript/application.js' : [
          'src/javascript/vendor/*.js',
          'src/javascript/modules/*.js',
          'src/javascript/application.js'
          ],
        }
      },
      dist: {
        options: {
          sourceMap: false
        },
        files: {
          'app/javascript/application.js' : [
          'src/javascript/vendor/*.js',
          'src/javascript/modules/*.js',
          'src/javascript/application.js'
          ],
        }
      }
    },

    uglify: {
      options: {
        sourceMap: false,
      },
      build: {
        files: [{
          expand: true,
          cwd: 'app/javascript',
          src: ['**/*.js'],
          dest: 'app/javascript'
        }]
      }
    },

    imagemin: {
      build: {
        files: [{
          expand: true,
          cwd: 'src/images',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'app/images'
        }]
      }
    },

    watch: {
      css: {
        files: ['src/stylesheets/**/*'],
        tasks: ['sass:build'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      js: {
        files: ['src/javascript/**/*.js'],
        tasks: ['concat:build'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      html: {
        files: ['index.html'],
        tasks: [],
        options: {
          spawn: false,
          livereload: true
        }
      },
      images: {
        files: ['src/images/**/*'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      fonts: {
        files: ['src/fonts/**/*'],
        tasks: ['copy'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }

  });

  // Load Tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'copy', 'sass:build', 'concat:build', 'imagemin', 'watch']);
  grunt.registerTask('production', ['clean', 'copy', 'sass:dist', 'concat:dist', 'uglify', 'imagemin']);

};