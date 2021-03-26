module.exports = function (grunt) {
  var SERVER_PORT = 8000;
  var RELOAD_PORT = 35729;
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    devserver: {
      server: {},
      options: {
        port: SERVER_PORT,
        base: ".",
      },
      tasks: ["build"],
    },
    watch: {
      js: {
        files: [
          "json/**/*.json",
          "js/**/*.js",
          "js/*.js",
          "index.html",
          "css/**/*.css",
          "styles/**/*.scss",
          "assets/**",
        ],
        options: { livereload: true },
        tasks: ["build"],
      },
    },
    jshint: {
      esversion: 6,
      jshintrc: true,
      beforeconcat: ["js/Board.js"],
      afterconcat: ["b/"],
    },
    sass: {
      // Task
      dist: {
        // Target
        options: {
          // Target options
          style: "expanded",
        },
        files: {
          // Dictionary of files
          "build/css/main.css": "styles/main.scss", // 'destination': 'source'
        },
      },
    },
    json: {
      main: {
        options: { namespace: "talisman" },
        src: ["json/**/*.json"],
        dest: "build/compiled_json.js",
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
        src: [
          "node_modules/javascript-state-machine/dist/state-machine.js",
          "node_modules/dice-js/dist/dice.js",
          "build/compiled_json.js",
          "js/+Entities/**.js",
          "js/modifiers/**.js",
          "js/items/**.js",
          "js/followers/**.js",
          "js/characters/**.js",
          "js/creatures/**.js",
          "js/**/*.js",
        ],
        dest: "build/<%= pkg.name %>.js",
      },
    },
    // creates *.min.js
    terser: {
      your_target: {
        src: ["build/<%= pkg.name %>.js"],
        dest: "dist/js/<%= pkg.name %>.min.js",
      },
    },
    copy: {
      css_assets: {
        expand: true,
        src: ["build/css/**"],
        dest: "dist/css",
        flatten: true,
      },
      build_assets: {
        expand: true,
        src: ["assets/**/**"],
        flatten: false,
        dest: "build/",
      },
      dist_assets: {
        expand: true,
        src: ["assets/**/**"],
        flatten: false,
        dest: "dist/",
      },
      public: {
        expand: true,
        src: ["public/*"],
        flatten: true,
        dest: "dist/public/",
      },
    },
    processhtml: {
      dist: { files: { "dist/index.html": ["index.html"] } },
    },
    "gh-pages": {
      options: {
        base: "dist",
        branch: "main",
      },
      src: ["**"],
    },
  });

  grunt.loadNpmTasks("grunt-devserver");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jshint");

  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-json");
  grunt.loadNpmTasks("grunt-terser");
  grunt.loadNpmTasks("grunt-depend-concat");

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-processhtml");
  grunt.loadNpmTasks("grunt-gh-pages");

  grunt.registerTask("build", ["json", "depend-concat", "sass", "copy"]);
  grunt.registerTask("dist", [
    "build",
    "terser",
    "sass",
    "processhtml",
    "copy",
  ]);

  grunt.registerTask("github", ["dist", "gh-pages"]);
};
