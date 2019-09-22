'use strict';
var AD_TITLES = ['Little place', 'My place', 'Big place', 'Comfortable place', 'Place is near subway', 'Place for travellers', 'Quite place', 'Place in roman style'];
var AD_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AD_CHEKINS = ['12:00', '13:00', '14:00'];
var AD_CHEKOUTS = ['12:00', '13:00', '14:00'];
var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AD_DESCRIPTIONS = ['Excellent place for family', 'Big place for parties', 'Place without neighbours', 'Good variant for businessmans', 'Supermarket is near', 'Couples only', 'Place with personal garage', 'Pets allowed'];
var AD_PHOTOES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var MAP_WIDTH = 1200;
var MAP_MIN_HEIGHT = 130;
var MAP_MAX_HEIGHT = 630;
var AD_COUNT = 8;
var PRICE_MIN_VALUE = 1000;
var PRICE_MAX_VALUE = 100000;
var ROOM_MAX_VALUE = 5;
var GUEST_MAX_VALUE = 8;

var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var pinWidth = document.querySelector('.map__pin').offsetWidth;
var pinHeight = document.querySelector('.map__pin').offsetHeight;

/**
 * Активирует карту с метками
 * @param {string} mapIndicator - индикатор элемента карты
 */
var activateMap = function (mapIndicator) {
  var map = document.querySelector(mapIndicator);
  map.classList.remove('map--faded');
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
 * Создаёт и возвращает массив элементов (мест) указанной длины
 * @param {number} adsCount - кол-во элементов в массиве
 * @return {object[]} ads - массив элементов (мест)
 */
var createAds = function (adsCount) {
  var ads = [];
  for (var i = 0; i < adsCount; i++) {
    var ad = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      location: {
        x: getRandomValue(pinWidth, MAP_WIDTH) - pinWidth / 2,
        y: getRandomValue(MAP_MIN_HEIGHT + pinHeight, MAP_MAX_HEIGHT) - pinHeight
      },
    };
    ad.offer = {
      title: AD_TITLES[i],
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
    ads.push(ad);
  }
  return ads;
};

/**
 * Создаёт и возвращает элемент с заданным набором параметров
 * @param {object} ad - элемент с заданным набором параметров
 * @return {HTMLDivElement} placeElement - HTML-разметка для элемента с заданным набором параметров
 */
var createPlace = function (ad) {
  var adElement = mapPinTemplate.cloneNode(true);

  adElement.style = 'left: ' + ad.location.x + 'px; top: ' + ad.location.y + 'px';
  adElement.querySelector('IMG').src = ad.author.avatar;
  adElement.querySelector('IMG').alt = ad.offer.title;

  return adElement;
};

/**
 * Создаёт и возвращает DocumentFragment из массива элементов
 * @param {object[]} baseArray - исходный массив элементов
 * @return {HTMLDivElement} baseFragment - DocumentFragment на основе массива
 */
var createFragment = function (baseArray) {
  var baseFragment = document.createDocumentFragment();
  for (var i = 0; i < baseArray.length; i++) {
    baseFragment.appendChild(createPlace(baseArray[i]));
  }
  return baseFragment;
};

activateMap('.map');

var ads = createAds(AD_COUNT);

var fragment = createFragment(ads);

mapPins.appendChild(fragment);
