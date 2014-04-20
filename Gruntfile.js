/**
 * Created by: Terrence C. Watson
 * Date: 3/25/14
 * Time: 10:26 PM
 */
module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.initConfig({
    //karma: {
      mochaTest: {
        unit: {
          options: {
            reporter: 'spec',
            clearRequireCache: true
          },
          src: ['test/unit/**/*.js', 'test/unit/*.js'],
          files: {
            rootDirectory: '../../../'
          }
        }
      },
      watch: {
        scripts: {
          options: {
            spawn: true
          },
          files: ['src/*.js', 'src/**/*.js', 'test/unit/**/*.js'],
          tasks: ["test:unit"]
        },
        
      }
    //}
  });
  /*var defaultTestSrc = grunt.config('mochaTest.unit.src');
  grunt.event.on('watch', function(action, filepath){
    grunt.config('mochaTest.unit.src', defaultTestSrc);
    if (filepath.match('unit/')){
      grunt.config('mochaTest.unit.src', filepath);
    }
  });*/
  grunt.registerTask('test:unit', ['mochaTest:unit']);
};