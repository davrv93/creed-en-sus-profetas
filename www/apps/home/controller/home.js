app.controller('HomeCtrl', function($scope, $http, $rootScope, $filter, $translate, $mdDialog, $stateParams,$cordovaSQLite, $mdMedia, $mdToast) {

    var $translateFilter = $filter('translate');
    var last = {
      bottom: true,
      top: false,
      left: false,
      right: true
    };

    $scope.toastPosition = angular.extend({},last);

    $scope.getToastPosition = function() {
        sanitizePosition();

        return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };

    function sanitizePosition() {
        var current = $scope.toastPosition;

        if ( current.bottom && last.top ) current.top = false;
        if ( current.top && last.bottom ) current.bottom = false;
        if ( current.right && last.left ) current.left = false;
        if ( current.left && last.right ) current.right = false;

        last = angular.extend({},current);
  }

    $scope.showActionToast = function() {
        var pinTo = $scope.getToastPosition();
        var toast = $mdToast.simple()
        .textContent($translateFilter('home_msg'))
        .action($translateFilter('cerrar'))
        .highlightAction(true)
        .highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
        .position(pinTo).hideDelay(0);

        $mdToast.show(toast).then(function(response) {
            if ( response == 'ok' ) {
        
            }
        });
    };

    $scope.closeToast = function() {
        $mdToast.hide();
    };
  

    $scope.showConfirm = function() {
        if (localStorage.language === undefined) {
            var confirm = $mdDialog.confirm()
                  .title('Idioma de la aplicación / App language')
                  .textContent('Elija el idioma que desea para la aplicación\r\n / Choose the desired app language.')
                  .ariaLabel('Title')
                  .targetEvent(event)
                  .ok('ENGLISH')
                  .cancel('ESPAÑOL');
                  $mdDialog.show(confirm).then(function() {
                     localStorage.language = "EN";
                     $translate.use(localStorage.language);
                     console.log(localStorage.language);
                    
                     }, function() {
                        localStorage.language = "ES";                        
                        $translate.use(localStorage.language);
                        console.log(localStorage.language);

                  });            
        } else{
            $translate.use(localStorage.language);
            console.log(localStorage.language);
        }
               
    };

    $scope.$mdMedia= $mdMedia;
    //console.log($scope.$mdMedia);

    $rootScope.change_language = function(locale){
            console.log('locale',locale)
            $translate.use(locale);
            localStorage.language = locale;
        }

    $scope.onListUpdate = function(){
    
    var req = {
            method: 'GET',
            url: "https://davrv93.pythonanywhere.com/api/believe/application/status/",
            params:{language: $translate.use(), version:$rootScope.appVersion}
        }

        $http(req).success(function(res) {
            $scope.content=res;
            
        }).error(function(err){
            console.log('Err',err)
            $scope.obj_reading =  [{'data':$translateFilter('errors.404')}];
            $scope.pageTitle="Error";            
        })
    }
    $scope.onListUpdate();


})

