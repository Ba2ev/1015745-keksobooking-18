'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapMainPin = document.querySelector('.map__pin--main');
  var filter = document.querySelector('.map__filters');

  var noticeForm = document.querySelector('.ad-form');
  var noticeFormTitle = noticeForm.querySelector('#title');
  var noticeFormAddress = noticeForm.querySelector('#address');
  var noticeFormPlaceType = noticeForm.querySelector('#type');
  var noticeFormRoomNumbers = noticeForm.querySelector('#room_number');
  var noticeFormCapacities = noticeForm.querySelector('#capacity');
  var noticeFormTimeIn = noticeForm.querySelector('#timein');
  var noticeFormTimeOut = noticeForm.querySelector('#timeout');
  var buttonSubmit = noticeForm.querySelector('.ad-form__submit');
  var buttonReset = noticeForm.querySelector('.ad-form__reset');

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreviewImage = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoBlock = document.querySelector('.ad-form__photo');

  var deactivatePage = function () {
    map.classList.add('map--faded');
    window.form.deactivate();
    window.mainPin.setCoordinates();
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    window.pin.load();
    filter.addEventListener('change', filterElementChangeHandler);
    window.form.activate();
    window.form.setMinPriceForPlaceType();
    activateFormListeners();
  };

  var updatePins = function () {
    window.card.close();
    window.pin.clear();
    window.pin.filter();
  };

  var resetPage = function () {
    filter.removeEventListener('change', filterElementChangeHandler);
    filter.reset();
    window.mainPin.setStartCoordinates();
    window.mainPin.setCoordinates();
    window.card.close();
    window.pin.clear();
    noticeForm.reset();
    buttonSubmit.disabled = false;
    window.form.setMinPriceForPlaceType();
    window.clearAvatar();
    window.clearPhotos(photoBlock);
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

  var windowLoadHandler = function () {
    window.mainPin.saveStartCoordinates();
    deactivatePage();
    window.removeEventListener('load', windowLoadHandler);
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
    window.form.validate();
  };

  var noticeFormPlaceTypeChangeHandler = function () {
    window.form.setMinPriceForPlaceType();
  };

  var avatarChooserChangeHandler = function () {
    window.avatarChooserChangeHandler(avatarChooser, avatarPreviewImage);
  };

  var photoChooserChangeHandler = function () {
    window.photoChooserChangeHandler(photoChooser, photoBlock);
  };

  var mainPinMouseDownHandler = function (evt) {
    if (map.classList.contains('map--faded')) {
      activatePage();
    }
    window.mainPin.setCoordinates();
    window.mainPin.dragDrop(evt);
  };

  var mainPinPressEnterHandler = function (evt) {
    if (evt.keyCode === window.params.keyCode.ENTER) {
      mainPinMouseDownHandler(evt);
    }
  };

  var filterElementChangeHandler = function () {
    window.debounce(updatePins);
  };

  var noticeFormSubmitHandler = function (evt) {
    buttonSubmit.disabled = true;
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
