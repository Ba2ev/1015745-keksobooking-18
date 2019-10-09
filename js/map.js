'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters-container');
  var mapFilterGroups = mapFilter.querySelectorAll('.map__filter');
  var mapFilterFeaturesGroup = mapFilter.querySelector('.map__features');

  var mapMainPin = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');

  var deactivatePage = function () {
    deactivateMap();
    window.form.deactivateNoticeForm();
  };

  var activatePage = function () {
    activateMap();
    window.form.activateNoticeForm();
    window.renderPins();
  };

  var deactivateMap = function () {
    map.classList.add('map--faded');
    mapFilterFeaturesGroup.setAttribute('disabled', 'disabled');
    for (var i = 0; i < mapFilterGroups.length; i++) {
      mapFilterGroups[i].setAttribute('disabled', 'disabled');
    }
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
    mapFilterFeaturesGroup.removeAttribute('disabled');
    for (var i = 0; i < mapFilterGroups.length; i++) {
      mapFilterGroups[i].removeAttribute('disabled');
    }
  };

  var setMainPinCoordinates = function () {
    var noticeForm = document.querySelector('.ad-form');
    var noticeFormAdress = noticeForm.querySelector('#address');
    var mainPinX = mapMainPin.style.left;
    var mainPinY = mapMainPin.style.top;
    var mainPinXValue = mainPinX.substr(0, mainPinX.length - 2);
    var mainPinYValue = mainPinY.substr(0, mainPinY.length - 2);
    var mainPinSpikeX = Math.floor(Number(mainPinXValue) + window.params.mainPin.mainPinWidth / 2);
    var mainPinSpikeY = Math.floor(Number(mainPinYValue) + window.params.mainPin.mainPinHeight + window.params.mainPin.mainPinSpikeHeight);

    if (noticeForm.classList.contains('ad-form--disabled')) {
      mainPinSpikeY = Math.floor(mainPinYValue + window.params.mainPin.mainPinHeight / 2);
    }
    noticeFormAdress.value = mainPinSpikeX + ', ' + mainPinSpikeY;
  };

  var validateMainPinCoordinates = function () {
    var noticeForm = document.querySelector('.ad-form');
    var noticeFormAdress = noticeForm.querySelector('#address');
    var mainPinCoordinates = noticeFormAdress.value.split(', ');
    var mainPinX = mainPinCoordinates[0];
    var mainPinY = mainPinCoordinates[1];

    if (mainPinX < 0 || mainPinX > map.offsetWidth || mainPinY < window.params.pin.pinPositionTopLimit || mainPinY > window.params.pin.pinPositionBottomLimit) {
      noticeFormAdress.setCustomValidity('Координаты метки находятся вне допустимой области: ' + 0 + ' <= X <= ' + map.offsetWidth + ', ' + window.params.pin.pinPositionTopLimit + ' <= Y <= ' + window.params.pin.pinPositionBottomLimit);
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

      var mainPinHalfWidth = Math.floor(window.params.mainPin.mainPinWidth / 2);
      var mainPinHeight = window.params.mainPin.mainPinHeight + window.params.mainPin.mainPinSpikeHeight;
      if (((mapMainPin.offsetLeft - shift.x) >= -mainPinHalfWidth) && ((mapMainPin.offsetLeft - shift.x) <= map.offsetWidth - mainPinHalfWidth)) {
        if (((mapMainPin.offsetTop - shift.y) >= window.params.pin.pinPositionTopLimit - mainPinHeight) && ((mapMainPin.offsetTop - shift.y) <= window.params.pin.pinPositionBottomLimit - mainPinHeight)) {
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

  var onPinClick = function (evt) {
    var mapCard = document.querySelector('.map__card.popup');
    var target = evt.target.closest('.map__pin:not(.map__pin--main)');

    if (target) {
      var adPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      var mapAdPins = [];

      for (var i = 0; i < adPins.length; i++) {
        mapAdPins.push(adPins[i]);
      }

      var currentIndex = mapAdPins.indexOf(target);
      window.createCard(window.data[currentIndex]);

      if (mapCard) {
        closeAdCard();
      }
      openAdCard();
    }
  };

  var onAdCardEscPress = function (evt) {
    if (evt.keyCode === window.params.keyCode.esc) {
      closeAdCard();
    }
  };

  var openAdCard = function () {
    var mapCard = document.querySelector('.map__card.popup');
    var mapCardClose = mapCard.querySelector('.popup__close');
    mapCard.classList.remove('hidden');
    mapCardClose.addEventListener('click', closeAdCard);
    document.addEventListener('keydown', onAdCardEscPress);
  };

  var closeAdCard = function () {
    var mapCard = document.querySelector('.map__card.popup');
    document.removeEventListener('keydown', onAdCardEscPress);
    mapCard.remove();
  };

  mapMainPin.addEventListener('load', setMainPinCoordinates);

  mapMainPin.addEventListener('mousedown', function (evt) {
    dragDrobMainPin(evt);
  });

  mapMainPin.addEventListener('mousedown', function () {
    if (map.classList.contains('map--faded')) {
      activatePage();
    }
  });

  mapMainPin.addEventListener('mousedown', setMainPinCoordinates);

  mapPins.addEventListener('click', function (evt) {
    onPinClick(evt);
  });

  deactivatePage();
})();
