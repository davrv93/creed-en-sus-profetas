 angular.module('starter')
   .config(["$translateProvider", function ($translateProvider, $translate) {


     if (localStorage.language != undefined) {
       $translateProvider.preferredLanguage(localStorage.language);
     } else {
       $translateProvider.preferredLanguage('ES');
     }
     $translateProvider.useSanitizeValueStrategy('sanitize');
     $translateProvider.useSanitizeValueStrategy('escape');

   }]);
