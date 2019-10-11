'use strict';
(function () {
  var noticeForm = document.querySelector('.ad-form');
  var noticeFormGroups = noticeForm.querySelectorAll('fieldset');
  var noticeFormAdress = noticeForm.querySelector('#address');
  var noticeFormPlaceType = noticeForm.querySelector('#type');
  var noticeFormPricePerNight = noticeForm.querySelector('#price');
  var noticeFormTimeIn = noticeForm.querySelector('#timein');
  var noticeFormTimeOut = noticeForm.querySelector('#timeout');
  var noticeFormRoomNumbers = noticeForm.querySelector('#room_number');
  var noticeFormCapacities = noticeForm.querySelector('#capacity');

  var activateNoticeForm = function () {
    noticeForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < noticeFormGroups.length; i++) {
      noticeFormGroups[i].removeAttribute('disabled');
    }
  };

  var deactivateNoticeForm = function () {
    noticeForm.classList.add('ad-form--disabled');
    for (var i = 0; i < noticeFormGroups.length; i++) {
      noticeFormGroups[i].setAttribute('disabled', 'disabled');
    }
  };

  var setMinPriceForPlaceType = function () {
    switch (noticeFormPlaceType.value) {
      case 'flat':
        noticeFormPricePerNight.min = window.params.form.flatMinPrice;
        break;
      case 'house':
        noticeFormPricePerNight.min = window.params.form.houseMinPrice;
        break;
      case 'palace':
        noticeFormPricePerNight.min = window.params.form.palaceMinPrice;
        break;
      case 'bungalo':
        noticeFormPricePerNight.min = window.params.form.bungaloMinPrice;
        break;
      default:
        noticeFormPricePerNight.min = 0;
        break;
    }
    noticeFormPricePerNight.placeholder = noticeFormPricePerNight.min;
  };

  var validateCapacityNoGuests = function () {

    if (Number(noticeFormCapacities.value) === 0 && Number(noticeFormRoomNumbers.value) !== 100) {
      noticeFormCapacities.setCustomValidity('Данный параметр доступен только для 100 комнат');
    } else if (Number(noticeFormCapacities.value) !== 0 && Number(noticeFormRoomNumbers.value) === 100) {
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
    validateCapacityLimit();
    if (Number(noticeFormCapacities.value) === 0 || Number(noticeFormRoomNumbers.value) === 100) {
      validateCapacityNoGuests();
    }
  };

  noticeForm.addEventListener('load', setMinPriceForPlaceType);

  noticeForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(noticeForm), window.showSuccess, window.showError);
    evt.preventDefault();
  });

  noticeFormAdress.addEventListener('keydown', function () {
    noticeFormAdress.readOnly = true;
  });

  noticeFormAdress.addEventListener('blur', function () {
    noticeFormAdress.readOnly = false;
  });

  noticeFormPlaceType.addEventListener('change', setMinPriceForPlaceType);

  noticeFormRoomNumbers.addEventListener('change', validateNoticeForm);

  noticeFormCapacities.addEventListener('change', validateNoticeForm);

  noticeFormTimeIn.addEventListener('change', function () {
    window.util.synchronizeElementsValues(noticeFormTimeIn, noticeFormTimeOut);
  });

  noticeFormTimeOut.addEventListener('change', function () {
    window.util.synchronizeElementsValues(noticeFormTimeOut, noticeFormTimeIn);
  });

  window.form = {
    activateNoticeForm: activateNoticeForm,
    deactivateNoticeForm: deactivateNoticeForm,
    setMinPriceForPlaceType: setMinPriceForPlaceType
  };
})();
