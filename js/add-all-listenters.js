'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapMainPin = document.querySelector('.map__pin--main');

  var mapFilter = document.querySelector('.map__filters');
  var mapFilterPlaceType = mapFilter.querySelector('#housing-type');
  var mapFilterPricePerNight = mapFilter.querySelector('#housing-price');
  var mapFilterRoomNumbers = mapFilter.querySelector('#housing-rooms');
  var mapFilterCapacities = mapFilter.querySelector('#housing-guests');
  var mapFilterFeatures = mapFilter.querySelector('#housing-features');

  var noticeForm = document.querySelector('.ad-form');
  var noticeFormTitle = noticeForm.querySelector('#title');
  var noticeFormAddress = noticeForm.querySelector('#address');
  var noticeFormPlaceType = noticeForm.querySelector('#type');
  var noticeFormRoomNumbers = noticeForm.querySelector('#room_number');
  var noticeFormCapacities = noticeForm.querySelector('#capacity');
  var noticeFormTimeIn = noticeForm.querySelector('#timein');
  var noticeFormTimeOut = noticeForm.querySelector('#timeout');
  var buttonReset = noticeForm.querySelector('.ad-form__reset');

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreviewImage = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoBlock = document.querySelector('.ad-form__photo');

  var windowLoadHandler = function () {
    window.mainPin.saveMainPinStartCoordinates();
    window.form.saveNoticeFormBaseValues();
    deactivatePage();
    window.removeEventListener('load', windowLoadHandler);
  };

  var deactivatePage = function () {
    window.map.deactivateMap();
    window.form.deactivateNoticeForm();
    window.mainPin.setMainPinCoordinates();
  };

  var activatePage = function () {
    window.map.activateMap();
    window.pin.renderPins();
    activateMapFilterListeners();
    window.form.activateNoticeForm();
    window.form.setMinPriceForPlaceType();
    activateFormListeners();
  };

  var resetPage = function () {
    window.mapFilter.setMapFilterDefaultParameters();
    deactivateMapFilterListeners();
    window.mainPin.setMainPinStartCoordinates();
    window.mainPin.setMainPinCoordinates();
    window.card.closeAdCard();
    window.pin.clearPins();
    window.form.setNoticeFormBaseValues();
    deactivateFormListeners();
  };

  var activateFormListeners = function () {
    avatarChooser.addEventListener('change', avatarChooserChangeHandler);
    noticeFormTitle.addEventListener('change', noticeFormElementChangeHandler);
    noticeFormAddress.addEventListener('focus', noticeFormAddressFocusHandler);
    noticeFormAddress.addEventListener('blur', noticeFormAddressBlurHandler);
    noticeFormPlaceType.addEventListener('change', noticeFormPlaceTypeChangeHandler);
    noticeFormRoomNumbers.addEventListener('change', noticeFormElementChangeHandler);
    noticeFormCapacities.addEventListener('change', noticeFormElementChangeHandler);
    noticeFormTimeIn.addEventListener('change', noticeFormTimesChangeHandler);
    noticeFormTimeOut.addEventListener('change', noticeFormTimesChangeHandler);
    photoChooser.addEventListener('change', photoChooserChangeHandler);
    noticeForm.addEventListener('submit', noticeFormSubmitHandler);
    buttonReset.addEventListener('click', buttonResetClickHandler);
  };

  var deactivateFormListeners = function () {
    avatarChooser.removeEventListener('change', avatarChooserChangeHandler);
    noticeFormTitle.removeEventListener('change', noticeFormElementChangeHandler);
    noticeFormAddress.removeEventListener('focus', noticeFormAddressFocusHandler);
    noticeFormAddress.removeEventListener('blur', noticeFormAddressBlurHandler);
    noticeFormPlaceType.removeEventListener('change', noticeFormPlaceTypeChangeHandler);
    noticeFormRoomNumbers.removeEventListener('change', noticeFormElementChangeHandler);
    noticeFormCapacities.removeEventListener('change', noticeFormElementChangeHandler);
    noticeFormTimeIn.removeEventListener('change', noticeFormTimesChangeHandler);
    noticeFormTimeOut.removeEventListener('change', noticeFormTimesChangeHandler);
    photoChooser.removeEventListener('change', photoChooserChangeHandler);
    noticeForm.removeEventListener('submit', noticeFormSubmitHandler);
    buttonReset.removeEventListener('click', buttonResetClickHandler);
  };

  var noticeFormAddressFocusHandler = function () {
    noticeFormAddress.readOnly = true;
  };

  var noticeFormAddressBlurHandler = function () {
    noticeFormAddress.readOnly = false;
  };

  var noticeFormTimesChangeHandler = function () {
    window.util.synchronizeElementsValues(noticeFormTimeIn, noticeFormTimeOut);
  };

  var noticeFormElementChangeHandler = function () {
    window.form.validateNoticeForm();
  };

  var noticeFormPlaceTypeChangeHandler = function () {
    window.form.setMinPriceForPlaceType();
  };

  var avatarChooserChangeHandler = function () {
    window.photoChooserChangeHandler(avatarChooser, avatarPreviewImage);
  };

  var photoChooserChangeHandler = function () {
    window.photoChooserChangeHandler(photoChooser, photoBlock);
  };

  var updatePins = function () {
    window.card.closeAdCard();
    window.pin.clearPins();
    window.pin.renderPins();
  };

  var mainPinMouseDownHandler = function (evt) {
    if (map.classList.contains('map--faded')) {
      activatePage();
    }
    window.mapFilter.saveMapFilterDefaultParameters();
    window.mainPin.setMainPinCoordinates();
    window.mainPin.dragDropMainPin(evt);
  };

  var mainPinPressEnterHandler = function (evt) {
    if (evt.keyCode === window.params.keyCode.ENTER) {
      mainPinMouseDownHandler(evt);
    }
  };

  var activateMapFilterListeners = function () {
    mapFilterPlaceType.addEventListener('change', mapFilterElementChangeHandler);
    mapFilterPricePerNight.addEventListener('change', mapFilterElementChangeHandler);
    mapFilterRoomNumbers.addEventListener('change', mapFilterElementChangeHandler);
    mapFilterCapacities.addEventListener('change', mapFilterElementChangeHandler);
    mapFilterFeatures.addEventListener('click', mapFilterFeaturesClickHandler);
    mapFilterFeatures.addEventListener('keydown', mapFilterFeaturesPressSpaceHandler);
    mapFilterFeatures.addEventListener('keydown', mapFilterFeaturesPressEnterHandler);
  };

  var deactivateMapFilterListeners = function () {
    mapFilterPlaceType.removeEventListener('change', mapFilterElementChangeHandler);
    mapFilterPricePerNight.removeEventListener('change', mapFilterElementChangeHandler);
    mapFilterRoomNumbers.removeEventListener('change', mapFilterElementChangeHandler);
    mapFilterCapacities.removeEventListener('change', mapFilterElementChangeHandler);
    mapFilterFeatures.removeEventListener('click', mapFilterFeaturesClickHandler);
    mapFilterFeatures.removeEventListener('keydown', mapFilterFeaturesPressSpaceHandler);
    mapFilterFeatures.removeEventListener('keydown', mapFilterFeaturesPressEnterHandler);
  };

  var mapFilterFeaturesClickHandler = function (evt) {
    if (evt.target.classList.contains('map__feature')) {
      evt.stopPropagation();
      window.debounce(updatePins);
    }
  };

  var mapFilterFeaturesPressEnterHandler = function (evt) {
    if (evt.keyCode === window.params.keyCode.ENTER) {
      evt.target.checked = !evt.target.checked;
      window.debounce(updatePins);
    }
  };

  var mapFilterFeaturesPressSpaceHandler = function (evt) {
    if (evt.keyCode === window.params.keyCode.SPACE) {
      window.debounce(updatePins);
    }
  };

  var mapFilterElementChangeHandler = function () {
    window.debounce(updatePins);
  };

  var noticeFormSubmitHandler = function (evt) {
    window.backend.save(new FormData(noticeForm), function () {
      window.showSuccess();
      resetPage();
      deactivatePage();
    }, window.showError);
    evt.preventDefault();
  };

  var buttonResetClickHandler = function () {
    resetPage();
    deactivatePage();
  };

  window.addEventListener('load', windowLoadHandler);

  mapMainPin.addEventListener('mousedown', mainPinMouseDownHandler);

  mapMainPin.addEventListener('keydown', mainPinPressEnterHandler);

})();
