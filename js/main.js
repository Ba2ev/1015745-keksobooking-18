'use strict';
var AD_TITLES = ['Небольшое жильё', 'Моё пространство', 'Просторное жильё', 'Комфортное место', 'Жильё возле метро', 'Ночлег для пушественников', 'Тихое место', 'Жилье в романском стиле'];
var AD_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AD_CHEKINS = ['12:00', '13:00', '14:00'];
var AD_CHEKOUTS = ['12:00', '13:00', '14:00'];
var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AD_DESCRIPTIONS = ['Прекрасное место для семейного отдыха', 'Много места, чтобы устроить вечеринку!', 'Нет соседей поблизости', 'Хороший вариант для деловых поездок', 'Рядом есть супермаркет', 'Одиночное размещение не допускается', 'Есть персональный гараж', 'Допускается размещение с животными'];
var AD_PHOTOES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var AD_OFFER_TRANSLATION = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var AD_COUNT = 8;
var AD_PHOTO_WIDTH = 45;
var AD_PHOTO_HEIGHT = 40;
var PRICE_MIN_VALUE = 1000;
var PRICE_MAX_VALUE = 50000;
var ROOM_MAX_VALUE = 5;
var GUEST_MAX_VALUE = 8;

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_SPKIKE_HEIGHT = 22;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_TOP_POSITION_LIMIT = 130;
var PIN_BOTTOM_POSITION_LIMIT = 630;

var BUNGALO_MIN_PRICE = 0;
var FLAT_MIN_PRICE = 1000;
var HOUSE_MIN_PRICE = 5000;
var PALACE_MIN_PRICE = 10000;

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

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
  var MainPinX = Math.floor(mapMainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
  var MainPinY = Math.floor(mapMainPin.offsetTop + MAIN_PIN_HEIGHT + MAIN_PIN_SPKIKE_HEIGHT);
  if (noticeForm.classList.contains('ad-form--disabled')) {
    MainPinY = Math.floor(mapMainPin.offsetTop + MAIN_PIN_HEIGHT / 2);
  }
  noticeFormAdress.value = MainPinX + ', ' + MainPinY;
};

/**
 * Возвращает случайное целое число в диапазоне
 * @param {number} minValue - минимальное значение
 * @param {number} maxValue - максимальное значение
 * @return {number} rand - случайное целое число из диапазона
 */
var getRandomValue = function (minValue, maxValue) {
  var rand = Math.floor(minValue + Math.random() * (maxValue + 1 - minValue));
  return rand;
};

/**
 * Создаёт и возвращает массив элементов случайной длины из заданного массива
 * @param {*[]} baseArray - заданный массив
 * @return {*[]} randomArray - массив случайной длины из заданного массива
 */
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
      x: getRandomValue(PIN_WIDTH, map.offsetWidth) - PIN_WIDTH / 2,
      y: getRandomValue(PIN_TOP_POSITION_LIMIT + PIN_HEIGHT, PIN_BOTTOM_POSITION_LIMIT) - PIN_HEIGHT
    },
  };
  ad.offer = {
    title: AD_TITLES[adArrayIndex],
    address: String(ad.location.x) + ', ' + String(ad.location.y),
    price: getRandomValue(PRICE_MIN_VALUE, PRICE_MAX_VALUE),
    type: AD_TYPES[getRandomValue(0, AD_TYPES.length - 1)],
    rooms: getRandomValue(1, ROOM_MAX_VALUE),
    guests: getRandomValue(1, GUEST_MAX_VALUE),
    checkin: AD_CHEKINS[getRandomValue(0, AD_CHEKINS.length - 1)],
    checkout: AD_CHEKOUTS[getRandomValue(0, AD_CHEKOUTS.length - 1)],
    features: getRandomLengthArray(AD_FEATURES),
    description: AD_DESCRIPTIONS[getRandomValue(0, AD_DESCRIPTIONS.length - 1)],
    photos: getRandomLengthArray(AD_PHOTOES)
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
  adPhotoElement.width = AD_PHOTO_WIDTH;
  adPhotoElement.height = AD_PHOTO_HEIGHT;
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
  mapCardTemplate.querySelector('.popup__type').textContent = AD_OFFER_TRANSLATION[ad.offer.type];
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
      noticeFormPricePerNight.min = FLAT_MIN_PRICE;
      break;
    case 'house':
      noticeFormPricePerNight.min = HOUSE_MIN_PRICE;
      break;
    case 'palace':
      noticeFormPricePerNight.min = PALACE_MIN_PRICE;
      break;
    case 'bungalo':
      noticeFormPricePerNight.min = BUNGALO_MIN_PRICE;
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

var onAdCartEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeAdCart();
  }
};

var openAdCart = function () {
  mapCardTemplate.classList.remove('hidden');
  document.addEventListener('keydown', onAdCartEscPress);
};

var closeAdCart = function () {
  mapCardTemplate.classList.add('hidden');
  document.removeEventListener('keydown', onAdCartEscPress);
};

var onMainPinEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
  }
};

var onPinClick = function (evt) {
  var target = evt.target.closest('.map__pin');

  if (!target.classList.contains('map__pin--main')) {
    var mapInnerPins = [];
    for (var i = 0; i < mapPins.children.length; i++) {
      mapInnerPins.push(mapPins.children[i]);
    }
    var currentIndex = mapInnerPins.indexOf(target) - 2;
    createCardHTML(ads[currentIndex]);
    mapFilter.before(mapCardTemplate);
    openAdCart();
  }
};

var validateMainPinCoordinates = function () {
  var mainPinCoordinates = noticeFormAdress.value.split(', ');
  var mainPinX = mainPinCoordinates[0];
  var mainPinY = mainPinCoordinates[1];

  if (mainPinX < 0 || mainPinX > map.offsetWidth || mainPinY < PIN_TOP_POSITION_LIMIT || mainPinY > PIN_BOTTOM_POSITION_LIMIT) {
    noticeFormAdress.setCustomValidity('Координаты метки находятся вне допустимой области: ' + 0 + ' <= X <= ' + map.offsetWidth + ', ' + PIN_TOP_POSITION_LIMIT + ' <= Y <= ' + PIN_BOTTOM_POSITION_LIMIT);
  }
};

var validateCapacityNoGuests = function () {

  if (Number(noticeFormRoomNumbers.value) === 100 && Number(noticeFormCapacities.value) !== 0) {
    noticeFormCapacities.setCustomValidity('Данный параметр доступен не для гостей');
  } else {
    noticeFormCapacities.setCustomValidity('');
  }
};

var validateCapacityLimit = function () {

  if (Number(noticeFormRoomNumbers.value) < Number(noticeFormCapacities.value)) {
    noticeFormCapacities.setCustomValidity('Кол-во мест должно быть не больше кол-ва комнат!');
  } else {
    noticeFormCapacities.setCustomValidity('');
  }
};

var validateNoticeForm = function () {

  if (Number(noticeFormRoomNumbers.value) === 100 || Number(noticeFormCapacities.value) === 0) {
    validateCapacityNoGuests();
  } else {
    validateCapacityLimit();
  }
};

var ads = createAds(AD_COUNT);

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

mapMainPin.addEventListener('keydown', function (evt) {
  if (map.classList.contains('map--faded')) {
    onMainPinEnterPress(evt);
  }
});

mapPins.addEventListener('click', function (evt) {
  onPinClick(evt);
});

mapCardTemplateClose.addEventListener('click', closeAdCart);

noticeFormAdress.addEventListener('keydown', function () {
  noticeFormAdress.readOnly = true;
});

noticeFormAdress.addEventListener('blur', function () {
  noticeFormAdress.readOnly = false;
});

noticeFormPlaceType.addEventListener('change', setMinPriceForPlaceType);

noticeFormRoomNumbers.addEventListener('change', validateNoticeForm);

noticeFormTimeIn.addEventListener('change', function () {
  synchronizeElementsValues(noticeFormTimeIn, noticeFormTimeOut);
});

noticeFormTimeOut.addEventListener('change', function () {
  synchronizeElementsValues(noticeFormTimeOut, noticeFormTimeIn);
});

deactivatePage();
