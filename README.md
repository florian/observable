# Observable – A JavaScript event system [![Build Status](https://travis-ci.org/florian/observable.png)](https://travis-ci.org/florian/observable)

Observable is a JavaScript mixin for adding observer methods to a function. It's similiar to the jQuery event system, but can be added into any other module. You can use it for your own JavaScript libraries.

## Usage

`npm install observable_js` or copy the source from *[lib/observable.js](blob/master/lib/observable.js)*.
`Observable` will be assigned to the global scope if you don't use node and no other AMD or CommonJS loader is present.

ES6:
```js
class MyLibrary extends Observable {  }
```

CoffeeScript:
```coffee
class MyLibrary extends Observable
```

Other usages:
```js
// Adding the Observable methods to an existing object:
Observable.mixin(a)

// Create a new object that has all the Observable methods
var a = new Observable()
```

## Features

- Super easy to use for your library, just extend from it or mixin the methods
- Most methods are overloaded, making the API very nice to use
- All methods are chainable
- It's very well tested
- Node / NPM and the browser are both supported

- - -

# Documentation

The object that gains the observable methods will be called `x` in this README for convenience.

## `on`: subscribing to events

You can watch a single event:

```js
var id = x.on('topic', fn);
```

You can also watch several events at once:

```js
var ids = x.on(['topic1', 'topic2'], fn);
```

Or watch several events at once that need different handlers:

```js
var ids = x.on({
  topic1: fn,
  topic2: fn2
});
```

### `once`

The `once` method behaves exactly like `on` and accepts the same arguments, but after triggering the event for the first time the event will be removed.

```js
x.once('topic', fn);
x.trigger('topic'); // fn will be triggered
x.trigger('topic'); // fn won't be triggered, event doesn't exist anymore
```

## `trigger`: firing events

Calling `.trigger('topic')` will execute all function subscribed to `'topic'`.

```js
x.on('topic', function () {
	console.log('topic called');
});
x.trigger('topic'); // Logs 'topic called'
```

You can also pass arguments to the subscribed functions by passing an array as the second argument:

```js
x.on('topic', function (arg1, arg2) {
	console.log(arg1, arg2);
});
x.trigger('topic', [[1, 2], true]); // Logs [1, 2] and true
```

## `off`: unsubscribing from events

This method accepts the exact same arguments as `on` and `once`. You pass the
topic and the functions you want to unsubscribe. Observable will only remove the
passed function from the topic.

```js
x.on('topic', fn),
x.off('topic', fn);

x.on(['topic2', 'topic3'], fn2);
x.off(['topic2', 'topic3'], fn2);

x.on({ topic: fn })
x.off({ topic: fn })
```

You can call `off` without any arguments to remove all events. You should only do this if you know what you're doing!

```js
x.off();
```

## Chaining

All methods return the parent object so you can use chaining.

```js
x.on('topic', fn).off('topic2').trigger('topic3');
```

- - -

## Projects that use Observable

- [x18n](https://github.com/florian/x18n)

## Observable ports

- Python: [pyobservable](https://github.com/timofurrer/pyobservable)
