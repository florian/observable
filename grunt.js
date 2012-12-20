module.exports = function (grunt) {

	grunt.initConfig({

		meta: {
			banner: '// ' + grunt.file.read('LICENSE').split("\n")[0]
		},

		concat: {
			dist: {
				src: ['<banner>', 'lib/observable.js'],
				dest: 'lib/observable.js'
			}
		},

		coffee: {
			compile: {
				files: {
					'lib/observable.js': 'lib/observable.coffee'
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-coffee');

};