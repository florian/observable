class Observable

	@__observable:
		id: -1
		events: {}

	utils =
		isPlainObject: (value) ->
			!!value && Object::toString.call(value) == '[object Object]'

	@on: (topics..., fn) ->
		if utils.isPlainObject(topics[0])
			console.log(true)
		else
			ids = []
			for topic in topics
				id = String(++@__observable.id)
				ids.push(id)
				@__observable.events[topic] ||= {}
				@__observable.events[topic][id] = fn
		if ids.length is 1 then ids[0] else ids


	@off: (ids) ->

	@trigger: (id, args) ->


if typeof define is 'function' and define.amd
	define -> Observable
else if typeof exports is not 'undefined'
	module.exports = Observable
else
	window.Observable = Observable