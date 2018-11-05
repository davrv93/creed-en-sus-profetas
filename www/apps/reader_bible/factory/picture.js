angular
  .module('starter')
  .factory('pictureModal', pictureModal);
pictureModal.$inject = ['$ionicModal', '$rootScope', '$translate'];

function pictureModal($ionicModal, $rootScope, $translate) {
  var $scope = $rootScope.$new(),
    pictureModalInstanceOptions = {
      scope: $scope,
      focusFirstInput: true
    };
  var pictureModal = {
    open: open
  };
  return pictureModal;

  function open(result) {
    $ionicModal.fromTemplateUrl(
      'apps/reader_bible/factory/picture.html',
      pictureModalInstanceOptions
    ).then(function (modalInstance) {

      $scope.result = result;
      $scope.img_base64 = 'data:image/png;base64,' + result.img_base64;
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
