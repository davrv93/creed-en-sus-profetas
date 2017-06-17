app.controller('ReaderCtrl', function($scope, $sce, $http, $mdDialog, $filter, API_READER, $stateParams,$translate,$cordovaSQLite, $rootScope) {
	
	var $translateFilter = $filter('translate');

    $rootScope.change_language = function(locale){
            $translate.use(locale);
			localStorage.language = locale;
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
	var currentDate = new Date()
	var day = currentDate.getDate();
	var month = currentDate.getMonth() + 1;
	var year = currentDate.getFullYear();


	if(day<10) {
	    day='0'+day
	} 

	if(month<10) {
	    month='0'+month
	} 

	var param_date=year+'-'+month+'-'+day;


	console.log('moment', param_date)
	var req = {
			method: 'GET',
			url: "https://davrv93.pythonanywhere.com/api/believe/verse/reading/",
			params:{language: $translate.use(), date:param_date}
		}

		$http(req).success(function(res) {
			$scope.content=res;
			$scope.obj_header=res.obj_header;
			$scope.obj_reading=res.obj_reading;
			$scope.pageTitle =  $translateFilter(res.obj_header.book_name);
			$rootScope.progress = false;
		}).error(function(err){
			console.log('Err',err)
			$scope.obj_reading =  [{'data':$translateFilter('errors.404')}];
			$scope.pageTitle="Error";
			$rootScope.progress = false;
		})
	}
	
	$scope.trustSrc = function(src) {
    	return $sce.trustAsResourceUrl(src);
  	}

	//Drive
	var api_key = 'AIzaSyCfhsJxJ5Hp3wb-Mv9QCAxYecyUp0I_bCo';
    var folderId = '0B0nnaryMMk8tWHRyaFJUOFNWVnc';
    var fileID='0B0nnaryMMk8tdk1KQXZMeVJUN1E';
    //var url = "https://www.googleapis.com/drive/v3/files?q='" + folderId + "'+in+parents&key=" + api_key;
    //var url = "https://www.googleapis.com/drive/v3/files?q='" + folderId + "'+in+parents&key=" + api_key;
    var url = "https://www.googleapis.com/drive/v2/files/"+fileID+"?fields=embedLink&key="+api_key+"&embedded=true"

    //0B0nnaryMMk8tdk1KQXZMeVJUN1E
    var driveParam = {
            //method: 'GET',
            url: url
        }

        $http(driveParam).success(function(res) {
            console.log(res);
            $scope.fileRead=res['embedLink'];

        }).error(function(err){
            console.log('Err',err)            
        })
    ;

    $scope.access = function() {
   		var iframe = document.getElementById("iframe").contentDocument;
   		console.log(iframe);
	}


	//$scope.onListBook();
	//$scope.onListTestament();
	$scope.onListReading();		
})

