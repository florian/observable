class A extends Observable

describe 'Observable', ->
	afterEach ->
		A.__observable =
			id: -1
			events: {}

	it 'should be a property of window', ->
		expect(window).to.have.property('Observable')

	describe 'on', ->
		it 'should be a function', ->
			expect(A.on).to.be.a('function')

	describe 'off', ->
		it 'should be a function', ->
			expect(A.off).to.be.a('function')

	describe 'trigger', ->
		it 'should be a function', ->
			expect(A.trigger).to.be.a('function')