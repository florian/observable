# Observable – A JavaScript event system [![Build Status](https://travis-ci.org/js-coder/Observable.png)](https://travis-ci.org/js-coder/Observable)

Observable is a JavaScript mixin for adding observer methods to a function. It's similiar to the jQuery event system, but works with IDs. You can use it for your own JavaScript libraries.

## Usage

You find the source at *lib/observable.js*. Observable supports AMD and CommonJS. Unless a AMD or CommonJS loader is present, it will be assigned to the global scope.

```js
var $ = new Observable;
```

The methods that `$` gains are described in the following documentation.

- - -

# Documentation

## `on`: subscribing to events

You can watch a single event:

```js
var id = $.on('topic', fn);
```

This will return a unique ID that you can use to stop observing the event, see `off` later.

You can also watch several events at once:

```js
var ids = $.on(['topic1', 'topic2'], fn);
```

This will return an array of IDs.

You can watch several events at once that need different handlers:

```js
var ids = $.on({
  topic1: fn,
  topic2: fn
});
```

This will also return an array of IDs.


### `once`

The `once` method behaves exactly like `on` and accepts the same arguments, but after triggering the event for the first time the event will be removed.

```js
$.once('topic', fn);
$.trigger('topic'); // fn will be triggered
$.trigger('topic'); // fn won't be triggered, event doesn't exist anymore
```

## `trigger`: triggering events

Calling `.trigger('topic')` will execute all function subscribed to `'topic'`.

```
$.on('topic', function () {
	console.log('topic called');
});
$.trigger('topic'); // Logs 'topic called'
```

You can also pass arguments to the subscribed functions by passing an array as the second argument:

```js
$.on('topic', function (arg1, arg2) {
	console.log(arg1, arg2);
});
$.trigger('topic', [[1, 2], true]); // Logs [1, 2] and true
```

## `off`: unsubscribe events

This method accepts either a single ID or an array of IDs. That means you can just pass in the return value of any `.on` call.

```js
$.off(id);
$.off([id, id2]);

var id3 = $.on('a', fn);
$.off(id3); // Removes the event above.

var ids = $.on(['a', 'b'], fn);
$.off(ids); // Removes the two events above.
```

## Chaining

`trigger` and `off` return the parent object so you can use chaining.

```js
$.trigger('topic').off('topic');
```

- - -

## Todo

- When a function is subscribed to several events and those events trigger at the same time the function should only be called once, because it might be an expensive operation. Maybe an extra option for this though, because it might not be the desired effect?
