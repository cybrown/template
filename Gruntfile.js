module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-mocha-cli');

	grunt.initConfig({
	    mochacli: {
	        all: ['test/*.js']
	    }
	});

	grunt.registerTask('test', ['mochacli']);
};
