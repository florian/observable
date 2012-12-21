A = $.extend(true, Observable)
lastIds = A.__observable.lastIds
events = A.__observable.events

describe 'Observable', ->
	afterEach ->
		lastIds = A.__observable.lastIds = {}
		events = A.__observable.events = {}

	it 'should be a property of window', ->
		expect(window).to.have.property('Observable')

	describe 'on', ->
		it 'should be a function', ->
			expect(A.on).to.be.a('function')

		it 'should return an id when setting one topic', ->
			id = A.on 'a', ->
			expect(id).to.be.a('string')
			expect(id).to.contain('a;')

		it 'should add the event to the store when setting one topic', ->
			id = A.on 'a', ->
			expect(events).to.have.property('a')
			expect(events.a[id]).to.be.a('function')

		it 'should return an array of ids when setting several topics', ->
			ids = A.on ['a', 'b'], ->
			expect(ids).to.be.an('array')
			expect(ids[0]).to.contain('a;')
			expect(ids[1]).to.contain('b;')

		it 'should add the events to the store when setting several topics', ->
			ids = A.on ['a', 'b'], ->
			expect(events).to.have.property('a')
			expect(events.a[ids[0]]).to.be.a('function')
			expect(events).to.have.property('b')
			expect(events.b[ids[1]]).to.be.a('function')

		it 'should add the events to the store when setting with an object', ->
			A.on
				a: ->
				b: ->
			expect(events).to.have.property('a')
			expect(events).to.have.property('b')

		it 'should return an array of ids when setting several topics', ->
			ids = A.on
				a: ->
				b: ->
			expect(ids).to.be.an('array')
			expect(ids[0]).to.contain('a;')
			expect(ids[1]).to.contain('b;')

	describe 'off', ->
		it 'should be a function', ->
			expect(A.off).to.be.a('function')

		it 'should be able to remove a single topic', ->
			id = A.on 'a', ->
			A.off id
			expect(events.a).to.not.have.property(id)

		it 'should remove an array of ids', ->
			ids = A.on ['a', 'b'], ->
			A.off ids
			expect(events.a).to.not.have.property(ids[0])
			expect(events.b).to.not.have.property(ids[1])

		it 'should return the parent object', ->
			# REFACTOR
			id = A.on 'a', ->
			expect(A.off(id)).to.equal(A)

	describe 'trigger', ->
		it 'should be a function', ->
			expect(A.trigger).to.be.a('function')

		it 'should trigger all the functions that are subscribed to the topic', ->
			called = [false, false]
			A.on 'a', -> called[0] = true
			A.on 'a', -> called[1] = true
			A.trigger 'a'
			expect(called[0]).to.be.true
			expect(called[1]).to.be.true

		it 'should pass the specified arguments', ->
			A.on 'a', (one, two) ->
				expect(one).to.eql([1, 2])
				expect(two).to.be.true
			A.trigger 'a', [[1, 2], true]

		it 'should return the parent object', ->
			# REFACTOR
			A.on 'a', ->
			expect(A.trigger('a')).to.equal(A)