A = new Observable()
A.__asyncEvents = false
events = A.__eventStore

eventSystemAvailable = (obj) ->
	expect(obj.on).to.be.a('function')
	expect(obj.once).to.be.a('function')
	expect(obj.trigger).to.be.a('function')
	expect(obj.off).to.be.a('function')
	expect(obj.__eventStore).to.be.an('object')

eventAmount = (topic) ->
	(events[topic] or []).length

describe 'Observable', ->
	afterEach ->
		events = A.__eventStore = {}

	it 'should be a property of window', ->
		expect(window).to.have.property('Observable')

	describe 'constructor', ->
		it 'should create a fresh object when passing 0 arguments', ->
			_ = new Observable()
			expect(_).to.satisfy(eventSystemAvailable)


	describe 'mixin', ->
		it 'it should be able to mixin the prototype to other objects', ->
			_ = a: 1
			Observable.mixin(_)
			expect(_).to.satisfy(eventSystemAvailable)
			expect(_).to.have.property('a')

	describe 'on', ->
		it 'should be a function', ->
			expect(A.on).to.be.a('function')

		it 'should add the event to the store when setting one topic', ->
			A.on 'a', ->
			expect(events).to.have.property('a')

		it 'should add the events to the store when setting several topics', ->
			A.on ['a', 'b'], ->
			expect(events).to.have.keys('a', 'b')

		it 'should add the events to the store when setting with an object', ->
			A.on
				a: ->
				b: ->
			expect(events).to.have.keys('a', 'b')

	describe 'once', ->
		it 'it should save subscribers and mark them as "once"', ->
			A.once 'a', ->
			expect(events.a[0].once).to.be.true

	describe 'off', ->
		it 'should be a function', ->
			expect(A.off).to.be.a('function')

		it 'should be able to remove a single topic', ->
			a = ->
			A.on 'a', a
			A.off 'a', a
			expect(eventAmount('a')).to.eql(0)

		it 'should remove an array of ids', ->
			a = ->
			A.on ['a', 'b'], a
			A.off ['a', 'b'], a
			expect(eventAmount('a')).to.eql(0)
			expect(eventAmount('b')).to.eql(0)

		it 'should not throw an error when passing a non-existing topic', ->
			expect(-> A.off('nonexisting')).not.to.throw(Error)

		it 'should be able to remove topics that were set using once', ->
			a = ->
			A.once 'a', a
			A.off 'a', a
			expect(eventAmount('a')).to.eql(0)

		it 'should be able to unsubscribe from all chained subscribtions', ->
			a = ->
			b = ->
			A.on('a', a).on('a', b).off('a', a).off('a', b)
			expect(eventAmount('a')).to.eql(0)

		it 'should remove all events when passing in 0 arguments', ->
			A.on 'a', ->
			A.on 'a', ->
			A.on 'a', ->
			A.on 'a', ->
			A.off('a')
			expect(eventAmount('a')).to.eql(0)

		it 'should return the parent object', ->
			expect(A.off()).to.equal(A)
			expect(A.off('x')).to.equal(A)

	describe 'trigger', ->
		it 'should be a function', ->
			expect(A.trigger).to.be.a('function')

		it 'should trigger functions that were subscribed alone', ->
			fn = chai.spy()
			A.on('a', fn).trigger('a')
			expect(fn).to.have.been.called

		it 'should trigger functions that were subscribed to several topics', ->
			fn = chai.spy()
			A.on(['a', 'b'], fn).trigger('a')
			expect(fn).to.have.been.called

		it 'should trigger functions that were subscribed to several topics for all topics', ->
			fn = chai.spy()
			A.on(['a', 'b'], fn).trigger('a').trigger('b')
			expect(fn).to.have.been.called.twice

		it 'should trigger functions that were subscribed using an object', ->
			f = chai.spy()
			g = chai.spy()

			A.on(a: f, b: g).trigger('a')
			expect(f).to.have.been.called

			A.trigger('b')
			expect(g).to.have.been.called

		it 'should call a function everytime a subscribed event is triggered', ->
			f = chai.spy()
			A.on('a', f)
			A.trigger('a') for i in [1..10]

			expect(f).to.have.been.called(10).times

		it 'should trigger all the functions that are subscribed to the topic', ->
			fn = chai.spy()
			A.on('a', fn).on('a', fn).trigger('a')
			expect(fn).to.have.been.called.twice

		it 'should pass the specified arguments', ->
			fn = chai.spy (one, two) ->
				expect(one).to.eql([1, 2])
				expect(two).to.be.true

			A.on 'a', fn
			A.trigger 'a', [[1, 2], true]
			expect(fn).to.have.been.called

		it 'should not throw an error when passing a non-existing topic', ->
			expect(-> A.trigger()).not.to.throw(Error)
			expect(-> A.trigger("non-existing topic")).not.to.throw(Error)

		it 'should remove topics set using once after firing them', ->
			A.once 'a', ->
			A.trigger 'a'
			expect(eventAmount('a')).to.eql(0)

		it 'should return the parent object', ->
			expect(A.trigger('x')).to.equal(A)
