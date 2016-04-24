isType =  (type, value) ->
	Object::toString.call(value).match(/\s(\w+)/)[1].toLowerCase() is type

isPlainObject =  (value) ->
	!!value && isType('object', value)

toArray = (value) ->
	if isType('array', value) then value else [value]

class Observable
	constructor: ->
		@__eventStore = {}

	on:  (topics, fn, once = false) ->
		if isPlainObject(topics)
			@on(topic, fn) for topic, fn of topics
		else
			for topic in toArray(topics)
				@__eventStore[topic] or= []
				@__eventStore[topic].push({ fn, once })
		@

	once: (topics, fn) ->
		if fn
			@on(topics, fn, true)
		else
			@on(topics, true)

	off: (topics, fn) ->
		if isPlainObject(topics)
			@off(topic, fn) for topic, fn of topics
		else
			for topic in toArray(topics)
				@__eventStore[topic] = @__eventStore[topic].filter((subscriber) -> subscriber.fn isnt fn)
		@

	trigger: (topic, args) ->
		@__eventStore[topic].forEach ({ fn, once }) =>
			fn(args...)
			@off(topic, fn) if once
		@
