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
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var adPhotoPreview = document.querySelector('.ad-form__photo');

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

  var saveNoticeFormBaseValues = function () {
    var featuresStatuses = Array.prototype.slice.call(noticeFormFeatures).map(function (item) {
      return item.checked;
    });

    window.params['formBaseValues'] = {
      baseAvatar: avatarPreview.src,
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
    avatarPreview.src = noticeFormBaseValues.baseAvatar;
    noticeFormTitle.value = noticeFormBaseValues.baseTitle;
    noticeFormPlaceType.value = noticeFormBaseValues.basePlaceType;
    noticeFormPricePerNight.value = noticeFormBaseValues.basePricePerNight;
    noticeFormTimeIn.value = noticeFormBaseValues.baseTimeIn;
    noticeFormTimeOut.value = noticeFormBaseValues.baseTimeOut;
    noticeFormRoomNumbers.value = noticeFormBaseValues.baseRoomNumbers;
    noticeFormCapacities.value = noticeFormBaseValues.baseCapacities;
    noticeFormDescription.value = noticeFormBaseValues.baseDescription;

    noticeFormFeatures.forEach(function (item, index) {
      item.checked = noticeFormBaseValues.baseFeaturesStatuses[index];
    });

    adPhotoPreview.innerHTML = '';
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
    if (noticeFormTitle.value.length < window.params.form.TITLE_MIN_LENGTH || noticeFormTitle.value.length > window.params.form.TITLE_MAX_LENGTH) {
      noticeFormTitle.setCustomValidity('Заголовок должен быть от 30 до 100 символов. Сейчас: ' + noticeFormTitle.value.length);
    } else {
      noticeFormTitle.setCustomValidity('');
    }
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
    validateTitleLength();
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
    validateNoticeForm: validateNoticeForm
  };
})();
