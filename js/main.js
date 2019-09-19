'use strict';
var MAP_WIDTH = 1200;
var MAP_MIN_HEIGHT = 130;
var MAP_MAX_HEIGHT = 630;
var PIN_WIDTH = 62;
var PIN_HEIGHT = 84;
var PLACE_COUNT = 8;
var PRICE_MIN_VALUE = 1000;
var PRICE_MAX_VALUE = 100000;
var ROOM_MAX_VALUE = 5;
var GUEST_MAX_VALUE = 8;

var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

/**
 * Активирует карту с метками
 * @param {string} mapIndicator - индикатор элемента карты
 */
var activeMap = function (mapIndicator) {
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
 * @param {object[]} baseArray - заданный массив
 * @return {object[]} randomArray - массив случайной длины из заданного массива
 */
var createRandomArray = function (baseArray) {
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
 * Создаёт и возвращает массив элементов(магов) указанной длины
 * @param {number} placesCount - кол-во элементов в массиве
 * @return {object[]} placesNear - массив элементов (магов)
 */
var createNearPlaces = function (placesCount) {

  var PLACE_TITLES = ['Little place', 'My place', 'Big place', 'Comfortable place', 'Place is near subway', 'Place for travellers', 'Quite place', 'Place in roman style'];
  var PLACE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var PLACE_CHEKINS = ['12:00', '13:00', '14:00'];
  var PLACE_CHEKOUTS = ['12:00', '13:00', '14:00'];
  var PLACE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PLACE_DESCRIPTIONS = ['Excellent place for family', 'Big place for parties', 'Place without neighbours', 'Good variant for businessmans', 'Supermarket is near', 'Couples only', 'Place with personal garage', 'Pets allowed'];
  var PLACE_PHOTOES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var placesNear = [];
  for (var i = 0; i < placesCount; i++) {
    var placeNear = {};
    placeNear.author = {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png'
    };
    placeNear.location = {
      'x': getRandomValue(PIN_WIDTH, MAP_WIDTH) - PIN_WIDTH / 2,
      'y': getRandomValue(MAP_MIN_HEIGHT + PIN_HEIGHT, MAP_MAX_HEIGHT) - PIN_HEIGHT
    };
    placeNear.offer = {
      'title': PLACE_TITLES[i],
      'address': String(placeNear.location.x) + ', ' + String(placeNear.location.y),
      'price': getRandomValue(PRICE_MIN_VALUE, PRICE_MAX_VALUE),
      'type': PLACE_TYPES[getRandomValue(0, PLACE_TYPES.length - 1)],
      'rooms': getRandomValue(1, ROOM_MAX_VALUE),
      'guests': getRandomValue(1, GUEST_MAX_VALUE),
      'checkin': PLACE_CHEKINS[getRandomValue(0, PLACE_CHEKINS.length - 1)],
      'checkout': PLACE_CHEKOUTS[getRandomValue(0, PLACE_CHEKOUTS.length - 1)],
      'features': createRandomArray(PLACE_FEATURES),
      'description': PLACE_DESCRIPTIONS[getRandomValue(0, PLACE_DESCRIPTIONS.length - 1)],
      'photos': createRandomArray(PLACE_PHOTOES)
    };
    placesNear.push(placeNear);
  }
  return placesNear;
};

/**
 * Создаёт и возвращает элемент с заданным набором параметров
 * @param {object} place - элемент с заданным набором параметров
 * @return {HTMLDivElement} placeElement - HTML-разметка для элемента с заданным набором параметров
 */
var createPlace = function (place) {
  var placeElement = mapPinTemplate.cloneNode(true);

  placeElement.style = 'left: ' + place.location.x + 'px; top: ' + place.location.y + 'px';
  placeElement.querySelector('IMG').src = place.author.avatar;
  placeElement.querySelector('IMG').alt = place.offer.title;

  return placeElement;
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

activeMap('.map');

var placesNear = createNearPlaces(PLACE_COUNT);

var fragment = createFragment(placesNear);

mapPins.appendChild(fragment);
