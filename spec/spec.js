(function() {
  var A, eventSystemAvailable, events, ids, lastIds;

  A = Observable();

  lastIds = A.__observable.lastIds;

  events = A.__observable.events;

  ids = A.__observable.ids;

  eventSystemAvailable = function(obj) {
    expect(obj).to.have.property('__observable');
    expect(obj.on).to.be.a('function');
    expect(obj.once).to.be.a('function');
    expect(obj.trigger).to.be.a('function');
    return expect(obj.off).to.be.a('function');
  };

  describe('Observable', function() {
    afterEach(function() {
      lastIds = A.__observable.lastIds = {};
      events = A.__observable.events = {};
      return ids.length = 0;
    });
    it('should be a property of window', function() {
      return expect(window).to.have.property('Observable');
    });
    describe('constructor', function() {
      it('should create a fresh object when passing 0 arguments', function() {
        var _;
        _ = Observable();
        return expect(_).to.satisfy(eventSystemAvailable);
      });
      return it('should mixin the properties when passing in an object', function() {
        var _;
        _ = {
          a: 1
        };
        Observable(_);
        expect(_).to.satisfy(eventSystemAvailable);
        return expect(_).to.have.property('a', 1);
      });
    });
    describe('on', function() {
      it('should be a function', function() {
        return expect(A.on).to.be.a('function');
      });
      it('should add the event to the store when setting one topic', function() {
        A.on('a', function() {});
        expect(events).to.have.property('a');
        return expect(events.a[ids[0]]).to.be.a('function');
      });
      it('should add the events to the store when setting several topics', function() {
        A.on(['a', 'b'], function() {});
        expect(events).to.have.keys('a', 'b');
        expect(events.a[ids[0]]).to.be.a('function');
        return expect(events.b[ids[1]]).to.be.a('function');
      });
      it('should add the events to the store when setting with an object', function() {
        A.on({
          a: function() {},
          b: function() {}
        });
        return expect(events).to.have.keys('a', 'b');
      });
      it('should return the parent object with a special ids property', function() {
        var ret;
        ret = A.on('a', function() {});
        return expect(ret.__observable).to.have.property('ids')["with"].length(1);
      });
      return it('should return the parent object with only the recent IDs', function() {
        var ret;
        A.on(['a', 'b'], function() {});
        ret = A.on('c', function() {});
        return expect(ret.__observable).to.have.property('ids')["with"].length(1);
      });
    });
    describe('once', function() {
      return it('should return an ID that ends with " once"', function() {
        var id;
        id = A.once('a', function() {});
        return expect(ids[0]).to.match(/\ once/);
      });
    });
    describe('off', function() {
      it('should be a function', function() {
        return expect(A.off).to.be.a('function');
      });
      it('should be able to remove a single topic', function() {
        var id;
        id = A.on('a', function() {});
        A.off(id);
        return expect(events.a).to.not.have.property(id);
      });
      it('should remove an array of ids', function() {
        var o;
        o = A.on(['a', 'b'], function() {});
        A.off(o);
        expect(events.a).to.not.have.property(ids[0]);
        return expect(events.b).to.not.have.property(ids[1]);
      });
      it('should not throw an error when passing a non-existing topic', function() {
        A.__observable.ids.push('non-existing');
        return expect(function() {
          return A.off(A);
        }).not.to["throw"](Error);
      });
      it('should work with topics that contain semicolons', function() {
        var id;
        id = A.on('to;pic', function() {});
        A.off(id);
        return expect(events['to;pic']).not.to.have.property(id);
      });
      it('should be able to remove topics that were set using once', function() {
        var id;
        id = A.once('a', function() {});
        A.off(id);
        return expect(events.a).not.to.have.property(id);
      });
      it('should remove all events when passing in 0 arguments', function() {
        A.on(['a', 'b'], function() {}).off();
        return expect(A.__observable.events).to.eql({});
      });
      return it('should return the parent object', function() {
        return expect(A.off()).to.equal(A);
      });
    });
    return describe('trigger', function() {
      it('should be a function', function() {
        return expect(A.trigger).to.be.a('function');
      });
      it('should trigger all the functions that are subscribed to the topic', function() {
        var called;
        called = [false, false];
        A.on('a', function() {
          return called[0] = true;
        });
        A.on('a', function() {
          return called[1] = true;
        });
        A.trigger('a');
        expect(called[0]).to.be["true"];
        return expect(called[1]).to.be["true"];
      });
      it('should pass the specified arguments', function() {
        A.on('a', function(one, two) {
          expect(one).to.eql([1, 2]);
          return expect(two).to.be["true"];
        });
        return A.trigger('a', [[1, 2], true]);
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
        var id;
        id = A.once('a', function() {});
        A.trigger('a');
        return expect(events).not.to.have.property(id);
      });
      return it('should return the parent object', function() {
        var id;
        expect(A.trigger()).to.equal(A);
        id = A.on('a', function() {});
        return expect(A.trigger(id)).to.equal(A);
      });
    });
  });

}).call(this);
