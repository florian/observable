(function() {

  describe('Observable', function() {
    return it('should be a property of window', function() {
      return expect(window).to.have.property('Observable');
    });
  });

}).call(this);
