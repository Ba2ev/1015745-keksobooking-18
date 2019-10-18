'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapMainPin = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterPlaceType = mapFilter.querySelector('#housing-type');
  var mapFilterPricePerNight = mapFilter.querySelector('#housing-price');
  var mapFilterRoomNumbers = mapFilter.querySelector('#housing-rooms');
  var mapFilterCapacities = mapFilter.querySelector('#housing-guests');
  var mapFilterFeatures = mapFilter.querySelector('#housing-features');

  var noticeForm = document.querySelector('.ad-form');
  var noticeFormAdress = noticeForm.querySelector('#address');
  var noticeFormPlaceType = noticeForm.querySelector('#type');
  var noticeFormRoomNumbers = noticeForm.querySelector('#room_number');
  var noticeFormCapacities = noticeForm.querySelector('#capacity');
  var noticeFormTimeIn = noticeForm.querySelector('#timein');
  var noticeFormTimeOut = noticeForm.querySelector('#timeout');

  var deactivatePage = function () {
    window.map.deactivateMap();
    window.form.deactivateNoticeForm();
  };

  var activatePage = function () {
    window.map.activateMap();
    window.mainPin.setMainPinCoordinates();
    window.pin.renderPins();
    window.form.setMinPriceForPlaceType();
    window.form.activateNoticeForm();
  };

  var resetPage = function () {
    window.mapFilter.setMapFilterDefaultParameters();
    window.mainPin.setMainPinStartCoordinates();
    window.mainPin.setMainPinCoordinates();
    window.pin.clearPins();
    window.card.closeAdCard();
    window.form.setNoticeFormBaseValues();
  };

  var updatePins = function () {
    window.card.closeAdCard();
    window.pin.clearPins();
    window.pin.renderPins();
  };

  var windowLoadHandler = function () {
    window.mainPin.saveMainPinStartCoordinates();
    window.mainPin.setMainPinCoordinates();
    window.form.saveNoticeFormBaseValues();
    deactivatePage();
  };

  var mainPinMouseDownHandler = function (evt) {
    window.mapFilter.saveMapFilterDefaultParameters();
    window.mainPin.setMainPinCoordinates();
    window.mainPin.dragDrobMainPin(evt);
    if (map.classList.contains('map--faded')) {
      activatePage();
    }
  };

  var mapFilterFeaturesClickHandler = function (evt) {
    evt.stopPropagation();
    if (evt.target.classList.contains('map__feature')) {
      window.debounce(updatePins);
    }
  };

  var notieFormSubmitHandler = function (evt) {
    window.backend.save(new FormData(noticeForm), function () {
      window.showSuccess();
      resetPage();
      deactivatePage();
    }, window.showError);
    evt.preventDefault();
  };

  window.addEventListener('load', windowLoadHandler);

  mapMainPin.addEventListener('mousedown', mainPinMouseDownHandler);

  mapPins.addEventListener('click', function (evt) {
    window.pin.onPinClick(evt);
  });

  mapFilterPlaceType.addEventListener('change', function () {
    updatePins();
  });

  mapFilterPricePerNight.addEventListener('change', function () {
    updatePins();
  });

  mapFilterRoomNumbers.addEventListener('change', function () {
    updatePins();
  });

  mapFilterCapacities.addEventListener('change', function () {
    updatePins();
  });

  mapFilterFeatures.addEventListener('click', mapFilterFeaturesClickHandler);

  noticeForm.addEventListener('submit', notieFormSubmitHandler);

  noticeFormAdress.addEventListener('keydown', function () {
    noticeFormAdress.readOnly = true;
  });

  noticeFormAdress.addEventListener('blur', function () {
    noticeFormAdress.readOnly = false;
  });

  noticeFormPlaceType.addEventListener('change', function () {
    window.form.setMinPriceForPlaceType();
  });

  noticeFormRoomNumbers.addEventListener('change', function () {
    window.form.validateNoticeForm();
  });

  noticeFormCapacities.addEventListener('change', function () {
    window.form.validateNoticeForm();
  });

  noticeFormTimeIn.addEventListener('change', function () {
    window.util.synchronizeElementsValues(noticeFormTimeIn, noticeFormTimeOut);
  });

  noticeFormTimeOut.addEventListener('change', function () {
    window.util.synchronizeElementsValues(noticeFormTimeOut, noticeFormTimeIn);
  });
})();
