// Copyright (c) 2012-2016 Florian Hartmann, https://github.com/florian/observable
(function() {
  var Observable, isPlainObject, isType, toArray;

  isType = function(type, value) {
    return Object.prototype.toString.call(value).match(/\s(\w+)/)[1].toLowerCase() === type;
  };

  isPlainObject = function(value) {
    return !!value && isType('object', value);
  };

  toArray = function(value) {
    if (isType('array', value)) {
      return value;
    } else {
      return [value];
    }
  };

  Observable = (function() {
    function Observable() {
      this.__eventStore = {};
      this.__asyncEvents = true;
    }

    Observable.mixin = function(host) {
      var fn, key, ref, results;
      host.__eventStore = {};
      ref = Observable.prototype;
      results = [];
      for (key in ref) {
        fn = ref[key];
        results.push(host[key] = fn);
      }
      return results;
    };

    Observable.prototype.on = function(topics, fn, once) {
      var base, i, len, ref, topic;
      if (once == null) {
        once = false;
      }
      if (isPlainObject(topics)) {
        for (topic in topics) {
          fn = topics[topic];
          this.on(topic, fn);
        }
      } else {
        ref = toArray(topics);
        for (i = 0, len = ref.length; i < len; i++) {
          topic = ref[i];
          (base = this.__eventStore)[topic] || (base[topic] = []);
          this.__eventStore[topic].push({
            fn: fn,
            once: once
          });
        }
      }
      return this;
    };

    Observable.prototype.once = function(topics, fn) {
      if (fn) {
        return this.on(topics, fn, true);
      } else {
        return this.on(topics, true);
      }
    };

    Observable.prototype.off = function(topics, fn) {
      var i, j, len, len1, ref, ref1, topic;
      if (!fn) {
        ref = toArray(topics);
        for (i = 0, len = ref.length; i < len; i++) {
          topic = ref[i];
          this.__eventStore[topic] = [];
        }
      }
      if (isPlainObject(topics)) {
        for (topic in topics) {
          fn = topics[topic];
          this.off(topic, fn);
        }
      } else {
        ref1 = toArray(topics);
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          topic = ref1[j];
          this.__eventStore[topic] = (this.__eventStore[topic] || []).filter(function(subscriber) {
            return subscriber.fn !== fn;
          });
        }
      }
      return this;
    };

    Observable.prototype.trigger = function(topic, args) {
      var ref;
      args || (args = []);
      if ((ref = this.__eventStore[topic]) != null) {
        ref.forEach((function(_this) {
          return function(arg) {
            var fn, once;
            fn = arg.fn, once = arg.once;
            if (_this.__asyncEvents) {
              setTimeout((function() {
                return fn.apply(null, args);
              }), 1);
            } else {
              fn.apply(null, args);
            }
            if (once) {
              return _this.off(topic, fn);
            }
          };
        })(this));
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
