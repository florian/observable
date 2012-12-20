module.exports = function (grunt) {

	var lib = 'lib/observable.js';
	var src = 'lib/observable.coffee';

	grunt.initConfig({

		meta: {
			banner: '// ' + grunt.file.read('LICENSE').split("\n")[0]
		},

		concat: {
			dist: {
				src: ['<banner>', lib],
				dest: lib
			}
		}

	});

};