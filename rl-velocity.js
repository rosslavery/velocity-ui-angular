(function(angular) {

  var rlVelocity =  angular.module('rl-velocity', []);

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

  function _createVelocityAnimation(animation) {
    return function($el, done) {

      // TODO: Parse $el.classList for duration, easing, other classes
      $el.velocity(animation, {
        complete: done
      });

      return function(cancel) {
        if (cancel) {
          $el.velocity('stop');
        }
      }
    }
  }

  function _createAngularAnimation(animation) {
    return function() {
      return {
        enter: _createVelocityAnimation(animation),
        leave: _createVelocityAnimation(animation),
        move: _createVelocityAnimation(animation)
      }
    };
  }

  /*
    Build the animations
  */
  var className;
  angular.forEach(animationsList, function(animationName) {

    className = getClassName(animation);
    rlVelocity.animation(className, _createAngularAnimation(animationName));

  });

});