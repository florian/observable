class Observable

	@__observable:
		lastIds: {}
		events: {}

	utils =
		isPlainObject: (value) ->
			!!value && Object::toString.call(value) == '[object Object]'

		isArray: (value) ->
			Object::toString.call(value) == '[object Array]'

		toArray: (value) ->
			if utils.isArray(value) then value else [value]

	@on: (topics, fn) ->
		ids = []
		if utils.isPlainObject(topics)
			@on(topic, fn) for topic, fn of topics
		else
			topics = utils.toArray(topics)
			for topic in topics
				@__observable.lastIds[topic] ||= 0
				id = "#{topic};#{String(++@__observable.lastIds[topic])}"
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