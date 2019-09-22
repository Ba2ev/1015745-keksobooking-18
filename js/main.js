'use strict';
var AD_TITLES = ['Небольшое жильё', 'Моё пространство', 'Просторное жильё', 'Комфортное место', 'Жильё возле метро', 'Ночлег для пушественников', 'Тихое место', 'Жилье в романском стиле'];
var AD_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AD_CHEKINS = ['12:00', '13:00', '14:00'];
var AD_CHEKOUTS = ['12:00', '13:00', '14:00'];
var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AD_DESCRIPTIONS = ['Прекрасное место для семейного отдыха', 'Много места, чтобы устроить вечеринку!', 'Нет соседей поблизости', 'Хороший вариант для деловых поездок', 'Рядом есть супермаркет', 'Одиночное размещение не допускается', 'Есть персональный гараж', 'Допускается размещение с животными'];
var AD_PHOTOES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var MAP_WIDTH = 1200;
var MAP_MIN_HEIGHT = 130;
var MAP_MAX_HEIGHT = 630;
var AD_COUNT = 8;
var AD_PHOTO_WIDTH = 45;
var AD_PHOTO_HEIGHT = 40;
var PRICE_MIN_VALUE = 1000;
var PRICE_MAX_VALUE = 50000;
var ROOM_MAX_VALUE = 5;
var GUEST_MAX_VALUE = 8;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var map = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters-container');

var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var mapCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

/**
 * Активирует карту с метками
 */
var activateMap = function () {
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
 * Переводит с английского тип предлагаемого жилья
 * @param {string} adOfferType - тип предлагаемого жилья на английском
 * @return {string} translate -тип предлагаемого жилья на русском
 */
var translateOfferType = function (adOfferType) {
  var translate;
  switch (adOfferType) {
    case 'palace':
      translate = 'Дворец';
      break;
    case 'flat':
      translate = 'Квартира';
      break;
    case 'house':
      translate = 'Дом';
      break;
    case 'bungalo':
      translate = 'Бунгало';
      break;
  }
  return translate;
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
        x: getRandomValue(PIN_WIDTH, MAP_WIDTH) - PIN_WIDTH / 2,
        y: getRandomValue(MAP_MIN_HEIGHT, MAP_MAX_HEIGHT) - PIN_HEIGHT
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
 * Создаёт и возвращает элемент с заданным набором параметров
 * @param {ad} ad - элемент с заданным набором параметров
 * @return {HTMLDivElement} placeElement - HTML-разметка для элемента с заданным набором параметров
 */
var createAdHTML = function (ad) {
  var adElement = mapPinTemplate.cloneNode(true);

  adElement.style = 'left: ' + ad.location.x + 'px; top: ' + ad.location.y + 'px';
  adElement.querySelector('IMG').src = ad.author.avatar;
  adElement.querySelector('IMG').alt = ad.offer.title;

  return adElement;
};

/**
 * Создаёт и возвращает элемент списка удобств
 * @param {string} adFeature - название удобства
 * @return {HTMLUListElement} - элемент списка удобств
 */
var createAdFeatureHTML = function (adFeature) {
  var adFeatureElement = document.createElement('li');
  adFeatureElement.className = 'popup__feature popup__feature--' + adFeature;
  return adFeatureElement;
};

/**
 * Создаёт и возвращает фотографию предлагаемого жилья
 * @param {string} adPhoto - адрес изображения предлагаемого жилья
 * @return {HTMLImageElement} - изображение предлагаемого жилья
 */
var createAdPhotoesHTML = function (adPhoto) {
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
 * @param {function} htmlCreateFunction - функция, ответственная за создание HTML-элемента
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
 * @param {ad} ad - элемент с заданным набором параметров
 * @return {HTMLElement} - элемент <article> с заданным набором параметров
 */
var createCardHTML = function (ad) {
  var adFeaturesFragment = createFragment(ad.offer.features, createAdFeatureHTML);
  var adPhotoesFragment = createFragment(ad.offer.photos, createAdPhotoesHTML);

  mapCardTemplate.querySelector('.popup__avatar').src = ad.author.avatar;
  mapCardTemplate.querySelector('.popup__title').textContent = ad.offer.title;
  mapCardTemplate.querySelector('.popup__text--address').textContent = ad.offer.address;
  mapCardTemplate.querySelector('.popup__text--price').innerHTML = ad.offer.price + '&#x20bd;<span>/ночь</span>';
  mapCardTemplate.querySelector('.popup__type').textContent = translateOfferType(ad.offer.type);
  mapCardTemplate.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  mapCardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  mapCardTemplate.querySelector('.popup__features').innerHTML = '';
  mapCardTemplate.querySelector('.popup__features').appendChild(adFeaturesFragment);
  mapCardTemplate.querySelector('.popup__description').textContent = ad.offer.description;
  mapCardTemplate.querySelector('.popup__photos').innerHTML = '';
  mapCardTemplate.querySelector('.popup__photos').appendChild(adPhotoesFragment);

  return mapCardTemplate;
};

activateMap();

var ads = createAds(AD_COUNT);

var fragment = createFragment(ads, createAdHTML);

mapPins.appendChild(fragment);

createCardHTML(ads[0]);

mapFilters.before(mapCardTemplate);
