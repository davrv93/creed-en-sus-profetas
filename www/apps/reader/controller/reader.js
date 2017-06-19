app.controller('ReaderCtrl', function($scope, $sce, $http, $mdToast, $cordovaClipboard,  $mdDialog, $filter, API_READER, $stateParams,$translate, $rootScope, $cordovaSocialSharing) {	
	var $translateFilter = $filter('translate');
	$scope.list_underline =[];

	var last = {
      bottom: false,
      top: true,
      left: false,
      right: false
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
        .textContent($translateFilter('reader_msg'))
        .action($translateFilter('cerrar'))
        .highlightAction(true)
        .highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
        .position('top right').hideDelay(2000);

        $mdToast.show(toast).then(function(response) {
            if ( response == 'ok' ) {
        
            }
        });
    };

    $scope.closeToast = function() {
        $mdToast.hide();
    };

	function dynamicSort(property) {
    	var sortOrder = 1;
    	if(property[0] === "-") {
        	sortOrder = -1;
        	property = property.substr(1);
	    }
	    return function (a,b) {
	        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        	return result * sortOrder;
    	}
	}

	$scope.copyText = function(value) {
        $cordovaClipboard.copy(value).then(function() {
            console.log("Copied text");
        }, function() {
            console.error("There was an error copying");
        });
    }
	
	$scope.buildVerse = function(){
		$scope.list_underline=$scope.list_underline.sort(dynamicSort("id"));
		var hashtag= $translateFilter('hashtag');
		var book=$scope.pageTitle +': '+ $scope.obj_header.chapter +'\n'
		var verse ="";
		for(key in $scope.list_underline) {
			verse += $scope.list_underline[key]['verse']+'. '+$scope.list_underline[key]['data']+'\n';

		}
		var text=hashtag+' '+book+verse;
		console.log($scope.list_underline);
		return text
	}

	$scope.inObject = function(target,data){
		
		var condition = true;
		for(key in data) {			
			if(data[key]['id']==target['id'])
			{				
				condition=true;
				$scope.list_underline.splice(key,1);

			}else{
				condition=false;	
			}  

		}
		if (condition===false){
				var obj_underline={
     			'id':target['id'],
     			'verse':target['verse'],
     			'data':target['data']
     			};
				$scope.list_underline.push(obj_underline);
		}
		//console.log($scope.list_underline)
	}

    $scope.fillObjUnderline = function (x) {
     	//x['id']       
     	if($scope.list_underline.length===0){
     		//console.log('true')
     		var obj_underline={
     			'id':x['id'],
     			'verse':x['verse'],
     			'data':x['data']
     		}
     		$scope.list_underline.push(obj_underline)
     	}else{
     		$scope.inObject(x,$scope.list_underline);	
     	}
    };

    $scope.setClass = function(i,x){
    	var title = document.getElementById('title'+i);
    	var BackgroundColorHighlight="#337BDF";
		var BackgroundColor="#8082C6";
		var HexBackgroundColor="rgb(51, 123, 223)";
		//console.log(x['id'])
		$scope.fillObjUnderline(x);
		
		if(title.style.backgroundColor===HexBackgroundColor){
			title.style.backgroundColor=BackgroundColor;	
		}
		else
		{
			title.style.backgroundColor=BackgroundColorHighlight;		
		}
    	// if ( title.className.match(/(?:^|\s)verse-underline(?!\S)/) )
    	// {
    	// 	title.className='activated verse';
    	// 	title.style.backgroundColor="#8082C6";}
    	// else{
    	// 	title.className='activated verse-underline';
    	// 	title.style.backgroundColor="#337BDF";
    	// }
    }

    $rootScope.change_language = function(locale){
            $scope.list_underline=[];
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

	$scope.shareSocial = function(option){
		var message=$scope.buildVerse()
		var image=''
		var link=''
		if($scope.list_underline.length==0){
			$scope.showActionToast();
		}else{

		if(option=="copy"){
			$scope.copyText(message);
		}
		if(option=="twitter")
		{$cordovaSocialSharing
		    .shareViaTwitter(message, image, link)
		    .then(function(result) {
		      // Success!
		     
		    }, function(err) {
		      // An error occurred. Show a message to the user
		    });
		}
		if(option=="facebook")
		{$cordovaSocialSharing
		    .shareViaFacebook(message, image, link)
		    .then(function(result) {
		    	$scope.copyText(message);
		      // Success!
		    }, function(err) {
		      // An error occurred. Show a message to the user
		    });
		}

		  // $cordovaSocialSharing
		  //   .shareViaWhatsApp(message, image, link)
		  //   .then(function(result) {
		  //     // Success!
		  //   }, function(err) {
		  //     // An error occurred. Show a message to the user
		  //   });
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
	$scope.onListReading();		
});

