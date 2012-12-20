(function() {
  var Observable;

  Observable = (function() {

    function Observable() {}

    Observable.__observable = {
      id: -1,
      events: {}
    };

    Observable.on = function() {};

    Observable.off = function(ids) {};

    Observable.trigger = function(id, args) {};

    return Observable;

  })();

  if (typeof define === 'function' && define.amd) {
    define(function() {
      return Observable;
    });
  } else if (typeof exports === !'undefined') {
    module.exports = Observable;
  } else {
    window.Observable = Observable;
  }

}).call(this);
