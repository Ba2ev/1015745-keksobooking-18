'use strict';
(function () {
  var onErrorEscPress = function (evt) {
    if (evt.keyCode === window.params.keyCode.esc) {
      closeError();
    }
  };

  var openError = function () {
    var dialogError = document.querySelector('.error');
    var dialogErrorButton = document.querySelector('.error__button');
    dialogError.addEventListener('click', closeError);
    dialogErrorButton.addEventListener('click', closeError);
    document.addEventListener('keydown', onErrorEscPress);
  };

  var closeError = function () {
    var dialogError = document.querySelector('.error');
    var dialogErrorButton = document.querySelector('.error__button');
    dialogError.remove();
    dialogError.removeEventListener('click', closeError);
    dialogErrorButton.removeEventListener('click', closeError);
    document.removeEventListener('keydown', onErrorEscPress);
  };

  window.showError = function (text) {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var promo = document.querySelector('.promo');

    errorElement.querySelector('.error__message').textContent = text;
    promo.before(errorElement);
    openError();
  };
})();
