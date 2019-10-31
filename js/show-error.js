'use strict';
(function () {
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var promo = document.querySelector('.promo');

  /**
   * Закрывает popup по нажатию на клавшику "Esc"
   * @param {object} evt - объект события
   * @return {void}
   */
  var errorPressESCHandler = function (evt) {
    if (evt.keyCode === window.params.keyCode.ESC) {
      closeError();
    }
  };

  /**
   * Отображает popup с сообщением
   * @return {void}
   */
  var openError = function () {
    var dialogError = document.querySelector('.error');
    var dialogErrorButton = document.querySelector('.error__button');
    dialogError.addEventListener('click', closeError);
    dialogErrorButton.addEventListener('click', closeError);
    document.addEventListener('keydown', errorPressESCHandler);
  };

  /**
   * Закрывает popup
   * @return {void}
   */
  var closeError = function () {
    var dialogError = document.querySelector('.error');
    var dialogErrorButton = document.querySelector('.error__button');
    dialogError.remove();
    dialogError.removeEventListener('click', closeError);
    dialogErrorButton.removeEventListener('click', closeError);
    document.removeEventListener('keydown', errorPressESCHandler);
  };

  /**
   * Создаёт popup с сообщением
   * @return {void}
   */
  window.showError = function (text) {
    var errorElement = errorTemplate.cloneNode(true);

    errorElement.querySelector('.error__message').textContent = text;
    promo.before(errorElement);
    openError();
  };
})();
