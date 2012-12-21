(function() {
  var A, events, lastIds;

  A = $.extend(true, Observable);

  lastIds = A.__observable.lastIds;

  events = A.__observable.events;

  describe('Observable', function() {
    afterEach(function() {
      lastIds = A.__observable.lastIds = {};
      return events = A.__observable.events = {};
    });
    it('should be a property of window', function() {
      return expect(window).to.have.property('Observable');
    });
    describe('on', function() {
      it('should be a function', function() {
        return expect(A.on).to.be.a('function');
      });
      it('should return an id when setting one topic', function() {
        var id;
        id = A.on('a', function() {});
        expect(id).to.be.a('string');
        return expect(id).to.contain('a;');
      });
      it('should add the event to the store when setting one topic', function() {
        var id;
        id = A.on('a', function() {});
        expect(events).to.have.property('a');
        return expect(events.a[id]).to.be.a('function');
      });
      it('should return an array of ids when setting several topics', function() {
        var ids;
        ids = A.on(['a', 'b'], function() {});
        expect(ids).to.be.an('array');
        expect(ids[0]).to.contain('a;');
        return expect(ids[1]).to.contain('b;');
      });
      return it('should add the events to the store when setting several topics', function() {
        var ids;
        ids = A.on(['a', 'b'], function() {});
        expect(events).to.have.property('a');
        expect(events.a[ids[0]]).to.be.a('function');
        expect(events).to.have.property('b');
        return expect(events.b[ids[1]]).to.be.a('function');
      });
    });
    describe('off', function() {
      return it('should be a function', function() {
        return expect(A.off).to.be.a('function');
      });
    });
    return describe('trigger', function() {
      return it('should be a function', function() {
        return expect(A.trigger).to.be.a('function');
      });
    });
  });

}).call(this);
