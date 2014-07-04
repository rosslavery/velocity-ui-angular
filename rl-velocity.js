/*! rl-velocity - v0.0.9 - 2014-07-04
* https://github.com/rosslavery/rl-velocity
* Copyright (c) 2014 Ross Lavery <rosslavery@gmail.com>; License: MIT */
(function(angular) {
  'use strict';

  var Container = (window.jQuery || window.Zepto || window);
  if (!Container.Velocity || !Container.Velocity.Utilities) {
    console.log('Velocity UI Pack: Velocity must be loaded first. Aborting.');
    return;
  }

  Container.rlVelocity = angular.module('rl.velocity', ['ngAnimate'])

  .constant('rlVelocityConfig', {
    duration: 300
  })

  .factory('VelocityUtils', ['$timeout', 'rlVelocityConfig', function($timeout, rlVelocityConfig) {

    return {

      _parseClassList: function(classList) {
        var parsedOptions = {};

        angular.forEach(classList, function(currClass) {
          if (currClass.indexOf('velocity-duration-') > -1) {
            parsedOptions.duration = currClass.split('velocity-duration-')[1];
          }
        });

        return parsedOptions;
      },

      _createAngularAnimation: function(animation) {
        var self = this;
        var opp = animation.replace('In', 'Out');

        if (opp.indexOf('Down') > -1) {
          opp = opp.replace('Down', 'Up');
        }
        else if (opp.indexOf('Up') > -1) {
          opp = opp.replace('Up', 'Down');
        }

        return {
          enter: self._createVelocityAnimation(animation),
          leave: self._createVelocityAnimation(opp),
          move: self._createVelocityAnimation(animation),
          beforeAddClass: self._createVelocityClassAnimation(opp),
          removeClass: self._createVelocityClassAnimation(animation)
        };
      },

      _createVelocityAnimation: function(animation) {
        var self = this;

        return function($el, done) {
          var parsedOptions = self._parseClassList($el[0].classList);
          var options = angular.extend(rlVelocityConfig, parsedOptions);

          $el.velocity(animation, options);
          $timeout(done, options.duration);
        };
      },

      _createVelocityClassAnimation: function(animation) {
        var self = this;

        return function ($el, className, done) {
          var parsedOptions = self._parseClassList($el[0].classList);
          var options = angular.extend(rlVelocityConfig, parsedOptions);

          if (className === 'ng-hide') {
            $el.velocity(animation, options);
            $timeout(done, options.duration);
          }
          else {
            done();
          }
        };
      }

    };

  }]);


  // Convert animation name to class name
  function _getClassName(animation) {
    return '.velocity-' + animation.replace('.', '-');
  }


  // Iterate through the packaged effects to register them as Angular animations
  var className;
  angular.forEach(Container.Velocity.RegisterUI.packagedEffects, function(animationProps, animationName) {

    /*
      Disabled to experiment with $timeout method used above
      Skips 'Reset' Codeblock in Velocity to avoid callback scoping issue
      animationProps.reset && delete animationProps.reset;
      Container.Velocity.RegisterUI(animationName, animationProps);
    */

    className = _getClassName(animationName);

    Container.rlVelocity.animation(className, ['VelocityUtils', function(VelocityUtils) {
      return VelocityUtils._createAngularAnimation(animationName);
    }]);

  });


})(angular);
