app.controller('CommentaryVerseCtrl', function($scope, $sce, $state, $ionicModal, $ionicScrollDelegate, $http, ionicToast, $cordovaClipboard, $filter, API_READER, $stateParams, $translate, $rootScope, $cordovaSocialSharing, $location) {
    var $translateFilter = $filter('translate');

    $scope.conditionPlayer = false;
    $scope.searchMode = false;
    $scope.headerTitle = $translateFilter('hashtag');
    $scope.filter = { "data_clean": '' };
   
    $scope.goContent = function(param) {
        $state.transitionTo('app.reader_bible.content', { verse: param });
    }

    $rootScope.change_language = function(locale) {
        $scope.list_underline = [];
        $translate.use(locale);
        localStorage.language = locale;
        $scope.onListReading();
    };

    $scope.onListReading = function() {
        $rootScope.progress = true;
        var currentDate = new Date()
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();


        if (day < 10) {
            day = '0' + day
        }

        if (month < 10) {
            month = '0' + month
        }

        var param_date = year + '-' + month + '-' + day;


        console.log('moment', param_date)
        var req = {
            method: 'GET',
            url: "https://davrv93.pythonanywhere.com/api/believe/verse/reading/",
            params: {
                language: $translate.use(),
                date: param_date
            }
        }

        $http(req).success(function(res) {
            $scope.content = res;
            $rootScope.commentary = res.commentary? res.commentary:res.commentary_html? res.commentary_html:null;
            
            $scope.obj_header = res.obj_header;
            $scope.obj_reading = res.obj_reading;
            $scope.pageTitle = $translateFilter(res.obj_header.book_name);
            $rootScope.progress = false;

        }).error(function(err) {
            console.log('Err', err)
            $scope.obj_reading = [{
                'data': $translateFilter('errors.404')
            }];
            $scope.pageTitle = "Error";
            $rootScope.progress = false;
        })
    }

    $scope.onListReading();

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

});
