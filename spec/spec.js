(function() {
  var A,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  A = (function(_super) {

    __extends(A, _super);

    function A() {
      return A.__super__.constructor.apply(this, arguments);
    }

    return A;

  })(Observable);

  describe('Observable', function() {
    afterEach(function() {
      A.__observable.id = -1;
      return A.__observable.events = {};
    });
    it('should be a property of window', function() {
      return expect(window).to.have.property('Observable');
    });
    describe('on', function() {
      return it('should be a function', function() {
        return expect(A.on).to.be.a('function');
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
