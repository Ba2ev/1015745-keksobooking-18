'use strict';
(function () {
  var form = document.querySelector('.ad-form');
  var formGroups = form.querySelectorAll('fieldset');
  var formTitle = form.querySelector('#title');
  var formPlaceType = form.querySelector('#type');
  var formPricePerNight = form.querySelector('#price');
  var formRoomNumbers = form.querySelector('#room_number');
  var formCapacities = form.querySelector('#capacity');

  var activateForm = function () {
    form.classList.remove('ad-form--disabled');
    formGroups.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  var deactivateForm = function () {
    form.classList.add('ad-form--disabled');
    formGroups.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
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

  window.form = {
    activate: activateForm,
    deactivate: deactivateForm,
    setMinPriceForPlaceType: setMinPriceForPlaceType,
    validate: validateForm
  };
})();
