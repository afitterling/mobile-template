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
//      scope: {},
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
//      scope: {},
      link: function(scope, ele){

        var _y, _ys, _momentum, _interruptPan;

        _ys = 0;
        _momentum = true;

        var mc = new Hammer.Manager(ele[0], {});
        var mc2 = new Hammer.Manager(ele[0], {});

        var pan = new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 });
        var tap = new Hammer.Tap();
        pan.recognizeWith(tap);

        mc.add( pan );
        mc2.add( tap );

        mc.on('pan', handleUIEvents);

        mc2.on('tap', function(){
          _interruptPan = true;
          console.log('interruped');
        });

        var $scrollpane = $('#scroll-pane-1');

        // would like to handle tap and pan at the same time
        // but only get pan as pan has not returned yet, when tapped
        function handleUIEvents(e){
          console.log(e.type, e, e.changedPointers[0].pageY);

          _y = e.deltaY;

          if (e.isFinal && _momentum){
            // if isFinal the finger left the touch surface and the last element may have velocity to be useful for momentum
            $scrollpane.velocity('finish').velocity('scroll', {
              container: $("#pane-right"),
//              mobileHA: false,
              axis: 'y',
              begin: function(){
              },
              complete: function() {
                _ys = -($scrollpane.offset().top);
              },
              easing: 'ease-out',
              progress: function(){
                console.log(e.type);
                if (_interruptPan) _y = _ys;
              },
              offset: (- _y + _ys + (200 * e.velocityY)),
              duration: Math.abs(e.velocityY * 400)
            });
          } else {
            // if not isFinal user's still panning and moving around
            $scrollpane.velocity('finish').velocity('scroll', {
              container: $("#pane-right"),
//              mobileHA: false,
//              easing: 'ease-out',
              axis: 'y',
              begin: function(){
              },
              complete: function() {
                if (!e.isFinal) return;
                _ys = -($scrollpane.offset().top);
              },
              offset: (- _y + _ys),
              duration: 10
            });
          }
        };

      }
    };
  })

//
;



