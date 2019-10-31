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
  var avatarDefaultSrc = avatarPreviewImage.src;
  var photoChooser = form.querySelector('.ad-form__upload input[type=file]');
  var photoBlock = form.querySelector('.ad-form__photo');

  /**
   * Активирует форму на карте
   * @return {void}
   */
  var activateForm = function () {
    form.classList.remove('ad-form--disabled');
    formGroups.forEach(function (item) {
      item.disabled = false;
    });
    buttonSubmit.disabled = false;
    setMinPriceForPlaceType();
    addFormListeners();
  };

  /**
   * Деактивирует форму на карте
   * @return {void}
   */
  var deactivateForm = function () {
    form.classList.add('ad-form--disabled');
    formGroups.forEach(function (item) {
      item.disabled = true;
    });
    buttonSubmit.disabled = true;
    avatarPreviewImage.src = avatarDefaultSrc;
    photoBlock.innerHTML = '';
    setMinPriceForPlaceType();
    removeFormListeners();
  };

  /**
   * Синхронизирует значения в двух элементах формы
   * @param {HTMLDivElement} donorElement
   * @param {HTMLDivElement} acceptorElement
   * @return {void}
   */
  var synchronizeElementsValues = function (donorElement, acceptorElement) {
    acceptorElement.value = donorElement.value;
  };

  /**
   * Устанавливает минимально допустимое значение в "Цена за ночь, руб" и меняет placeholder
   * @return {void}
   */
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

  /**
   * Проверяет выходи ли длина заголовка объявления за пределы
   * @return {boolean} - результат проверки (true/false)
   */
  var isWrongTitleLength = function () {
    return formTitle.value.length < window.params.form.TITLE_MIN_LENGTH || formTitle.value.length > window.params.form.TITLE_MAX_LENGTH;
  };

  /**
   * Проверяет кол-во мест и кол-во комнат на крайние значения (параметр "Не для гостей")
   * @return {boolean} - результат проверки (true/false)
   */
  var isRoomsLimitOrGuestsLimit = function () {
    return Number(formCapacities.value) === 0 || Number(formRoomNumbers.value) === window.params.form.NO_GUESTS_LIMIT;
  };

  /**
   * Проверяет несовпадение кол-ва комнат с кол-вом гостей (параметр "Не для гостей")
   * @return {boolean} - результат проверки (true/false)
   */
  var isGuestsLimitWithoutRoomsLimit = function () {
    return Number(formCapacities.value) === 0 && Number(formRoomNumbers.value) !== window.params.form.NO_GUESTS_LIMIT;
  };

  /**
   * Проверяет несовпадение кол-ва гостей с кол-вом комнат (параметр "Не для гостей")
   * @return {boolean} - результат проверки (true/false)
   */
  var isRoomsLimitWithoutGuestsLimit = function () {
    return Number(formCapacities.value) !== 0 && Number(formRoomNumbers.value) === window.params.form.NO_GUESTS_LIMIT;
  };

  /**
   * Проверяет превышение кол-ва гостей на кол-вом комнат
   * @return {boolean} - результат проверки (true/false)
   */
  var isCapacityNotRelevantRooms = function () {
    return Number(formCapacities.value) > Number(formRoomNumbers.value);
  };

  /**
   * @return {void}
   */
  var validateTitleLength = function () {
    if (isWrongTitleLength()) {
      formTitle.setCustomValidity('Заголовок должен быть от 30 до 100 символов. Сейчас: ' + formTitle.value.length);
    } else {
      formTitle.setCustomValidity('');
    }
  };

  /**
   * @return {void}
   */
  var validateCapacityNoGuests = function () {
    if (isGuestsLimitWithoutRoomsLimit()) {
      formCapacities.setCustomValidity('Данный параметр доступен только для 100 комнат');
    } else if (isRoomsLimitWithoutGuestsLimit()) {
      formCapacities.setCustomValidity('Данное кол-во комнат доступно не для гостей');
    } else {
      formCapacities.setCustomValidity('');
    }
  };

  /**
   * @return {void}
   */
  var validateCapacityLimit = function () {
    if (isCapacityNotRelevantRooms()) {
      formCapacities.setCustomValidity('Кол-во мест должно быть не больше кол-ва комнат!');
    } else {
      formCapacities.setCustomValidity('');
    }
  };

  /**
   * @return {void}
   */
  var validateForm = function () {
    validateTitleLength();
    validateCapacityLimit();
    if (isRoomsLimitOrGuestsLimit()) {
      validateCapacityNoGuests();
    }
  };

  var formAddressFocusHandler = function () {
    formAddress.readOnly = true;
  };

  var formAddressBlurHandler = function () {
    formAddress.readOnly = false;
  };

  var formTimeInChangeHandler = function () {
    synchronizeElementsValues(formTimeIn, formTimeOut);
  };

  var formTimeOutChangeHandler = function () {
    synchronizeElementsValues(formTimeOut, formTimeIn);
  };

  var formElementChangeHandler = function () {
    validateForm();
  };

  var formPlaceTypeChangeHandler = function () {
    setMinPriceForPlaceType();
  };

  var avatarChooserChangeHandler = function () {
    window.uploadPhoto.single(avatarChooser, avatarPreviewImage);
  };

  var photoChooserChangeHandler = function () {
    window.uploadPhoto.multi(photoChooser, photoBlock);
  };

  var addFormListeners = function () {
    avatarChooser.addEventListener('change', avatarChooserChangeHandler);
    formTitle.addEventListener('change', formElementChangeHandler);
    formAddress.addEventListener('focus', formAddressFocusHandler);
    formAddress.addEventListener('blur', formAddressBlurHandler);
    formPlaceType.addEventListener('change', formPlaceTypeChangeHandler);
    formRoomNumbers.addEventListener('change', formElementChangeHandler);
    formCapacities.addEventListener('change', formElementChangeHandler);
    formTimeIn.addEventListener('change', formTimeInChangeHandler);
    formTimeOut.addEventListener('change', formTimeOutChangeHandler);
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
    formTimeIn.removeEventListener('change', formTimeInChangeHandler);
    formTimeOut.removeEventListener('change', formTimeOutChangeHandler);
    photoChooser.removeEventListener('change', photoChooserChangeHandler);
  };

  window.form = {
    activate: activateForm,
    deactivate: deactivateForm
  };
})();
