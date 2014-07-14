velocity-ui-angular
===========

Velocity UI Pack integration for AngularJS. Combines the power of ngAnimate with the performance and simplicity of Velocity's UI Pack!

## Requirements
* AngularJS (1.2+)
* ngAnimate
* [Velocity](https://github.com/julianshapiro/velocity)
* [Velocity UI Pack](https://github.com/julianshapiro/velocity)


## Quick Start

* Install via bower:

``` shell
$ bower install velocity-ui-angular --save
```

* Add the `velocity.ui` module to your application:

``` Javascript
angular.module('yourApp', ['velocity.ui', 'ngAnimate']);
```


* Use the class names on the elements you wish to animate using `ng-repeat`, `ng-if`, `ng-show`, `ng-hide`. E.g.:

``` html
<div ng-repeat="item in items" class="velocity-transition-slideDownIn velocity-duration-400">
	{{item.name}}
</div>
```

Durations can be set on an individual basis by using the `velocity-duration-400` class, where 400 is the animation duration in milliseconds.

## Setting Default Options
The following options can be configured via `ngVelocityConfig`:

### duration
Type: `String|Number`

Default: `300`

To configure velocity-ui-angular globally, set it via your applications `config` block:

``` Javascript
angular.module('yourApp').config(function(ngVelocityConfig) {
    ngVelocityConfig.duration = 1000;
});

```

## Credits
Major credit goes to [@julianshapiro](https://github.com/julianshapiro) for creating VelocityJS which makes this wrapper-library possible.

* [@hendrixer](https://github.com/Hendrixer) for providing the base for CSS class-parsing code
* [@cgwyllie](https://github.com/cgwyllie) for providing the base for generating the 'opposite' animations
