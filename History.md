# Changelog

## 2.0.0 / 2016-04-24

- Complete rewrite, fixing all issues the library had so far
- It's not ID based anymore, making it a lot more predictable
- `.on` and `.off` now accept the exact same arguments, meaning you can
  unsubscribe the same way you subscribed
- Events are triggered async by default now, can be disabled using `x.__asyncEvents = false`

## 1.2.1 / 2013-03-12

Fix a `trigger` bug when passing no arguments.

## 1.2.0 / 2013-02-03

- Submitted observable to NPM and [component](https://github.com/component/component).

## 1.1.1 / 2013-02-03

Just a fix for an RequireJS bug.

## 1.1.0 / 2013-01-12

- Implement a new mixin system.
- Make `on` and `once` chainable.
- You can now remove all events when passing 0 arguments to `off`.

## 1.0.0 / 2012-12-23

Initial Observable release.
