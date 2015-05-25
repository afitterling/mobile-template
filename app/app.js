'use strict';

angular.module('webApp', [
  'angularRipple'
  ])

//.config()

.run(function(){
    console.log('angular runs');
  })



.controller('AppCtrl', function(){
    var self = this;

    self.items = [];

    for (var _i = 0; _i <= 1000; _i++) {
      self.items.push({id: _i});
    }

})

.directive('hammerTap', function(){
    return {
      scope: {},
      link: function(scope, ele){

        var mc = new Hammer.Manager(ele[0], {});

        mc.add( new Hammer.Tap() );
//        mc.add( new Hammer.Press() );

        mc.on('tap', handleInteraction);

        function handleInteraction(e){
          console.log(e.type, e, e.changedPointers[0].pageY);
        };

      }
    };
  })

  // handles hammer pan with momentum
  .directive('hammerPan', function(){
    return {
      scope: {},
      link: function(scope, ele){

        var mc = new Hammer.Manager(ele[0], {});

        var pan = new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 });
        var tap = new Hammer.Tap();
        pan.recognizeWith(tap);

        mc.add( pan );
//        mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
//        mc.add( new Hammer.Tap({ event: 'tap', taps: 1 }));

        mc.on('pan', handleUIEvents);
//        mc.on('tap', handleUIEventTap);

        var _y, _ys, _yb, _momentum;

        _ys = 0;
        _yb = -($('#scroll-pane-1').offset().top);
        _momentum = true;

        function handleUIEvents(e){
          _y = e.deltaY;
          console.log(e.type, e, e.changedPointers[0].pageY);
          if (e.type === 'pan' && e.isFinal && _momentum){
//          if (_momentum){
            // if isFinal the finger left the touch surface and the last element may have velocity to be useful for momentum
            $('#scroll-pane-1').velocity('finish').velocity('scroll', {
              container: $("#pane-right"),
              mobileHA: false,
              axis: 'y',
              begin: function(){
              },
              complete: function() {
//                if (e.isFinal) return;
                console.log('called');
                _ys = -($('#scroll-pane-1').offset().top);
              },
              easing: 'ease-out',
              offset: (- _y + _ys + (200 * e.velocityY)),
              duration: Math.abs(e.velocityY * 400)
            });
          } else {
            // if not isFinal user's still panning and moving around
            $('#scroll-pane-1').velocity('finish').velocity('scroll', {
              container: $("#pane-right"),
              mobileHA: false,
              easing: 'ease-out',
              axis: 'y',
              begin: function(){
              },
              complete: function() {
                console.log('else called');
                if (!e.isFinal) return;
                _ys = -($('#scroll-pane-1').offset().top);
              },
              offset: (- _y + _ys),
              duration: 20
            });
          }
        };

      }
    };
  })

//
;



