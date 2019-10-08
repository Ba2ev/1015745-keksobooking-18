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


var getRandomValue = function (minValue, maxValue) {
  var rand = Math.floor(minValue + Math.random() * (maxValue + 1 - minValue));
  return rand;
};

var getRandomLengthArray = function (baseArray) {
  var randomArray = [];
  var randomCount = getRandomValue(1, baseArray.length);
  var baseArrayCopy = baseArray.slice();
  for (var i = 0; i < randomCount; i++) {
    var randomElement = baseArrayCopy[getRandomValue(0, baseArrayCopy.length - 1)];
    baseArrayCopy.splice(baseArrayCopy.indexOf(randomElement), 1);
    randomArray.push(randomElement);
  }
  return randomArray;
};

var getArrayRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
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
      x: getRandomValue(window.params.pin.pinWidth, map.offsetWidth) - window.params.pin.pinWidth / 2,
      y: getRandomValue(window.params.pin.pinPositionTopLimit + window.params.pin.pinHeight, window.params.pin.pinPositionBottomLimit) - window.params.pin.pinHeight
    },
  };
  ad.offer = {
    title: window.data.titles[adArrayIndex],
    address: String(ad.location.x) + ', ' + String(ad.location.y),
    price: getRandomValue(window.params.form.priceMinValue, window.params.form.priceMaxValue),
    type: getArrayRandomElement(window.data.typesEN),
    rooms: getRandomValue(1, window.params.form.roomsMaxValue),
    guests: getRandomValue(1, window.params.form.guestsMaxValue),
    checkin: getArrayRandomElement(window.data.checkins),
    checkout: getArrayRandomElement(window.data.checkouts),
    features: getRandomLengthArray(window.data.features),
    description: getArrayRandomElement(window.data.descriptions),
    photos: getRandomLengthArray(window.data.photoes)
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

var createAdFeatureHTML = function (adFeature) {
  var adFeatureElement = document.createElement('li');
  adFeatureElement.className = 'popup__feature popup__feature--' + adFeature;
  return adFeatureElement;
};

var createAdPhotoHTML = function (adPhoto) {
  var adPhotoElement = document.createElement('img');
  adPhotoElement.src = adPhoto;
  adPhotoElement.className = 'popup__photo';
  adPhotoElement.width = window.params.ad.adPhotoWidth;
  adPhotoElement.height = window.params.ad.adPhotoHeight;
  adPhotoElement.alt = 'Фотография жилья';
  return adPhotoElement;
};

/**
 * Создаёт и возвращает DocumentFragment из массива элементов
 * @param {*[]} baseArray - исходный массив элементов
 * @param {callback} htmlCreateFunction - функция, ответственная за создание HTML-элемента
 * @return {HTMLDivElement} baseFragment - DocumentFragment на основе массива
 */
var createFragment = function (baseArray, htmlCreateFunction) {
  var baseFragment = document.createDocumentFragment();
  for (var i = 0; i < baseArray.length; i++) {
    baseFragment.appendChild(htmlCreateFunction(baseArray[i]));
  }
  return baseFragment;
};

/**
 * Создаёт карточку с подробными параметрами предалагаемого жилья
 * @param {Ad} ad - элемент с заданным набором параметров
 * @return {HTMLElement} - элемент с заданным набором параметров
 */
var createCardHTML = function (ad) {
  var adFeaturesFragment = createFragment(ad.offer.features, createAdFeatureHTML);
  var adPhotoesFragment = createFragment(ad.offer.photos, createAdPhotoHTML);

  mapCardTemplate.querySelector('.popup__avatar').src = ad.author.avatar;
  mapCardTemplate.querySelector('.popup__title').textContent = ad.offer.title;
  mapCardTemplate.querySelector('.popup__text--address').textContent = ad.offer.address;
  mapCardTemplate.querySelector('.popup__text--price').innerHTML = ad.offer.price + '&#x20bd;<span>/ночь</span>';
  mapCardTemplate.querySelector('.popup__type').textContent = window.data.typesRU[window.data.typesEN.indexOf(ad.offer.type)];
  mapCardTemplate.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  mapCardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  mapCardTemplate.querySelector('.popup__features').innerHTML = '';
  mapCardTemplate.querySelector('.popup__features').appendChild(adFeaturesFragment);
  mapCardTemplate.querySelector('.popup__description').textContent = ad.offer.description;
  mapCardTemplate.querySelector('.popup__photos').innerHTML = '';
  mapCardTemplate.querySelector('.popup__photos').appendChild(adPhotoesFragment);

  return mapCardTemplate;
};

var renderPins = function () {
  var fragment = createFragment(ads, createAdHTML);
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

/**
 * Синхронизирует значение свойства value у двух элементов формы
 * @param {HTMLElement} donorElement - элемент у которого берётся значение свойства value
 * @param {HTMLElement} acceptorElement - элемент которому присваивается значение свойства value donorElement
 */
var synchronizeElementsValues = function (donorElement, acceptorElement) {
  var donorValue = donorElement.value;
  acceptorElement.value = donorValue;
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
    createCardHTML(ads[currentIndex]);
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
  synchronizeElementsValues(noticeFormTimeIn, noticeFormTimeOut);
});

noticeFormTimeOut.addEventListener('change', function () {
  synchronizeElementsValues(noticeFormTimeOut, noticeFormTimeIn);
});

deactivatePage();
