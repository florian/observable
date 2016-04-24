(function() {
  var A, eventAmount, eventSystemAvailable, events;

  A = new Observable();

  A.__asyncEvents = false;

  events = A.__eventStore;

  eventSystemAvailable = function(obj) {
    expect(obj.on).to.be.a('function');
    expect(obj.once).to.be.a('function');
    expect(obj.trigger).to.be.a('function');
    expect(obj.off).to.be.a('function');
    return expect(obj.__eventStore).to.be.an('object');
  };

  eventAmount = function(topic) {
    return (events[topic] || []).length;
  };

  describe('Observable', function() {
    afterEach(function() {
      return events = A.__eventStore = {};
    });
    it('should be a property of window', function() {
      return expect(window).to.have.property('Observable');
    });
    describe('constructor', function() {
      return it('should create a fresh object when passing 0 arguments', function() {
        var _;
        _ = new Observable();
        return expect(_).to.satisfy(eventSystemAvailable);
      });
    });
    describe('mixin', function() {
      return it('it should be able to mixin the prototype to other objects', function() {
        var _;
        _ = {
          a: 1
        };
        Observable.mixin(_);
        expect(_).to.satisfy(eventSystemAvailable);
        return expect(_).to.have.property('a');
      });
    });
    describe('on', function() {
      it('should be a function', function() {
        return expect(A.on).to.be.a('function');
      });
      it('should add the event to the store when setting one topic', function() {
        A.on('a', function() {});
        return expect(events).to.have.property('a');
      });
      it('should add the events to the store when setting several topics', function() {
        A.on(['a', 'b'], function() {});
        return expect(events).to.have.keys('a', 'b');
      });
      return it('should add the events to the store when setting with an object', function() {
        A.on({
          a: function() {},
          b: function() {}
        });
        return expect(events).to.have.keys('a', 'b');
      });
    });
    describe('once', function() {
      return it('it should save subscribers and mark them as "once"', function() {
        A.once('a', function() {});
        return expect(events.a[0].once).to.be["true"];
      });
    });
    describe('off', function() {
      it('should be a function', function() {
        return expect(A.off).to.be.a('function');
      });
      it('should be able to remove a single topic', function() {
        var a;
        a = function() {};
        A.on('a', a);
        A.off('a', a);
        return expect(eventAmount('a')).to.eql(0);
      });
      it('should remove an array of ids', function() {
        var a;
        a = function() {};
        A.on(['a', 'b'], a);
        A.off(['a', 'b'], a);
        expect(eventAmount('a')).to.eql(0);
        return expect(eventAmount('b')).to.eql(0);
      });
      it('should not throw an error when passing a non-existing topic', function() {
        return expect(function() {
          return A.off('nonexisting');
        }).not.to["throw"](Error);
      });
      it('should be able to remove topics that were set using once', function() {
        var a;
        a = function() {};
        A.once('a', a);
        A.off('a', a);
        return expect(eventAmount('a')).to.eql(0);
      });
      it('should remove all events when passing in 0 arguments', function() {
        A.on('a', function() {});
        A.on('a', function() {});
        A.on('a', function() {});
        A.on('a', function() {});
        A.off('a');
        return expect(eventAmount('a')).to.eql(0);
      });
      return it('should return the parent object', function() {
        return expect(A.off()).to.equal(A);
      });
    });
    return describe('trigger', function() {
      it('should be a function', function() {
        return expect(A.trigger).to.be.a('function');
      });
      it('should trigger functions that were subscribed alone', function() {
        var fn;
        fn = chai.spy();
        A.on('a', fn).trigger('a');
        return expect(fn).to.have.been.called;
      });
      it('should trigger functions that were subscribed to several topics', function() {
        var fn;
        fn = chai.spy();
        A.on(['a', 'b'], fn).trigger('a');
        return expect(fn).to.have.been.called;
      });
      it('should trigger functions that were subscribed to several topics for all topics', function() {
        var fn;
        fn = chai.spy();
        A.on(['a', 'b'], fn).trigger('a').trigger('b');
        return expect(fn).to.have.been.called.twice;
      });
      it('should trigger functions that were subscribed using an object', function() {
        var f, g;
        f = chai.spy();
        g = chai.spy();
        A.on({
          a: f,
          b: g
        }).trigger('a');
        expect(f).to.have.been.called;
        A.trigger('b');
        return expect(g).to.have.been.called;
      });
      it('should call a function everytime a subscribed event is triggered', function() {
        var f, i, j;
        f = chai.spy();
        A.on('a', f);
        for (i = j = 1; j <= 10; i = ++j) {
          A.trigger('a');
        }
        return expect(f).to.have.been.called(10).times;
      });
      it('should trigger all the functions that are subscribed to the topic', function() {
        var fn;
        fn = chai.spy();
        A.on('a', fn).on('a', fn).trigger('a');
        return expect(fn).to.have.been.called.twice;
      });
      it('should pass the specified arguments', function() {
        var fn;
        fn = chai.spy(function(one, two) {
          expect(one).to.eql([1, 2]);
          return expect(two).to.be["true"];
        });
        A.on('a', fn);
        A.trigger('a', [[1, 2], true]);
        return expect(fn).to.have.been.called;
      });
      it('should not throw an error when passing a non-existing topic', function() {
        expect(function() {
          return A.trigger();
        }).not.to["throw"](Error);
        return expect(function() {
          return A.trigger("non-existing topic");
        }).not.to["throw"](Error);
      });
      it('should remove topics set using once after firing them', function() {
        A.once('a', function() {});
        A.trigger('a');
        return expect(eventAmount('a')).to.eql(0);
      });
      return it('should return the parent object', function() {
        return expect(A.trigger('x')).to.equal(A);
      });
    });
  });

}).call(this);
