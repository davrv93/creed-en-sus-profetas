app.controller('mycontroller', ['$scope', function($scope){
      $scope.data = [];
      $scope.datas = [];
      // Fill the data map with random data
      $scope.refresh = function(){
          for(var i = 0; i < 50; ++i) {
              $scope.data[i] = {};
              for(var j = 0; j < 2; ++j) {
                  $scope.data[i][j] = Math.random();
              }
          }
          
          $scope.wrapper = {data: $scope.data};
      }
      $scope.refresh()

      $scope.testing = function(){
        console.log('test');
      }
  }])