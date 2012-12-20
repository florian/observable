class Observable

	@__observable:
		id: -1
		events: {}

	@on: ->

	@off: (ids) ->

	@trigger: (id, args) ->


if typeof define is 'function' and define.amd
	define -> Observable
else if typeof exports is not 'undefined'
	module.exports = Observable
else
	window.Observable = Observable