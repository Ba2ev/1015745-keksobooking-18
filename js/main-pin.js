'use strict';
(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var formAddress = form.querySelector('#address');

  /**
   * Сохраняет стартовые координаты главного пина
   * @return {void}
   */
  var saveStartCoordinates = function () {
    var mainPinX = mainPin.style.left;
    var mainPinY = mainPin.style.top;
    window.params.mainPin['startX'] = mainPinX;
    window.params.mainPin['startY'] = mainPinY;
  };

  /**
   * Устанавливает стартовые координаты главного пина
   * @return {void}
   */
  var setStartCoordinates = function () {
    mainPin.style.left = window.params.mainPin['startX'];
    mainPin.style.top = window.params.mainPin['startY'];
  };

  /**
   * Записывает текущие координаты главного пина в поле "адрес"
   * @return {void}
   */
  var setFormCoordinates = function () {
    var mainPinX = mainPin.style.left;
    var mainPinY = mainPin.style.top;

    var mainPinXValue = mainPinX.substr(0, mainPinX.length - 2);
    var mainPinYValue = mainPinY.substr(0, mainPinY.length - 2);

    var mainPinSpikeX = Math.floor(Number(mainPinXValue) + window.params.mainPin.WIDTH / 2);
    var mainPinSpikeY = Math.floor(Number(mainPinYValue) + window.params.mainPin.HEIGHT + window.params.mainPin.SPIKE_HEIGHT);

    if (form.classList.contains('ad-form--disabled')) {
      mainPinSpikeY = Math.floor(Number(mainPinYValue) + window.params.mainPin.HEIGHT / 2);
    }
    formAddress.value = mainPinSpikeX + ', ' + mainPinSpikeY;
  };

  /**
   * Проверяет координаты главного пина на попадание в допустимый диапазон
   * @return {void}
   */
  var validateMainPinCoordinates = function () {
    var mainPinCoordinates = formAddress.value.split(', ');
    var mainPinX = mainPinCoordinates[0];
    var mainPinY = mainPinCoordinates[1];
    var isOutLimits = mainPinX < 0 || mainPinX > map.offsetWidth || mainPinY < window.params.pin.POSITION_TOP_LIMIT || mainPinY > window.params.pin.POSITION_BOTTOM_LIMIT;
    if (isOutLimits) {
      formAddress.setCustomValidity('Координаты метки находятся вне допустимой области: ' + 0 + ' <= X <= ' + map.offsetWidth + ', ' + window.params.pin.POSITION_TOP_LIMIT + ' <= Y <= ' + window.params.pin.POSITION_BOTTOM_LIMIT);
    } else {
      formAddress.setCustomValidity('');
    }
  };

  var clickPreventDefaultHandler = function (defaultEvt) {
    defaultEvt.preventDefault();
    mainPin.removeEventListener('click', clickPreventDefaultHandler);
  };

  /**
   * Управляет перемещением главного пина в пределах карты
   * @param {object} evt - объект события
   * @return {void}
   */
  var dragDrop = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mainPinHalfWidth = Math.floor(window.params.mainPin.WIDTH / 2);
      var mainPinHeight = window.params.mainPin.HEIGHT + window.params.mainPin.SPIKE_HEIGHT;

      var isInHorizontalLimits = function () {
        return ((mainPin.offsetLeft - shift.x) >= -mainPinHalfWidth) && ((mainPin.offsetLeft - shift.x) <= map.offsetWidth - mainPinHalfWidth);
      };

      var isInVerticalLimits = function () {
        return ((mainPin.offsetTop - shift.y) >= window.params.pin.POSITION_TOP_LIMIT - mainPinHeight) && ((mainPin.offsetTop - shift.y) <= window.params.pin.POSITION_BOTTOM_LIMIT - mainPinHeight);
      };

      if (isInHorizontalLimits() && isInVerticalLimits()) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

        setFormCoordinates();
      }
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (dragged) {
        mainPin.addEventListener('click', clickPreventDefaultHandler);
      }
      validateMainPinCoordinates();
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  window.mainPin = {
    saveStartCoordinates: saveStartCoordinates,
    setStartCoordinates: setStartCoordinates,
    setFormCoordinates: setFormCoordinates,
    dragDrop: dragDrop
  };
})();
