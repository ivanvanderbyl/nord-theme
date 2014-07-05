module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dist: {
        options: {
          sassDir: 'src/scss',
          cssDir: 'tmp/css',
          environment: 'production'
        }
      },
    },

    cssmin: {
      combine: {
        files: {
          'assets/css/all.css': ['src/scss/icons.css', 'tmp/mini/vendor/**/*.css', 'tmp/mini/tmp/**/*.css']
        }
      },

      minify: {
        expand: true,
        cwd: '.',
        src: ['vendor/css/*.css', 'tmp/css/*.css', 'tmp/css/!*.min.css'],
        dest: 'tmp/mini',
        ext: '.min.css'
      }
    },

    watch: {
      scripts: {
        files: ['src/**/*.css', 'src/**/*.scss'],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('compile', ['compass', 'cssmin:minify', 'cssmin:combine']);
  grunt.registerTask('default', ['compile']);

};
