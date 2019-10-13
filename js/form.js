'use strict';
(function () {
  var noticeForm = document.querySelector('.ad-form');
  var noticeFormGroups = noticeForm.querySelectorAll('fieldset');
  var noticeFormTitle = noticeForm.querySelector('#title');
  var noticeFormPlaceType = noticeForm.querySelector('#type');
  var noticeFormPricePerNight = noticeForm.querySelector('#price');
  var noticeFormTimeIn = noticeForm.querySelector('#timein');
  var noticeFormTimeOut = noticeForm.querySelector('#timeout');
  var noticeFormRoomNumbers = noticeForm.querySelector('#room_number');
  var noticeFormCapacities = noticeForm.querySelector('#capacity');
  var noticeFormFeaturesBox = noticeForm.querySelector('.features');
  var noticeFormFeatures = noticeFormFeaturesBox.querySelectorAll('[name=features]');
  var noticeFormDescription = noticeForm.querySelector('#description');

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

  var saveNoticeFormBaseValues = function () {
    var featuresStatuses = [];
    for (var i = 0; i < noticeFormFeatures.length; i++) {
      featuresStatuses.push(noticeFormFeatures[i].checked);
    }

    window.params['formBaseValues'] = {
      baseTitle: noticeFormTitle.value,
      basePlaceType: noticeFormPlaceType.value,
      basePricePerNight: noticeFormPricePerNight.value,
      baseTimeIn: noticeFormTimeIn.value,
      baseTimeOut: noticeFormTimeOut.value,
      baseRoomNumbers: noticeFormRoomNumbers.value,
      baseCapacities: noticeFormCapacities.value,
      baseFeaturesStatuses: featuresStatuses,
      baseDescription: noticeFormDescription.value
    };
  };

  var setNoticeFormBaseValues = function () {
    var noticeFormBaseValues = window.params.formBaseValues;
    noticeFormTitle.value = noticeFormBaseValues.baseTitle;
    noticeFormPlaceType.value = noticeFormBaseValues.basePlaceType;
    noticeFormPricePerNight.value = noticeFormBaseValues.basePricePerNight;
    noticeFormTimeIn.value = noticeFormBaseValues.baseTimeIn;
    noticeFormTimeOut.value = noticeFormBaseValues.baseTimeOut;
    noticeFormRoomNumbers.value = noticeFormBaseValues.baseRoomNumbers;
    noticeFormCapacities.value = noticeFormBaseValues.baseCapacities;
    noticeFormDescription.value = noticeFormBaseValues.baseDescription;

    for (var i = 0; i < noticeFormFeatures.length; i++) {
      noticeFormFeatures[i].checked = noticeFormBaseValues.baseFeaturesStatuses[i];
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

  window.form = {
    activateNoticeForm: activateNoticeForm,
    deactivateNoticeForm: deactivateNoticeForm,
    saveNoticeFormBaseValues: saveNoticeFormBaseValues,
    setNoticeFormBaseValues: setNoticeFormBaseValues,
    setMinPriceForPlaceType: setMinPriceForPlaceType,
    validateCapacityNoGuests: validateCapacityNoGuests,
    validateCapacityLimit: validateCapacityLimit,
    validateNoticeForm: validateNoticeForm
  };
})();
