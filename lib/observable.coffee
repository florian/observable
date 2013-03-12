class Observable

	utils =
		is: (type, value) ->
			Object::toString.call(value).match(/\s(\w+)/)[1].toLowerCase() is type

		isPlainObject: (value) ->
			!!value && utils.is('object', value)

		toArray: (value) ->
			if utils.is('array', value) then value else [value]

	constructor: (host = {}) ->
		host.__observable =
			lastIds: {}
			events: {}
			ids: []
		host[key] = fn for key, fn of Observable.prototype
		return host

	on: (topics, fn, once) ->
		if utils.isPlainObject(topics)
			once = fn
			@on(topic, fn, once) for topic, fn of topics
		else
			topics = utils.toArray(topics)
			@__observable.ids.length = 0
			for topic in topics
				@__observable.lastIds[topic] ||= 0
				id = "#{topic};#{++@__observable.lastIds[topic]}"
				id += ' once' if once
				@__observable.ids.push(id)
				@__observable.events[topic] ||= {}
				@__observable.events[topic][id] = fn
		@

	once: (topics, fn) ->
		@on(topics, fn, true)

	off: (obj) ->
		if obj is undefined
			@__observable.events = {}
		else
			for id in obj.__observable.ids
				topic = id.substr(0, id.lastIndexOf(';')).split(' ')[0]
				delete obj.__observable.events[topic][id] if obj.__observable.events[topic]
		@

	trigger: (topic, args = []) ->
		for id, fn of @__observable.events[topic]
			fn(args...)
			@off(id) if id.lastIndexOf(' once') is id.length - 1
		@


if typeof define is 'function' and define.amd
	define 'observable', [], -> Observable
else if typeof exports isnt 'undefined'
	module.exports = Observable
else
	window.Observable = Observable
