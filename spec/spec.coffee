A = Observable()
lastIds = A.__observable.lastIds
events = A.__observable.events
ids = A.__observable.ids

eventSystemAvailable = (obj) ->
	expect(obj).to.have.property('__observable')
	expect(obj.on).to.be.a('function')
	expect(obj.once).to.be.a('function')
	expect(obj.trigger).to.be.a('function')
	expect(obj.off).to.be.a('function')

describe 'Observable', ->
	afterEach ->
		lastIds = A.__observable.lastIds = {}
		events = A.__observable.events = {}
		ids.length = 0

	it 'should be a property of window', ->
		expect(window).to.have.property('Observable')

	describe 'constructor', ->
		it 'should create a fresh object when passing 0 arguments', ->
			_ = Observable()
			expect(_).to.satisfy(eventSystemAvailable)

		it 'should mixin the properties when passing in an object', ->
			_ = a: 1
			Observable(_)
			expect(_).to.satisfy(eventSystemAvailable)
			expect(_).to.have.property('a', 1)

	describe 'on', ->
		it 'should be a function', ->
			expect(A.on).to.be.a('function')

		it 'should add the event to the store when setting one topic', ->
			A.on 'a', ->
			expect(events).to.have.property('a')
			expect(events.a[ids[0]]).to.be.a('function')

		it 'should add the events to the store when setting several topics', ->
			A.on ['a', 'b'], ->
			expect(events).to.have.keys('a', 'b')
			expect(events.a[ids[0]]).to.be.a('function')
			expect(events.b[ids[1]]).to.be.a('function')

		it 'should add the events to the store when setting with an object', ->
			A.on
				a: ->
				b: ->
			expect(events).to.have.keys('a', 'b')

		it 'should return the parent object with a special ids property', ->
			ret = A.on 'a', ->
			expect(ret.__observable).to.have.property('ids').with.lengthOf(1)

		it 'should return the parent object with only the recent IDs', ->
			A.on ['a', 'b'], ->
			ret = A.on 'c', ->
			expect(ret.__observable).to.have.property('ids').with.lengthOf(1)

	describe 'once', ->
		it 'should return an ID that ends with " once"', ->
			id = A.once 'a', ->
			expect(ids[0]).to.match(/\ once/)

	describe 'off', ->
		it 'should be a function', ->
			expect(A.off).to.be.a('function')

		it 'should be able to remove a single topic', ->
			id = A.on 'a', ->
			A.off id
			expect(events.a).to.not.have.property(id)

		it 'should remove an array of ids', ->
			o = A.on ['a', 'b'], ->
			A.off o
			expect(events.a).to.not.have.property(ids[0])
			expect(events.b).to.not.have.property(ids[1])

		it 'should not throw an error when passing a non-existing topic', ->
			A.__observable.ids.push('non-existing')
			expect(-> A.off(A)).not.to.throw(Error)

		it 'should work with topics that contain semicolons', ->
			id = A.on 'to;pic', ->
			A.off(id)
			expect(events['to;pic']).not.to.have.property(id)

		it 'should be able to remove topics that were set using once', ->
			id = A.once 'a', ->
			A.off(id)
			expect(events.a).not.to.have.property(id)

		it 'should remove all events when passing in 0 arguments', ->
			A.on(['a', 'b'], ->).off()
			expect(A.__observable.events).to.eql({})

		it 'should return the parent object', ->
			expect(A.off()).to.equal(A)

	describe 'trigger', ->
		it 'should be a function', ->
			expect(A.trigger).to.be.a('function')

		it 'should trigger all the functions that are subscribed to the topic', ->
			fn = chai.spy()
			A.on('a', fn).on('a', fn).trigger('a')
			expect(fn).to.have.been.called.twice

		it 'should pass the specified arguments', ->
			fn = chai.spy ->
				expect(one).to.eql([1, 2])
				expect(two).to.be.true
			
			A.trigger 'a', [[1, 2], true]
			expect(fn).to.have.been.called

		it 'should not throw an error when passing a non-existing topic', ->
			expect(-> A.trigger()).not.to.throw(Error)
			expect(-> A.trigger("non-existing topic")).not.to.throw(Error)

		it 'should remove topics set using once after firing them', ->
			id = A.once 'a', ->
			A.trigger 'a'
			expect(events).not.to.have.property(id)

		it 'should return the parent object', ->
			expect(A.trigger()).to.equal(A)

			id = A.on 'a', ->
			expect(A.trigger(id)).to.equal(A)
