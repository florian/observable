(function() {
  var Observable,
    __slice = [].slice;

  Observable = (function() {
    var utils;

    function Observable() {}

    Observable.__observable = {
      id: -1,
      events: {}
    };

    utils = {
      isPlainObject: function(value) {
        return !!value && Object.prototype.toString.call(value) === '[object Object]';
      }
    };

    Observable.on = function() {
      var fn, id, ids, topic, topics, _base, _i, _j, _len;
      topics = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), fn = arguments[_i++];
      if (utils.isPlainObject(topics[0])) {
        console.log(true);
      } else {
        ids = [];
        for (_j = 0, _len = topics.length; _j < _len; _j++) {
          topic = topics[_j];
          id = String(++this.__observable.id);
          ids.push(id);
          (_base = this.__observable.events)[topic] || (_base[topic] = {});
          this.__observable.events[topic][id] = fn;
        }
      }
      if (ids.length === 1) {
        return ids[0];
      } else {
        return ids;
      }
    };

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
