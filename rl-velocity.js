(function() {

  var rlVelocity =  angular.module('rl-velocity', []);

  var defaultOptions = {
    duration: 250,
    easing: 'easeInOutQuad'
  };

  var animationsList = [
    'fadeIn',
    'fadeOut',
    'callout.bounce',
    'callout.shake',
    'callout.flash',
    'callout.pulse',
    'callout.swing',
    'callout.tada',
    'transition.flipXIn',
    'transition.flipXOut',
    'transition.flipYIn',
    'transition.flipYOut',
    'transition.flipBounceXIn',
    'transition.flipBounceXOut',
    'transition.flipBounceYIn',
    'transition.flipBounceYOut',
    'transition.swoopIn',
    'transition.swoopOut',
    'transition.whirlIn',
    'transition.whirlOut',
    'transition.shrinkIn',
    'transition.shrinkOut',
    'transition.expandIn',
    'transition.expandOut',
    'transition.bounceIn',
    'transition.bounceOut',
    'transition.bounceUpIn',
    'transition.bounceUpOut',
    'transition.bounceDownIn',
    'transition.bounceDownOut',
    'transition.bounceLeftIn',
    'transition.bounceLeftOut',
    'transition.bounceRightIn',
    'transition.bounceRightOut',
    'transition.slideUpIn',
    'transition.slideUpOut',
    'transition.slideDownIn',
    'transition.slideDownOut',
    'transition.slideLeftIn',
    'transition.slideLeftOut',
    'transition.slideRightIn',
    'transition.slideRightOut',
    'transition.slideUpBigIn',
    'transition.slideUpBigOut',
    'transition.slideDownBigIn',
    'transition.slideDownBigOut',
    'transition.slideLeftBigIn',
    'transition.slideLeftBigOut',
    'transition.slideRightBigIn',
    'transition.slideRightBigOut',
    'transition.perspectiveUpIn',
    'transition.perspectiveUpOut',
    'transition.perspectiveDownIn',
    'transition.perspectiveDownOut',
    'transition.perspectiveLeftIn',
    'transition.perspectiveLeftOut',
    'transition.perspectiveRightIn',
    'transition.perspectiveRightOut'
  ];

  function _getClassName(animation) {
    return '.velocity-' + animation.replace('.', '-');
  }

  function _parseClassList(classList) {
    var parsedOptions = {};

    angular.forEach(classList, function(currClass) {
      if (currClass.indexOf('velocity-easing-') > -1) {
        parsedOptions.easing = currClass.split('velocity-easing-')[1];
      }

      if (currClass.indexOf('velocity-duration-') > -1) {
        parsedOptions.duration = currClass.split('velocity-duration-')[1];
      }

    });

    return parsedOptions;

  }

  function _createVelocityAnimation(animation) {
    return function($el, done) {

      var parsedOptions = _parseClassList($el[0].classList);
      var options = angular.extend(defaultOptions, parsedOptions);
      options.display = $el.css('display');
      options.complete = done;

      $el.velocity(animation, options);

      return function(cancel) {
        if (cancel) {
          $el.velocity('stop');
        }
      }
    }
  }

  function _createVelocityClassAnimation(animation) {
    return function ($el, className, done) {

      var parsedOptions = _parseClassList($el[0].classList);
      var options = angular.extend(defaultOptions, parsedOptions);
      options.display = $el.css('display');
      options.complete = done;

      if ('ng-hide' === className || 'ng-show' === className) {
        $el.velocity(animation, options);

        return function (cancel) {
          if (cancel) {
            $el.velocity('stop');
          }
        };
      }
    };
  }

  function _createAngularAnimation(animation) {

    var opp = animation.replace('In', 'Out');

    if (opp.indexOf('Down') > -1) {
      opp = opp.replace('Down', 'Up');
    }
    else if (opp.indexOf('Up') > -1) {
      opp = opp.replace('Up', 'Down');
    }
    else if (opp.indexOf('Left') > -1) {
      opp = opp.replace('Left', 'Right');
    }
    else if (opp.indexOf('Right') > -1) {
      opp = opp.replace('Right', 'Left');
    }

    return function() {
      return {
        enter: _createVelocityAnimation(animation),
        leave: _createVelocityAnimation(opp),
        move: _createVelocityAnimation(animation),
        addClass: _createVelocityClassAnimation(animation),
        removeClass: _createVelocityClassAnimation(opp)
      }
    };
  }

  /*
    Build the animations
  */
  var className, oppositeClassName;
  angular.forEach(animationsList, function(animation) {

    className = _getClassName(animation);

    rlVelocity.animation(className, _createAngularAnimation(animation));

  });

})();
