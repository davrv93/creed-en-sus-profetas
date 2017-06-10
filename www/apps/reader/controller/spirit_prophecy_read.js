
app.controller('SpiritProphecyReadCtrl', function($scope, $http,$filter, $mdDialog, API_READER, $stateParams,$translate,$cordovaSQLite, $rootScope) {
	var $translateFilter = $filter('translate');

    $rootScope.change_language = function(locale){
            $translate.use(locale);
            $scope.onListReading();
        }    


	$scope.HighLight = function()
	{ 
		var elementId = event.srcElement.id;
		var elementHtml= document.getElementById(elementId)
		var BackgroundColorHighlight="#337BDF";
		var BackgroundColor="#8082C6";
		var HexBackgroundColor="rgb(51, 123, 223)";
		
		if(elementHtml.style.backgroundColor===HexBackgroundColor){
			elementHtml.style.backgroundColor=BackgroundColor;	
		}
		else
		{
			elementHtml.style.backgroundColor=BackgroundColorHighlight;		
		}
	}


	$scope.onListBook = function(){
	//var query = Book.query();
		API_READER.Book.list().$promise.then(function(data) {
     		$scope.book = data;
     		// Do whatever when the request is finished
		});
	}

	$scope.onListTestament = function(){
	//var query = Book.query();
		API_READER.Testament.list().$promise.then(function(data) {
     		$scope.testament = data;
     		// Do whatever when the request is finished
		});
	}

	$scope.onListReading = function(){
	$rootScope.progress = true;
	var req = {
			method: 'GET',
			url: "https://davrv93.pythonanywhere.com/api/believe/spirit_prophecy_read/reading/",
			params:{language: $translate.use()}
		}

		$http(req).success(function(res) {
			$scope.content=res;
			$scope.obj_header=res.obj_header;
			$scope.obj_reading=res.obj_reading;			
			$scope.obj_chapter=res.obj_chapter;
			$scope.pageTitle =  $translateFilter(res.obj_header.book_name);
			$scope.footerTitle =  $translateFilter(res.obj_chapter.translate_name);

			$rootScope.progress = false;
		}).error(function(err){
			console.error(angular.toJson(err))
			console.log('Err',err)
		})
	}

	//$scope.onListBook();
	//$scope.onListTestament();
	$scope.onListReading();

		
})

