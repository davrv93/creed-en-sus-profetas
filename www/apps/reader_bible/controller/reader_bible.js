angular.module('starter').controller('ReaderCtrl', function ($scope, $sce, $state, $ionicScrollDelegate, $http, ionicToast, $cordovaClipboard, $filter, API_READER, $stateParams, $translate, $rootScope, $cordovaSocialSharing, pictureModal) {
  var $translateFilter = $filter('translate');
  $scope.conditionPlayer = false;
  $scope.searchMode = false;
  $scope.list_underline = [];

  $scope.showActionToast = function () {
    ionicToast.show($translateFilter('reader_msg'), 'bottom', false, 2000);
  };

  $scope.showCopyToast = function () {
    ionicToast.show($translateFilter('copy_msg'), 'top', false, 1500);
  };


  $scope.closeToast = function () {
    ionicToast.hide();
  };

  function orderBy(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  $scope.copyText = function (value) {
    $cordovaClipboard.copy(value).then(function () {
      console.log("Copied text");
    }, function () {
      console.error("There was an error copying");
    });
  }

  $scope.buildVerse = function () {
    $scope.list_underline = $scope.list_underline.sort(orderBy("id"));
    var hashtag = $translateFilter('hashtag');
    var book = $scope.book.name + ': ' + $scope.verses[0].chapter + '\n'
    var verse = "";
    for (key in $scope.list_underline) {
      verse += $scope.list_underline[key]['verse'] + '. ' + $scope.list_underline[key]['data'] + '\n';

    }
    var text = hashtag + ' ' + book + verse;

    return text
  }

  $scope.buildPicture = function () {
    $scope.list_underline = $scope.list_underline.sort(orderBy("id"));

    $rootScope.progress = true;

    var lecture = {};

    lecture.book = $scope.book.name;
    lecture.chapter = $scope.verses[0].chapter;
    lecture.verses = $scope.list_underline

    var data = {
      micro: 'picture',
      lecture: lecture
    }

    API_READER.BibleReading.post(data).$promise.then(function (success) {
      $rootScope.progress = false;

      pictureModal.open(success);
    });

  }

  $scope.inObject = function (target, data) {

    var condition = true;
    for (key in data) {
      if (data[key]['id'] == target['id']) {
        condition = true;
        $scope.list_underline.splice(key, 1);

      } else {
        condition = false;
      }

    }
    if (condition === false) {
      var obj_underline = {
        'id': target['id'],
        'verse': target['verse'],
        'data': target['data']
      };
      $scope.list_underline.push(obj_underline);
    }
    //console.log($scope.list_underline)
  }

  $scope.fillObjUnderline = function (x) {
    //x['id']       
    if ($scope.list_underline.length === 0) {
      //console.log('true')
      var obj_underline = {
        'id': x['id'],
        'verse': x['verse'],
        'data': x['data']
      }
      $scope.list_underline.push(obj_underline)
    } else {
      $scope.inObject(x, $scope.list_underline);
    }
  };

  $scope.setClass = function (i, x) {
    var title = document.getElementById('title' + i);
    var BackgroundColorHighlight = "#ffff99";
    var BackgroundColor = "#ffffff";
    var HexBackgroundColor = "rgb(255, 255, 153)";

    $scope.fillObjUnderline(x);

    if (title.style.backgroundColor === HexBackgroundColor) {
      title.style.backgroundColor = BackgroundColor;
    } else {
      title.style.backgroundColor = BackgroundColorHighlight;
    }
  }

  $rootScope.change_language = function (locale) {
    $scope.list_underline = [];
    $translate.use(locale);
    localStorage.language = locale;
    $scope.getBibleRead();
    if ($scope.conditionPlayer) {
      $scope.dropPlayer();
      $scope.conditionPlayer = true;
      $scope.handlePlayer();
    }

    $scope.conditionPlayer = false;
  };



  $scope.renderPlayer = function () {
    var audio = ''
    if ($scope.audio) {
      audio = $scope.audio
    } else {
      audio = ''
    }
    var playlist = [{
      url: audio,
      displayText: 'Audio'
    }, ];
    var player =
      React.createElement(AudioPlayer, {
        playlist: playlist,
        autoplay: true,
        cycle: false,
        hideForwardSkip: true,
        hideBackSkip: true,
        autoplayDelayInSeconds: 2.1,
        style: {
          position: 'fixed',
          bottom: 0
        }
      });

    ReactDOM.render(player,
      document.getElementById('audio_player_container')
    );
    console.log(player)
  };

  $scope.dropPlayer = function () {
    if (document.getElementById('audio_player_container')) {
      ReactDOM.unmountComponentAtNode(document.getElementById('audio_player_container'));
    }
  };

  $scope.handlePlayer = function () {
    if ($scope.conditionPlayer) {
      $scope.dropPlayer();
      $scope.conditionPlayer = false;
    } else {
      $scope.renderPlayer();
      $scope.conditionPlayer = true;
    }
  };



  $scope.$watch(function () {
    return $state.$current.name
  }, function (newVal, oldVal) {
    //do something with values
    $scope.dropPlayer();
    $scope.conditionPlayer = false;
  })

  $scope.shareSocial = function (option) {
    var message = $scope.buildVerse()
    var image = ''
    var link = ''
    if ($scope.list_underline.length == 0) {
      $scope.showActionToast();
    } else {
      $scope.showCopyToast();

      setTimeout(function () {
        document.getElementById('over').style.backgroundColor = "#ffffff";
      }, 1500);


      if (option == "copy") {
        $scope.copyText(message);
      }
      if (option == "twitter") {
        $cordovaSocialSharing
          .shareViaTwitter(message, image, link)
          .then(function (result) {
            // Success!

          }, function (err) {
            // An error occurred. Show a message to the user
          });
      }
      if (option == "facebook") {
        $cordovaSocialSharing
          .shareViaFacebook(message, image, link)
          .then(function (result) {
            $scope.copyText(message);
            // Success!
          }, function (err) {
            // An error occurred. Show a message to the user
          });
      }

      if (option == "whatsapp") {
        $cordovaSocialSharing
          .shareViaWhatsApp(message, image, link)
          .then(function (result) {
            $scope.copyText(message);
            // Success!
          }, function (err) {
            // An error occurred. Show a message to the user
          });
      }
    }
  }

  $scope.getDate = function () {
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

    return year + '-' + month + '-' + day;

  }

  $scope.getBibleRead = function () {
    $rootScope.progress = true;

    var param_date = $scope.getDate();

    var data = {
      start_date: param_date,
    }


    API_READER.BibleReading.getList(data).$promise.then(function (success) {
      var results = success
      if (results) {
        $scope.bible_reading = results[0];
        console.log('$scope.bible_reading', $scope.bible_reading)
        $scope.getVerses($scope.bible_reading);
        $scope.getBook($scope.bible_reading)
        $scope.getChapter($scope.bible_reading);
      }
    });
  }

  $scope.getVerses = function (bible_reading) {
    var params = {};
    params.book = bible_reading.book;
    params.chapter = bible_reading.start_chapter;
    params.code_iso = $translate.use();

    API_READER.Verse.get(params).$promise.then(function (success) {
      var results = success.results
      $scope.verses = results;
    });
  };

  $scope.getBook = function (bible_reading) {
    var params = {};
    params.book = bible_reading.book;
    params.code_iso = $translate.use();

    API_READER.BookLanguages.get(params).$promise.then(function (success) {
      var results = success.results
      if (results && results.length > 0) {
        $scope.book = results[0];
      }

    });
  };

  $scope.getChapter = function (bible_reading) {
    var params = {};
    params.book = bible_reading.book;
    params.chapter = bible_reading.start_chapter;
    params.code_iso = $translate.use().toUpperCase();

    API_READER.Chapter.get(params).$promise.then(function (success) {
      var results = success.results
      if (results && results.length > 0) {
        $scope.chapter = results[0];

        $scope.getAudio($scope.chapter.id)

      } else {

        API_READER.Chapter.post(params).$promise.then(
          function (success) {
            $scope.getChapter(bible_reading);
            console.log('success', success)
          },
          function (error) {
            console.log('error', error)
          }
        )
      }
    });
  };

  $scope.getAudio = function (id) {
    var params = {};
    params.micro = 'audio';
    params.id = id;

    API_READER.Chapter.get(params).$promise.then(function (success) {

      $scope.audio = success.url;

    });
  };

  $scope.trustSrc = function (src) {
    return $sce.trustAsResourceUrl(src);
  }

  $scope.getBibleRead();



});
