module.exports = function (grunt) {
  var SERVER_PORT = 8000;
  var RELOAD_PORT = 35729;
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    devserver: { server: {}, options: { port: SERVER_PORT } },
    watch: {
      js: {
        files: ["js/*.js", "index.html", "css/*.css"],
        options: { livereload: true },
        tasks: ["depend-concat"],
      },
    },
    // Combines dependency .js to one .js file
    "depend-concat": {
      /*
            @depends /path/to/dependency.js
        */
      depends_doctag: {
        options: {
          method: {
            type: "doctag",
            tag: "depends",
          },
        },
        src: ["js/*.js"],
        dest: "build/<%= pkg.name %>.js",
      },
    },
    // creates *.min.js
    terser: {
      your_target: {
        src: ["build/<%= pkg.name %>.js"],
        dest: "dist/<%= pkg.name %>.min.js",
      },
    },
  });

  grunt.loadNpmTasks("grunt-devserver");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.loadNpmTasks("grunt-terser");
  grunt.loadNpmTasks("grunt-depend-concat");

  grunt.registerTask("dist", ["depend-concat", "terser"]);
};
