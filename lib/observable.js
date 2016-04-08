// Copyright (c) 2012-2016 Florian Hartmann, https://github.com/florian/observable
(function() {
  var Observable;

  Observable = (function() {
    var utils;

    utils = {
      is: function(type, value) {
        return Object.prototype.toString.call(value).match(/\s(\w+)/)[1].toLowerCase() === type;
      },
      isPlainObject: function(value) {
        return !!value && utils.is('object', value);
      },
      toArray: function(value) {
        if (utils.is('array', value)) {
          return value;
        } else {
          return [value];
        }
      }
    };

    function Observable(host) {
      var fn, key, ref;
      if (host == null) {
        host = {};
      }
      host.__observable = {
        lastIds: {},
        events: {},
        ids: []
      };
      ref = Observable.prototype;
      for (key in ref) {
        fn = ref[key];
        host[key] = fn;
      }
      return host;
    }

    Observable.prototype.on = function(topics, fn, once) {
      var base, base1, i, id, len, topic;
      if (utils.isPlainObject(topics)) {
        once = fn;
        for (topic in topics) {
          fn = topics[topic];
          this.on(topic, fn, once);
        }
      } else {
        topics = utils.toArray(topics);
        this.__observable.ids.length = 0;
        for (i = 0, len = topics.length; i < len; i++) {
          topic = topics[i];
          (base = this.__observable.lastIds)[topic] || (base[topic] = 0);
          id = topic + ";" + (++this.__observable.lastIds[topic]);
          if (once) {
            id += ' once';
          }
          this.__observable.ids.push(id);
          (base1 = this.__observable.events)[topic] || (base1[topic] = {});
          this.__observable.events[topic][id] = fn;
        }
      }
      return this;
    };

    Observable.prototype.once = function(topics, fn) {
      return this.on(topics, fn, true);
    };

    Observable.prototype.off = function(obj) {
      var i, id, len, ref, topic;
      if (obj === void 0) {
        this.__observable.events = {};
      } else {
        ref = obj.__observable.ids;
        for (i = 0, len = ref.length; i < len; i++) {
          id = ref[i];
          topic = id.substr(0, id.lastIndexOf(';')).split(' ')[0];
          if (obj.__observable.events[topic]) {
            delete obj.__observable.events[topic][id];
          }
        }
      }
      return this;
    };

    Observable.prototype.trigger = function(topic, args) {
      var fn, id, ref;
      if (args == null) {
        args = [];
      }
      ref = this.__observable.events[topic];
      for (id in ref) {
        fn = ref[id];
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
    define('observable', [], function() {
      return Observable;
    });
  } else if (typeof exports !== 'undefined') {
    module.exports = Observable;
  } else {
    window.Observable = Observable;
  }

}).call(this);
