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
		},

		mocha: {
			all: {
				src: 'spec/index.html',
				run: true
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-mocha');

};