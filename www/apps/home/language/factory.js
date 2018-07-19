angular
  .module('starter')
  .factory('LanguageModal', LanguageModal);
LanguageModal.$inject = ['$ionicModal', '$rootScope', '$translate'];

function LanguageModal($ionicModal, $rootScope, $translate) {
  var $scope = $rootScope.$new(),
    LanguageModalInstanceOptions = {
      scope: $scope,
      focusFirstInput: true
    };
  var LanguageModal = {
    open: open
  };
  return LanguageModal;

  function open() {
    $ionicModal.fromTemplateUrl(
      'apps/home/language/language.html',
      LanguageModalInstanceOptions
    ).then(function (modalInstance) {
      $scope.languages = [{
          'name': 'Español',
          'code': 'ES'
        },
        {
          'name': 'English',
          'code': 'EN'
        }
      ];


      $scope.setLanguage = function (lang) {
        if (lang == "ES") {
          localStorage.language = "ES";
          $translate.use(localStorage.language);
          console.log(localStorage.language);

        } else {
          localStorage.language = "EN";
          $translate.use(localStorage.language);
          console.log(localStorage.language);
        }
      }


      $scope.close = function () {
        closeAndRemove(modalInstance);
      };
      return modalInstance.show();
    });
  }

  function closeAndRemove(modalInstance) {
    return modalInstance.hide()
      .then(function () {
        return modalInstance.remove();
      });
  }
}
