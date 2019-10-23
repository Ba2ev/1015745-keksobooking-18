'use strict';
(function () {
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var successPressEscHandler = function (evt) {
    if (evt.keyCode === window.params.keyCode.ESC) {
      closeSuccess();
    }
  };

  var openSuccess = function () {
    var dialogSuccess = document.querySelector('.success');
    dialogSuccess.addEventListener('click', closeSuccess);
    document.addEventListener('keydown', successPressEscHandler);
  };

  var closeSuccess = function () {
    var dialogSuccess = document.querySelector('.success');
    dialogSuccess.removeEventListener('click', closeSuccess);
    document.removeEventListener('keydown', successPressEscHandler);
    dialogSuccess.remove();
  };

  window.showSuccess = function () {
    var successElement = successTemplate.cloneNode(true);
    var promo = document.querySelector('.promo');
    promo.before(successElement);
    openSuccess();
  };
})();
