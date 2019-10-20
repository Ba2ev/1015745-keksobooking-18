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
  var noticeFormTitle = noticeForm.querySelector('#title');
  var noticeFormAdress = noticeForm.querySelector('#address');
  var noticeFormPlaceType = noticeForm.querySelector('#type');
  var noticeFormRoomNumbers = noticeForm.querySelector('#room_number');
  var noticeFormCapacities = noticeForm.querySelector('#capacity');
  var noticeFormTimeIn = noticeForm.querySelector('#timein');
  var noticeFormTimeOut = noticeForm.querySelector('#timeout');
  var buttonReset = noticeForm.querySelector('.ad-form__reset');

  var deactivatePage = function () {
    window.mapFilter.deactivateMapFilter();
    window.map.deactivateMap();
    window.form.deactivateNoticeForm();
    window.mainPin.setMainPinCoordinates();
  };

  var activatePage = function () {
    window.map.activateMap();
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
    if (map.classList.contains('map--faded')) {
      activatePage();
    }
    window.mapFilter.saveMapFilterDefaultParameters();
    window.mainPin.setMainPinCoordinates();
    window.mainPin.dragDrobMainPin(evt);
  };

  var mapFilterFeaturesClickHandler = function (evt) {
    if (evt.target.classList.contains('map__feature')) {
      evt.stopPropagation();
      window.debounce(updatePins);
    }
  };

  var mapFilterFeaturesPressEnterHandler = function (evt) {
    var target = evt.target;
    if (target.checked === false) {
      target.checked = true;
    } else {
      target.checked = false;
    }
    window.debounce(updatePins);
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

  mapMainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.params.keyCode.enter) {
      mainPinMouseDownHandler(evt);
    }
  });

  mapPins.addEventListener('click', function (evt) {
    window.pin.onPinClick(evt);
  });

  mapFilterPlaceType.addEventListener('change', function () {
    window.debounce(updatePins);
  });

  mapFilterPricePerNight.addEventListener('change', function () {
    window.debounce(updatePins);
  });

  mapFilterRoomNumbers.addEventListener('change', function () {
    window.debounce(updatePins);
  });

  mapFilterCapacities.addEventListener('change', function () {
    window.debounce(updatePins);
  });

  mapFilterFeatures.addEventListener('click', mapFilterFeaturesClickHandler);

  mapFilterFeatures.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.params.keyCode.space) {
      window.debounce(updatePins);
    }
  });

  mapFilterFeatures.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.params.keyCode.enter) {
      mapFilterFeaturesPressEnterHandler(evt);
      window.debounce(updatePins);
    }
  });

  noticeForm.addEventListener('submit', notieFormSubmitHandler);

  noticeFormTitle.addEventListener('change', function () {
    window.form.validateNoticeForm();
  });

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

  buttonReset.addEventListener('click', function () {
    resetPage();
    deactivatePage();
  });
})();
