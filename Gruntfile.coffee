module.exports = (grunt) ->

	grunt.initConfig
		concat:
			options:
				banner: '// ' + grunt.file.read('LICENSE').split("\n")[0] + "\n"
				stripBanners: true
			dist:
				src: ['<banner>', 'lib/observable.js']
				dest: 'lib/observable.js'

		coffee:
			compile:
				files:
					'lib/observable.js': 'lib/observable.coffee'
					'spec/spec.js': 'spec/spec.coffee'

		mocha:
			all:
				src: 'spec/index.html'
				run: true

		watch:
			files: ['lib/observable.coffee', 'spec/*']
			tasks: 'coffee'

		grunt.loadNpmTasks('grunt-contrib-coffee')
		grunt.loadNpmTasks('grunt-mocha')
		grunt.loadNpmTasks('grunt-contrib-concat')

		grunt.registerTask('test', 'mocha')
		grunt.registerTask('release', ['coffee', 'concat', 'mocha'])
		grunt.registerTask('default', 'release')
