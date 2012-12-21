A = $.extend(true, Observable)
id = A.__observable.id
events = A.__observable.events

describe 'Observable', ->
	afterEach ->
		id = A.__observable.id = -1
		events = A.__observable.events = {}

	it 'should be a property of window', ->
		expect(window).to.have.property('Observable')

	describe 'on', ->
		it 'should be a function', ->
			expect(A.on).to.be.a('function')

		it 'should return an id when setting one topic', ->
			id = A.on 'a', ->
			expect(id).to.be.a('string')

		it 'should add the event to the store when setting one topic', ->
			A.on 'a', ->
			expect(events).to.have.property('a')

	describe 'off', ->
		it 'should be a function', ->
			expect(A.off).to.be.a('function')

	describe 'trigger', ->
		it 'should be a function', ->
			expect(A.trigger).to.be.a('function')