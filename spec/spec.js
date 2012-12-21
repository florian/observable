(function() {
  var A, events, id;

  A = $.extend(true, Observable);

  id = A.__observable.id;

  events = A.__observable.events;

  describe('Observable', function() {
    afterEach(function() {
      id = A.__observable.id = -1;
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
        id = A.on('a', function() {});
        return expect(id).to.be.a('string');
      });
      return it('should add the event to the store when setting one topic', function() {
        A.on('a', function() {});
        return expect(events).to.have.property('a');
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
