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

        mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );

        mc.on("pan", handleInteraction);

        var _y, _ys = 0, _yb = $('#scroll-pane-1').offset().top;

        function handleInteraction(e){
          _y = e.deltaY;
          console.log(e.type, e, e.changedPointers[0].pageY);
          if (e.isFinal){
            $('#scroll-pane-1').velocity('stop')
              .velocity('scroll',
              {
                begin: function() {
                  _ys = $('#scroll-pane-1').offset().top - _yb;
                  console.log('beginn triggered: _ys', _ys, _yb);
                },
                axis: 'y',
                container: $('#pane-right'),
                mobileHA: false,
                offset: -(_y - (300 * e.velocityY)),
                duration: e.velocityY * 800 ,
                easing: 'ease-out'
//                ,
//                progress: function(elements, c, r, s, t) {
//                  console.log("The current tween value is " + t)
//                }
              }
            );
          } else {
            $('#scroll-pane-1').velocity('stop').velocity('scroll', { container: $("#pane-right"), offset: -(_y - _ys), duration: 10 });
          }
        };

      }
    };
  })

//
;



