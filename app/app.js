'use strict';

angular.module('webApp', [])

//.config()

.run(function(){
    console.log('angular runs');
  })



.controller('AppCtrl', function(){
    var self = this;

    self.items = [];

    for (var _i = 0; _i <= 100; _i++) {
      self.items.push({id: _i});
    }

})

//
;



