angular
  .module('starter')
  .config('RoutesReaderBible', RoutesReaderBible);


RoutesReaderBible.$inject = ['$stateProvider'];

function RoutesReaderBible($stateProvider) {
  $stateProvider
    .state('app.reader_bible', {
      parent: 'app',
      url: "/reader_bible",
      views: {
        'content': {
          templateUrl: "apps/reader/view/reader_bible.html"
        }
      }
    })

    .state('app.reader_bible.tab_bible', {
      url: "/tab_bible",
      cache: false,
      views: {
        'tabBible': {
          templateUrl: "apps/reader/view/tab-bible.html",
          controller: "ReaderCtrl"
        }
      }
    }).state('app.reader_bible.tab_commentary', {
      url: "/tab_commentary",
      cache: false,
      views: {
        'tabCommentary': {
          templateUrl: "apps/reader/view/tab-commentary.html",
          controller: "CommentaryVerseCtrl"
        }
      }
    });

}
