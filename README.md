# Observable – A JavaScript event system [![Build Status](https://travis-ci.org/js-coder/Observable.png)](https://travis-ci.org/js-coder/Observable)

Observable is a JavaScript mixin for adding observer methods to a function. It's similiar to the jQuery event system, but works with IDs. You can use it for your own JavaScript libraries.

## Usage

You find the source at *[lib/observable.js](blob/master/lib/observable.js)*. Observable will be assigned to the global scope unless an AMD or CommonJS loader is present.

```js
// Mixin the methods
Observable(Something)

// Or mixin to the prototype
Observable(Something.prototype)

// Or create a new fresh object with the methods
var $ = Observable()
```

## Features

- Easily mixin the methods into your library
- It's ID based, so nobody will accidently remove internal events of your library
- All methods are chainable
- It's very well tested
- Node / NPM and [component](https://github.com/component/component) are supported

- - -

# Documentation

The object that gains the observable methods will be called `$` for convenience.

## `on`: subscribing to events

You can watch a single event:

```js
var id = $.on('topic', fn);
```

You can also watch several events at once:

```js
var ids = $.on(['topic1', 'topic2'], fn);
```

Or watch several events at once that need different handlers:

```js
var ids = $.on({
  topic1: fn,
  topic2: fn2
});
```

### `once`

The `once` method behaves exactly like `on` and accepts the same arguments, but after triggering the event for the first time the event will be removed.

```js
$.once('topic', fn);
$.trigger('topic'); // fn will be triggered
$.trigger('topic'); // fn won't be triggered, event doesn't exist anymore
```

### IDs

`on` / `once` will always return `$` itself, so you can use them for chaining. However the returned `$` will get a new internal property that contains the IDs of the subscribed functions.

You can use these returned objects to unsubscribe from the events, see `off` later.

## `trigger`: firing events

Calling `.trigger('topic')` will execute all function subscribed to `'topic'`.

```js
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

## `off`: unsubscribing from events

This method accepts the return value of `on` / `once` and will unsubscribe all the subscribed functions. You can also pass in an array of return values.

```js
var id = $.on('topic', fn),
    ids = $.on(['topic2', 'topic3'], fn2);

$.off(id);
$.off(ids);

// You could also do
$.off([id, ids]);
```

You can call `off` without any arguments to remove all events. You should only do this if you know what you're doing!

```js
$.off();
```

## Chaining

All methods return the parent object so you can use chaining.

```js
$.on('topic', fn).off('topic2').trigger('topic3');
```

- - -

## Projects that use observable

- [x18n](https://github.com/js-coder/x18n)

## Observable ports

- Python: [pyobservable](https://github.com/timofurrer/pyobservable) 
