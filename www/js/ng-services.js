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
