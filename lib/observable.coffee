class Observable

	utils =
		isPlainObject: (value) ->
			!!value && Object::toString.call(value) is '[object Object]'

		isArray: (value) ->
			Object::toString.call(value) is '[object Array]'

		toArray: (value) ->
			if utils.isArray(value) then value else [value]

	constructor: ->
		@__observable =
			lastIds: {}
			events: {}

	on: (topics, fn, once) ->
		if utils.isPlainObject(topics)
			once = fn
			@on(topic, fn, once) for topic, fn of topics
		else
			topics = utils.toArray(topics)
			ids = []
			for topic in topics
				@__observable.lastIds[topic] ||= 0
				id = "#{topic};#{String(++@__observable.lastIds[topic])}"
				id += ' once' if once
				ids.push(id)
				@__observable.events[topic] ||= {}
				@__observable.events[topic][id] = fn
			if ids.length is 1 then ids[0] else ids

	once: (topics, fn) ->
		@on(topics, fn, true)

	off: (ids) ->
		ids = utils.toArray(ids)
		for id in ids
			continue if typeof id isnt 'string'
			topic = id.substr(0, id.lastIndexOf(';')).split(' ')[0]
			delete @__observable.events[topic][id] if @__observable.events[topic]? and @__observable.events[topic][id]?
		@

	trigger: (topic, args) ->
		return @ unless @__observable.events[topic]?

		for id, fn of @__observable.events[topic]
			fn(args...)
			@off(id) if id.lastIndexOf(' once') is id.length - 1
		@


if typeof define is 'function' and define.amd
	define 'observable', -> Observable
else if typeof exports isnt 'undefined'
	module.exports = Observable
else
	window.Observable = Observable