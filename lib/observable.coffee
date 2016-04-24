isType =  (type, value) ->
	Object::toString.call(value).match(/\s(\w+)/)[1].toLowerCase() is type

isPlainObject =  (value) ->
	!!value && isType('object', value)

toArray = (value) ->
	if isType('array', value) then value else [value]

class Observable
	constructor: ->
		@__eventStore = {}
		@__asyncEvents = true

	@mixin: (host) ->
		host.__eventStore = {}
		host[key] = fn for key, fn of Observable.prototype

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
		if not fn
			for topic in toArray(topics)
				@__eventStore[topic] = []
		if isPlainObject(topics)
			@off(topic, fn) for topic, fn of topics
		else
			for topic in toArray(topics)
				@__eventStore[topic] = (@__eventStore[topic] or []).filter((subscriber) -> subscriber.fn isnt fn)
		@

	trigger: (topic, args) ->
		@__eventStore[topic]?.forEach ({ fn, once }) =>
			if @__asyncEvents
				setTimeout (-> fn(args...)), 1
			else
				fn(args...)

			@off(topic, fn) if once
		@

if typeof define is 'function' and define.amd
		define 'observable', [], -> Observable
else if typeof exports isnt 'undefined'
		module.exports = Observable
else
		window.Observable = Observable
