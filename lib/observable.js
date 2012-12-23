(function() {
  var Observable;

  Observable = (function() {
    var utils;

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

    function Observable() {
      this.__observable = {
        lastIds: {},
        events: {}
      };
    }

    Observable.prototype.on = function(topics, fn, once) {
      var id, ids, topic, _base, _base1, _i, _len, _results;
      if (utils.isPlainObject(topics)) {
        once = fn;
        _results = [];
        for (topic in topics) {
          fn = topics[topic];
          _results.push(this.on(topic, fn, once));
        }
        return _results;
      } else {
        topics = utils.toArray(topics);
        ids = [];
        for (_i = 0, _len = topics.length; _i < _len; _i++) {
          topic = topics[_i];
          (_base = this.__observable.lastIds)[topic] || (_base[topic] = 0);
          id = "" + topic + ";" + (String(++this.__observable.lastIds[topic]));
          if (once) {
            id += ' once';
          }
          ids.push(id);
          (_base1 = this.__observable.events)[topic] || (_base1[topic] = {});
          this.__observable.events[topic][id] = fn;
        }
        if (ids.length === 1) {
          return ids[0];
        } else {
          return ids;
        }
      }
    };

    Observable.prototype.once = function(topics, fn) {
      return this.on(topics, fn, true);
    };

    Observable.prototype.off = function(ids) {
      var id, topic, _i, _len;
      ids = utils.toArray(ids);
      for (_i = 0, _len = ids.length; _i < _len; _i++) {
        id = ids[_i];
        if (typeof id !== 'string') {
          continue;
        }
        topic = id.substr(0, id.lastIndexOf(';')).split(' ')[0];
        if ((this.__observable.events[topic] != null) && (this.__observable.events[topic][id] != null)) {
          delete this.__observable.events[topic][id];
        }
      }
      return this;
    };

    Observable.prototype.trigger = function(topic, args) {
      var fn, id, _ref;
      if (this.__observable.events[topic] == null) {
        return this;
      }
      _ref = this.__observable.events[topic];
      for (id in _ref) {
        fn = _ref[id];
        fn.apply(null, args);
        if (id.lastIndexOf(' once') === id.length - 1) {
          this.off(id);
        }
      }
      return this;
    };

    return Observable;

  })();

  if (typeof define === 'function' && define.amd) {
    define('observable', function() {
      return Observable;
    });
  } else if (typeof exports !== 'undefined') {
    module.exports = Observable;
  } else {
    window.Observable = Observable;
  }

}).call(this);
