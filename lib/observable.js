(function() {
  var Observable;

  Observable = (function() {
    var utils;

    function Observable() {}

    Observable.__observable = {
      lastIds: {},
      events: {}
    };

    utils = {
      isPlainObject: function(value) {
        return !!value && Object.prototype.toString.call(value) === '[object Object]';
      },
      isArray: function(value) {
        return Object.prototype.toString.call(value) === '[object Array]';
      },
      toArray: function(value) {
        if (utils.isArray(value)) {
          return value;
        } else {
          return [value];
        }
      }
    };

    Observable.on = function(topics, fn) {
      var id, ids, topic, _base, _base1, _i, _len;
      if (utils.isPlainObject(topics[0])) {
        console.log(true);
      } else {
        topics = utils.toArray(topics);
        ids = [];
        for (_i = 0, _len = topics.length; _i < _len; _i++) {
          topic = topics[_i];
          (_base = this.__observable.lastIds)[topic] || (_base[topic] = 0);
          id = "" + topic + ";" + (String(++this.__observable.lastIds[topic]));
          ids.push(id);
          (_base1 = this.__observable.events)[topic] || (_base1[topic] = {});
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
