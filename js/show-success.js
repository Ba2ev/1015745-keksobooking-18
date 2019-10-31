'use strict';
(function () {
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var promo = document.querySelector('.promo');

  /**
   * Закрывает popup по нажатию на клавшику "Esc"
   * @param {object} evt - объект события
   * @return {void}
   */
  var successPressEscHandler = function (evt) {
    if (evt.keyCode === window.params.keyCode.ESC) {
      closeSuccess();
    }
  };

  /**
   * Отображает popup с сообщением
   * @return {void}
   */
  var openSuccess = function () {
    var dialogSuccess = document.querySelector('.success');
    dialogSuccess.addEventListener('click', closeSuccess);
    document.addEventListener('keydown', successPressEscHandler);
  };

  /**
   * Закрывает popup
   * @return {void}
   */
  var closeSuccess = function () {
    var dialogSuccess = document.querySelector('.success');
    dialogSuccess.removeEventListener('click', closeSuccess);
    document.removeEventListener('keydown', successPressEscHandler);
    dialogSuccess.remove();
  };

  /**
   * Создаёт popup с сообщением
   * @return {void}
   */
  window.showSuccess = function () {
    var successElement = successTemplate.cloneNode(true);
    promo.before(successElement);
    openSuccess();
  };
})();
