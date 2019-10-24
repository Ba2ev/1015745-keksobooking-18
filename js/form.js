'use strict';
(function () {
  var noticeForm = document.querySelector('.ad-form');
  var noticeFormGroups = noticeForm.querySelectorAll('fieldset');
  var noticeFormTitle = noticeForm.querySelector('#title');
  var noticeFormPlaceType = noticeForm.querySelector('#type');
  var noticeFormPricePerNight = noticeForm.querySelector('#price');
  var noticeFormRoomNumbers = noticeForm.querySelector('#room_number');
  var noticeFormCapacities = noticeForm.querySelector('#capacity');

  var activateNoticeForm = function () {
    noticeForm.classList.remove('ad-form--disabled');
    noticeFormGroups.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  var deactivateNoticeForm = function () {
    noticeForm.classList.add('ad-form--disabled');
    noticeFormGroups.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  };

  var setMinPriceForPlaceType = function () {
    switch (noticeFormPlaceType.value) {
      case 'flat':
        noticeFormPricePerNight.min = window.params.form.FLAT_MIN_PRICE;
        break;
      case 'house':
        noticeFormPricePerNight.min = window.params.form.HOUSE_MIN_PRICE;
        break;
      case 'palace':
        noticeFormPricePerNight.min = window.params.form.PALACE_MIN_PRICE;
        break;
      case 'bungalo':
        noticeFormPricePerNight.min = window.params.form.BUNGALO_MIN_PRICE;
        break;
      default:
        noticeFormPricePerNight.min = 0;
        break;
    }
    noticeFormPricePerNight.placeholder = noticeFormPricePerNight.min;
  };

  var validateTitleLength = function () {
    var isWrongTitleLength = noticeFormTitle.value.length < window.params.form.TITLE_MIN_LENGTH || noticeFormTitle.value.length > window.params.form.TITLE_MAX_LENGTH;

    if (isWrongTitleLength) {
      noticeFormTitle.setCustomValidity('Заголовок должен быть от 30 до 100 символов. Сейчас: ' + noticeFormTitle.value.length);
    } else {
      noticeFormTitle.setCustomValidity('');
    }
  };

  var validateCapacityNoGuests = function () {
    var isGuestsLimitWithoutRoomsLimit = Number(noticeFormCapacities.value) === 0 && Number(noticeFormRoomNumbers.value) !== window.params.form.NO_GUESTS_LIMIT;
    var isRoomsLimitWithoutGuestsLimit = Number(noticeFormCapacities.value) !== 0 && Number(noticeFormRoomNumbers.value) === window.params.form.NO_GUESTS_LIMIT;

    if (isGuestsLimitWithoutRoomsLimit) {
      noticeFormCapacities.setCustomValidity('Данный параметр доступен только для 100 комнат');
    } else if (isRoomsLimitWithoutGuestsLimit) {
      noticeFormCapacities.setCustomValidity('Данное кол-во комнат доступно не для гостей');
    } else {
      noticeFormCapacities.setCustomValidity('');
    }
  };

  var validateCapacityLimit = function () {

    if (Number(noticeFormCapacities.value) > Number(noticeFormRoomNumbers.value)) {
      noticeFormCapacities.setCustomValidity('Кол-во мест должно быть не больше кол-ва комнат!');
    } else {
      noticeFormCapacities.setCustomValidity('');
    }
  };

  var validateNoticeForm = function () {
    var isRoomsLimitOrGuestsLimit = Number(noticeFormCapacities.value) === 0 || Number(noticeFormRoomNumbers.value) === window.params.form.NO_GUESTS_LIMIT;

    validateTitleLength();
    validateCapacityLimit();
    if (isRoomsLimitOrGuestsLimit) {
      validateCapacityNoGuests();
    }
  };

  window.form = {
    activate: activateNoticeForm,
    deactivate: deactivateNoticeForm,
    setMinPriceForPlaceType: setMinPriceForPlaceType,
    validate: validateNoticeForm
  };
})();
