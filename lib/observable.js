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
    }

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
      var i, len, ref, topic;
      if (isPlainObject(topics)) {
        for (topic in topics) {
          fn = topics[topic];
          this.off(topic, fn);
        }
      } else {
        ref = toArray(topics);
        for (i = 0, len = ref.length; i < len; i++) {
          topic = ref[i];
          this.__eventStore[topic] = this.__eventStore[topic].filter(function(subscriber) {
            return subscriber.fn !== fn;
          });
        }
      }
      return this;
    };

    Observable.prototype.trigger = function(topic, args) {
      this.__eventStore[topic].forEach((function(_this) {
        return function(arg) {
          var fn, once;
          fn = arg.fn, once = arg.once;
          fn.apply(null, args);
          if (once) {
            return _this.off(topic, fn);
          }
        };
      })(this));
      return this;
    };

    return Observable;

  })();

}).call(this);
