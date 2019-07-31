module.exports = function(grunt) {
  grunt.initConfig({
    eslint: {
      options: {
        maxWarnings: 0,
      },
      client: {
        src: ["client/**/*.jsx"],
      },
      server: {
        src: ["web_service/**/*.js", "!web_service/static/**/*.js"],
      },
    },
    webpack: {
      options: require("./webpack.config.js"),
      once: {
        // Don't show progress bar.
        progress: false,
      },
      watch: {
        keepalive: true,
        watch: true,
      },
    },
    shell: {
      symlink: {
        command: "./bin/symlink.sh",
      },
      precommit: {
        command: "./bin/precommit.sh",
      },
      server: {
        command: "node web_service/web_server.js",
      },
      search: {
        command: "docker-compose -f search_service/docker-compose.yml up",
      },
      indexSearch: {
        command: "node search_service/indexSearch.js",
      },
    },
  });

  // Load plugins.
  grunt.loadNpmTasks("grunt-eslint");
  grunt.loadNpmTasks("grunt-shell");
  grunt.loadNpmTasks("grunt-webpack");

  // Add tasks.
  grunt.registerTask("symlink", "shell:symlink");
  grunt.registerTask("precommit", "shell:precommit");
  grunt.registerTask("web", "shell:server");
  grunt.registerTask("search", "shell:search");
  grunt.registerTask("indexSearch", "shell:indexSearch");
  grunt.registerTask("transpile", "webpack:watch");
  grunt.registerTask("default", "webpack:watch");

  grunt.registerTask("web-prod", [
    "shell:symlink",
    "webpack:once",
    "shell:server",
  ]);
};
