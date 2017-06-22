var ngServices = angular.module("ngServices", []);


ngServices.directive('coreProgress', function()
{
    return{
        restrict: 'E',

        template: '<div class="cargando_fondo" ng-show="state"></div>'+
                    '<div class="cargando_valores" ng-show="state">'+
                      '<center><p><md-progress-circular class="md-primary" md-mode="indeterminate"  md-diameter="100"></md-progress-circular>'+
                    '</p></center>'+
                    '</div>',

        scope: {
            state: "="
          },
           link: function(scope){
           }
        }
});

ngServices.directive('notify', function() {
  return {
    restrict: 'A',
    template: "<div class='notification notify-dir show-count' data-count='{{value}}'>  </div>",
    controller: function($scope, $timeout) {

      $scope.value = 1;
      var el = angular.element(document.querySelector('.notify-dir'));
      // el.toggleClass('notify');
      var poll = function() {
        $timeout(function() {
          el.toggleClass('notify');
          poll();
        }, 1000);
      };
      poll();

    }
  };
});
