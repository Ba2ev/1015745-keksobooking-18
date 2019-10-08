'use strict';

var map = document.querySelector('.map');
var mapFilter = document.querySelector('.map__filters-container');
var mapFilterGroups = mapFilter.querySelectorAll('.map__filter');
var mapFilterFeaturesGroup = mapFilter.querySelector('.map__features');

var mapMainPin = document.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var mapCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var mapCardTemplateClose = mapCardTemplate.querySelector('.popup__close');

var noticeForm = document.querySelector('.ad-form');
var noticeFormGroups = noticeForm.querySelectorAll('fieldset');
var noticeFormAdress = noticeForm.querySelector('#address');
var noticeFormPlaceType = noticeForm.querySelector('#type');
var noticeFormPricePerNight = noticeForm.querySelector('#price');
var noticeFormTimeIn = noticeForm.querySelector('#timein');
var noticeFormTimeOut = noticeForm.querySelector('#timeout');
var noticeFormRoomNumbers = noticeForm.querySelector('#room_number');
var noticeFormCapacities = noticeForm.querySelector('#capacity');

var deactivatePage = function () {
  deactivateMap();
  deactivateNoticeForm();
};

var deactivateMap = function () {
  map.classList.add('map--faded');
  for (var i = 0; i < mapFilterGroups.length; i++) {
    mapFilterGroups[i].setAttribute('disabled', 'disabled');
  }
};

var deactivateNoticeForm = function () {
  noticeForm.classList.add('ad-form--disabled');
  mapFilterFeaturesGroup.setAttribute('disabled', 'disabled');
  for (var i = 0; i < noticeFormGroups.length; i++) {
    noticeFormGroups[i].setAttribute('disabled', 'disabled');
  }
};

var activatePage = function () {
  activateMap();
  activateNoticeForm();
  renderPins();
};

var activateMap = function () {
  map.classList.remove('map--faded');
  for (var i = 0; i < mapFilterGroups.length; i++) {
    mapFilterGroups[i].removeAttribute('disabled');
  }
};

var activateNoticeForm = function () {
  noticeForm.classList.remove('ad-form--disabled');
  mapFilterFeaturesGroup.removeAttribute('disabled');
  for (var i = 0; i < noticeFormGroups.length; i++) {
    noticeFormGroups[i].removeAttribute('disabled');
  }
};

var setMainPinCoordinates = function () {
  var mainPinX = mapMainPin.style.left;
  var mainPinY = mapMainPin.style.top;
  var mainPinXValue = mainPinX.substr(0, mainPinX.length - 2);
  var mainPinYValue = mainPinY.substr(0, mainPinY.length - 2);
  var mainPinSpikeX = Math.floor(Number(mainPinXValue) + window.params.mainPin.mainPinWidth / 2);
  var mainPinSpikeY = Math.floor(Number(mainPinYValue) + window.params.mainPin.mainPinHeight + window.params.mainPin.mainPinSpikeHeight);

  if (noticeForm.classList.contains('ad-form--disabled')) {
    mainPinSpikeY = Math.floor(mainPinYValue + window.params.mainPin.mainPinHeight / 2);
  }
  noticeFormAdress.value = mainPinSpikeX + ', ' + mainPinSpikeY;
};

/**
 * @typedef {{author: {
 *              avatar: string
 *            },
 *            location: {
 *              x: number,
 *              y: number
 *            },
 *            offer: {
 *              title: number,
 *              address: string,
 *              price: number,
 *              type: string,
 *              rooms: number,
 *              guests: number,
 *              checkin: string,
 *              checkout: string,
 *              features: object[],
 *              description: string,
 *              photos: object[]
 *            }}} Ad
 */

/**
 * Создаёт и возращает объект (место)
 * @param {number} adArrayIndex - номер элемента в создаваемом массиве функции createAds
 * @return {Ad} ad - объект (место)
 */
var createAd = function (adArrayIndex) {
  var ad = {
    author: {
      avatar: 'img/avatars/user0' + (adArrayIndex + 1) + '.png'
    },
    location: {
      x: window.util.getRandomValue(window.params.pin.pinWidth, map.offsetWidth) - window.params.pin.pinWidth / 2,
      y: window.util.getRandomValue(window.params.pin.pinPositionTopLimit + window.params.pin.pinHeight, window.params.pin.pinPositionBottomLimit) - window.params.pin.pinHeight
    },
  };
  ad.offer = {
    title: window.data.titles[adArrayIndex],
    address: String(ad.location.x) + ', ' + String(ad.location.y),
    price: window.util.getRandomValue(window.params.form.priceMinValue, window.params.form.priceMaxValue),
    type: window.util.getArrayRandomElement(window.data.typesEN),
    rooms: window.util.getRandomValue(1, window.params.form.roomsMaxValue),
    guests: window.util.getRandomValue(1, window.params.form.guestsMaxValue),
    checkin: window.util.getArrayRandomElement(window.data.checkins),
    checkout: window.util.getArrayRandomElement(window.data.checkouts),
    features: window.util.getRandomLengthArray(window.data.features),
    description: window.util.getArrayRandomElement(window.data.descriptions),
    photos: window.util.getRandomLengthArray(window.data.photoes)
  };
  return ad;
};

/**
 * Создаёт и возвращает массив элементов (мест) указанной длины
 * @param {number} adCount - кол-во элементов в массиве
 * @return {Ad[]} ads - массив элементов (мест)
 */
var createAds = function (adCount) {
  var ads = [];
  for (var i = 0; i < adCount; i++) {
    ads.push(createAd(i));
  }
  return ads;
};

var createAdHTML = function (ad) {
  var adElement = mapPinTemplate.cloneNode(true);

  adElement.style = 'left: ' + ad.location.x + 'px; top: ' + ad.location.y + 'px';
  adElement.querySelector('IMG').src = ad.author.avatar;
  adElement.querySelector('IMG').alt = ad.offer.title;

  return adElement;
};

var renderPins = function () {
  var fragment = window.util.createFragment(ads, createAdHTML);
  mapPins.appendChild(fragment);
};

var dragDrobMainPin = function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mapMainPin.style.top = (mapMainPin.offsetTop - shift.y) + 'px';

    mapMainPin.style.left = (mapMainPin.offsetLeft - shift.x) + 'px';

    setMainPinCoordinates();

  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (defaultEvt) {
        defaultEvt.preventDefault();
        mapMainPin.removeEventListener('click', onClickPreventDefault);
      };
      mapMainPin.addEventListener('click', onClickPreventDefault);
    }
    validateMainPinCoordinates();
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
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

var onAdCardEscPress = function (evt) {
  if (evt.keyCode === window.params.keyCode.esc) {
    closeAdCard();
  }
};

var openAdCard = function () {
  mapCardTemplate.classList.remove('hidden');
  document.addEventListener('keydown', onAdCardEscPress);
};

var closeAdCard = function () {
  mapCardTemplate.classList.add('hidden');
  document.removeEventListener('keydown', onAdCardEscPress);
};

var onPinClick = function (evt) {
  var target = evt.target.closest('.map__pin:not(.map__pin--main)');

  if (target) {
    var adPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    var mapAdPins = [];

    for (var i = 0; i < adPins.length; i++) {
      mapAdPins.push(adPins[i]);
    }

    var currentIndex = mapAdPins.indexOf(target);
    window.createCardHTML(ads[currentIndex]);
    mapFilter.before(mapCardTemplate);
    openAdCard();
  }
};

var validateMainPinCoordinates = function () {
  var mainPinCoordinates = noticeFormAdress.value.split(', ');
  var mainPinX = mainPinCoordinates[0];
  var mainPinY = mainPinCoordinates[1];

  if (mainPinX < 0 || mainPinX > map.offsetWidth || mainPinY < window.params.pin.pinPositionTopLimit || mainPinY > window.params.pin.pinPositionBottomLimit) {
    noticeFormAdress.setCustomValidity('Координаты метки находятся вне допустимой области: ' + 0 + ' <= X <= ' + map.offsetWidth + ', ' + window.params.pin.pinPositionTopLimit + ' <= Y <= ' + window.params.pin.pinPositionBottomLimit);
  } else {
    noticeFormAdress.setCustomValidity('');
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
  validateCapacityLimit();
  if (Number(noticeFormCapacities.value) === 0 || Number(noticeFormRoomNumbers.value) === 100) {
    validateCapacityNoGuests();
  }
};

var ads = createAds(window.params.ad.adCount);

window.addEventListener('load', setMainPinCoordinates);

window.addEventListener('load', setMinPriceForPlaceType);

mapMainPin.addEventListener('mousedown', function (evt) {
  dragDrobMainPin(evt);
});

mapMainPin.addEventListener('mousedown', function () {
  if (map.classList.contains('map--faded')) {
    activatePage();
  }
});

mapMainPin.addEventListener('mousedown', setMainPinCoordinates);

mapPins.addEventListener('click', function (evt) {
  onPinClick(evt);
});

mapCardTemplateClose.addEventListener('click', closeAdCard);

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

deactivatePage();
