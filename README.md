# **Beta**: Observable – A JavaScript event system

**This is beta. I'm still working on the documentation.**

Observable is a JavaScript mixin for adding observer methods to a function. It's similiar to the jQuery event system, but works with IDs.

**Todo:

## Usage

You find the source at *lib/observable.js*.

Observable is a mixin. That means it adds a bundle of features to your objects. In this case an event system.

This mixin requires you to copy it deeply.

**Todo: Add a link to a gist, or write a bunch of ways to use mixins.**

- - -

# Documentation

## Observing events: `on`

You can watch a single event:

```js
var id = $.on('topic', function () {});
```

This will return a unique ID that you can use to stop observing the event, see `off` later.

You can watch several events at once:

```js
var ids = $.on(['topic1', 'topic2'], function () {});
```

This will return an array of IDs.

You can watch several events at once that need different handlers:

```js
var ids = $.on({
	topic1: function () {},
	topic2: function () {}
});
```

This will also return an array of IDs.

## Triggering events: `trigger`

Calling `.trigger('topic')` will execute all function subscribed to that topic.

```
$.on('topic', function () {
	console.log('topic called');
});
$.trigger('topic'); // Logs 'topic called'
```

You can also pass arguments to the subscribed functions by adding an array as the second argument:

```js
$.on('topic', function (arg1, arg2) {
	console.log(arg1, arg2);
});
$.trigger('topic', [[1, 2], true]); // Logs [1, 2] and true
```

## Stop observing events: `off`

This method accepts either a single ID or an array of ID. That means you can just pass in the return value of any `.on` call.

```js
$.off(id);
$.off([id1, id2]);

id3 = $.on('a', function () {});
$.off(id3); // Removes the event above.

ids = $.on(['a', 'b'], function () {});
$.off(ids); // Removes the two events above.
```

## Chaining

`trigger` and `off` return the parent object so you can use chaining.

```js
$.trigger('topic').off('topic');
```