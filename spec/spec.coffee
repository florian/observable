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

	describe 'off', ->
		it 'should be a function', ->
			expect(A.off).to.be.a('function')

	describe 'trigger', ->
		it 'should be a function', ->
			expect(A.trigger).to.be.a('function')