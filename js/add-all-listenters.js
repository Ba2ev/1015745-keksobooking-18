'use strict';
(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var filter = map.querySelector('.map__filters');

  var form = document.querySelector('.ad-form');
  var formTitle = form.querySelector('#title');
  var formAddress = form.querySelector('#address');
  var formPlaceType = form.querySelector('#type');
  var formRoomNumbers = form.querySelector('#room_number');
  var formCapacities = form.querySelector('#capacity');
  var formTimeIn = form.querySelector('#timein');
  var formTimeOut = form.querySelector('#timeout');
  var buttonSubmit = form.querySelector('.ad-form__submit');
  var buttonReset = form.querySelector('.ad-form__reset');

  var avatarChooser = form.querySelector('.ad-form__field input[type=file]');
  var avatarPreviewImage = form.querySelector('.ad-form-header__preview img');
  var photoChooser = form.querySelector('.ad-form__upload input[type=file]');
  var photoBlock = form.querySelector('.ad-form__photo');

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
    form.reset();
    buttonSubmit.disabled = false;
    window.form.setMinPriceForPlaceType();
    window.clearAvatar();
    window.clearPhotos(photoBlock);
    deactivateFormListeners();
  };

  var activateFormListeners = function () {
    avatarChooser.addEventListener('change', avatarChooserChangeHandler);
    formTitle.addEventListener('change', formElementChangeHandler);
    formAddress.addEventListener('focus', formAddressFocusHandler);
    formAddress.addEventListener('blur', formAddressBlurHandler);
    formPlaceType.addEventListener('change', formPlaceTypeChangeHandler);
    formRoomNumbers.addEventListener('change', formElementChangeHandler);
    formCapacities.addEventListener('change', formElementChangeHandler);
    formTimeIn.addEventListener('change', formTimesChangeHandler);
    formTimeOut.addEventListener('change', formTimesChangeHandler);
    photoChooser.addEventListener('change', photoChooserChangeHandler);
    form.addEventListener('submit', formSubmitHandler);
    buttonReset.addEventListener('click', buttonResetClickHandler);
  };

  var deactivateFormListeners = function () {
    avatarChooser.removeEventListener('change', avatarChooserChangeHandler);
    formTitle.removeEventListener('change', formElementChangeHandler);
    formAddress.removeEventListener('focus', formAddressFocusHandler);
    formAddress.removeEventListener('blur', formAddressBlurHandler);
    formPlaceType.removeEventListener('change', formPlaceTypeChangeHandler);
    formRoomNumbers.removeEventListener('change', formElementChangeHandler);
    formCapacities.removeEventListener('change', formElementChangeHandler);
    formTimeIn.removeEventListener('change', formTimesChangeHandler);
    formTimeOut.removeEventListener('change', formTimesChangeHandler);
    photoChooser.removeEventListener('change', photoChooserChangeHandler);
    form.removeEventListener('submit', formSubmitHandler);
    buttonReset.removeEventListener('click', buttonResetClickHandler);
  };

  var windowLoadHandler = function () {
    window.mainPin.saveStartCoordinates();
    deactivatePage();
    window.removeEventListener('load', windowLoadHandler);
  };

  var formAddressFocusHandler = function () {
    formAddress.readOnly = true;
  };

  var formAddressBlurHandler = function () {
    formAddress.readOnly = false;
  };

  var formTimesChangeHandler = function () {
    window.util.synchronizeElementsValues(formTimeIn, formTimeOut);
  };

  var formElementChangeHandler = function () {
    window.form.validate();
  };

  var formPlaceTypeChangeHandler = function () {
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

  var formSubmitHandler = function (evt) {
    buttonSubmit.disabled = true;
    window.backend.save(new FormData(form), function () {
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

  mainPin.addEventListener('mousedown', mainPinMouseDownHandler);

  mainPin.addEventListener('keydown', mainPinPressEnterHandler);

})();
