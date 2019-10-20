'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapMainPin = document.querySelector('.map__pin--main');

  var saveMainPinStartCoordinates = function () {
    var mainPinX = mapMainPin.style.left;
    var mainPinY = mapMainPin.style.top;
    window.params.mainPin['startX'] = mainPinX;
    window.params.mainPin['startY'] = mainPinY;
  };

  var setMainPinStartCoordinates = function () {
    mapMainPin.style.left = window.params.mainPin['startX'];
    mapMainPin.style.top = window.params.mainPin['startY'];
  };

  var setMainPinCoordinates = function () {
    var noticeForm = document.querySelector('.ad-form');
    var noticeFormAdress = noticeForm.querySelector('#address');
    var mainPinX = mapMainPin.style.left;
    var mainPinY = mapMainPin.style.top;

    var mainPinXValue = mainPinX.substr(0, mainPinX.length - 2);
    var mainPinYValue = mainPinY.substr(0, mainPinY.length - 2);

    var mainPinSpikeX = Math.floor(Number(mainPinXValue) + window.params.mainPin.width / 2);
    var mainPinSpikeY = Math.floor(Number(mainPinYValue) + window.params.mainPin.height + window.params.mainPin.spikeHeight);

    if (noticeForm.classList.contains('ad-form--disabled')) {
      mainPinSpikeY = Math.floor(Number(mainPinYValue) + window.params.mainPin.height / 2);
    }
    noticeFormAdress.value = mainPinSpikeX + ', ' + mainPinSpikeY;
  };

  var validateMainPinCoordinates = function () {
    var noticeForm = document.querySelector('.ad-form');
    var noticeFormAdress = noticeForm.querySelector('#address');
    var mainPinCoordinates = noticeFormAdress.value.split(', ');
    var mainPinX = mainPinCoordinates[0];
    var mainPinY = mainPinCoordinates[1];

    if (mainPinX < 0 || mainPinX > map.offsetWidth || mainPinY < window.params.pin.positionTopLimit || mainPinY > window.params.pin.positionBottomLimit) {
      noticeFormAdress.setCustomValidity('Координаты метки находятся вне допустимой области: ' + 0 + ' <= X <= ' + map.offsetWidth + ', ' + window.params.pin.positionTopLimit + ' <= Y <= ' + window.params.pin.positionBottomLimit);
    } else {
      noticeFormAdress.setCustomValidity('');
    }
  };

  var dragDrobMainPin = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
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

      var mainPinHalfWidth = Math.floor(window.params.mainPin.width / 2);
      var mainPinHeight = window.params.mainPin.height + window.params.mainPin.spikeHeight;

      if (((mapMainPin.offsetLeft - shift.x) >= -mainPinHalfWidth) && ((mapMainPin.offsetLeft - shift.x) <= map.offsetWidth - mainPinHalfWidth)) {
        if (((mapMainPin.offsetTop - shift.y) >= window.params.pin.positionTopLimit - mainPinHeight) && ((mapMainPin.offsetTop - shift.y) <= window.params.pin.positionBottomLimit - mainPinHeight)) {
          mapMainPin.style.top = (mapMainPin.offsetTop - shift.y) + 'px';
          mapMainPin.style.left = (mapMainPin.offsetLeft - shift.x) + 'px';

          setMainPinCoordinates();
        }
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (defaultEvt) {
          defaultEvt.preventDefault();
          mapMainPin.removeEventListener('click', onClickPreventDefault);
        };
        mapMainPin.addEventListener('click', onClickPreventDefault);
      }
      validateMainPinCoordinates();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.mainPin = {
    saveMainPinStartCoordinates: saveMainPinStartCoordinates,
    setMainPinStartCoordinates: setMainPinStartCoordinates,
    setMainPinCoordinates: setMainPinCoordinates,
    validateMainPinCoordinates: validateMainPinCoordinates,
    dragDrobMainPin: dragDrobMainPin,
  };
})();
