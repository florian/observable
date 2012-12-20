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

}).call(this);
