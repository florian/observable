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
