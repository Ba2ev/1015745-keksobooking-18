'use strict';
(function () {
  var form = document.querySelector('.ad-form');
  var formGroups = form.querySelectorAll('fieldset');
  var formAddress = form.querySelector('#address');
  var formTitle = form.querySelector('#title');
  var formPlaceType = form.querySelector('#type');
  var formPricePerNight = form.querySelector('#price');
  var formRoomNumbers = form.querySelector('#room_number');
  var formCapacities = form.querySelector('#capacity');
  var formTimeIn = form.querySelector('#timein');
  var formTimeOut = form.querySelector('#timeout');
  var buttonSubmit = form.querySelector('.ad-form__submit');

  var avatarChooser = form.querySelector('.ad-form__field input[type=file]');
  var avatarPreviewImage = form.querySelector('.ad-form-header__preview img');
  var photoChooser = form.querySelector('.ad-form__upload input[type=file]');
  var photoBlock = form.querySelector('.ad-form__photo');

  var activateForm = function () {
    form.classList.remove('ad-form--disabled');
    formGroups.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    buttonSubmit.disabled = false;
    setMinPriceForPlaceType();
    addFormListeners();
  };

  var deactivateForm = function () {
    form.classList.add('ad-form--disabled');
    formGroups.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    buttonSubmit.disabled = true;
    window.clearAvatar();
    window.clearPhotos(photoBlock);
    setMinPriceForPlaceType();
    removeFormListeners();
  };

  var setMinPriceForPlaceType = function () {
    switch (formPlaceType.value) {
      case 'flat':
        formPricePerNight.min = window.params.form.FLAT_MIN_PRICE;
        break;
      case 'house':
        formPricePerNight.min = window.params.form.HOUSE_MIN_PRICE;
        break;
      case 'palace':
        formPricePerNight.min = window.params.form.PALACE_MIN_PRICE;
        break;
      case 'bungalo':
        formPricePerNight.min = window.params.form.BUNGALO_MIN_PRICE;
        break;
      default:
        formPricePerNight.min = 0;
        break;
    }
    formPricePerNight.placeholder = formPricePerNight.min;
  };

  var validateTitleLength = function () {
    var isWrongTitleLength = formTitle.value.length < window.params.form.TITLE_MIN_LENGTH || formTitle.value.length > window.params.form.TITLE_MAX_LENGTH;

    if (isWrongTitleLength) {
      formTitle.setCustomValidity('Заголовок должен быть от 30 до 100 символов. Сейчас: ' + formTitle.value.length);
    } else {
      formTitle.setCustomValidity('');
    }
  };

  var validateCapacityNoGuests = function () {
    var isGuestsLimitWithoutRoomsLimit = Number(formCapacities.value) === 0 && Number(formRoomNumbers.value) !== window.params.form.NO_GUESTS_LIMIT;
    var isRoomsLimitWithoutGuestsLimit = Number(formCapacities.value) !== 0 && Number(formRoomNumbers.value) === window.params.form.NO_GUESTS_LIMIT;

    if (isGuestsLimitWithoutRoomsLimit) {
      formCapacities.setCustomValidity('Данный параметр доступен только для 100 комнат');
    } else if (isRoomsLimitWithoutGuestsLimit) {
      formCapacities.setCustomValidity('Данное кол-во комнат доступно не для гостей');
    } else {
      formCapacities.setCustomValidity('');
    }
  };

  var validateCapacityLimit = function () {

    if (Number(formCapacities.value) > Number(formRoomNumbers.value)) {
      formCapacities.setCustomValidity('Кол-во мест должно быть не больше кол-ва комнат!');
    } else {
      formCapacities.setCustomValidity('');
    }
  };

  var validateForm = function () {
    var isRoomsLimitOrGuestsLimit = Number(formCapacities.value) === 0 || Number(formRoomNumbers.value) === window.params.form.NO_GUESTS_LIMIT;

    validateTitleLength();
    validateCapacityLimit();
    if (isRoomsLimitOrGuestsLimit) {
      validateCapacityNoGuests();
    }
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
    validateForm();
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
  var addFormListeners = function () {
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
  };

  var removeFormListeners = function () {
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
  };

  window.form = {
    activate: activateForm,
    deactivate: deactivateForm
  };
})();
