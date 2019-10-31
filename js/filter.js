'use strict';
(function () {
  var filter = document.querySelector('.map__filters');
  var filterGroups = filter.querySelectorAll('.map__filter');
  var filterFeaturesGroup = filter.querySelector('.map__features');
  var filterPlaceType = filter.querySelector('#housing-type');
  var filterRoomNumbers = filter.querySelector('#housing-rooms');
  var filterCapacities = filter.querySelector('#housing-guests');
  var filterPricePerNight = filter.querySelector('#housing-price');

  var FILTER_UNSORTED_VALUE = 'any';
  var PRICE_HIGHT_VALUE = 50000;
  var PRICE_MIDDLE_VALUE = 10000;

  /**
   * Скрывает фильтр на карте
   * @return {void}
   */
  var deactivateFilter = function () {
    filter.reset();
    filterFeaturesGroup.setAttribute('disabled', 'disabled');
    filterGroups.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  };

  /**
   * Показывает фильтр на карте
   * @return {void}
   */
  var activateFilter = function () {
    filterFeaturesGroup.removeAttribute('disabled');
    filterGroups.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  /**
   * Проверяет подходит ли данное предложению по типу размещения
   * @param {object} ad - данные предложения
   * @return {boolean} - результат проверки (true/false)
   */
  var isPlaceTypeSimilar = function (ad) {
    if (filterPlaceType.value !== FILTER_UNSORTED_VALUE) {
      return ad.offer.type === filterPlaceType.value;
    }
    return true;
  };

  /**
   * Проверяет подходит ли данное предложению по количеству комнат
   * @param {object} ad - данные предложения
   * @return {boolean} - результат проверки (true/false)
   */
  var isRoomNumbersSimilar = function (ad) {
    if (filterRoomNumbers.value !== FILTER_UNSORTED_VALUE) {
      return ad.offer.rooms === Number(filterRoomNumbers.value);
    }
    return true;
  };

  /**
   * Проверяет подходит ли данное предложению по количеству гостей
   * @param {object} ad - данные предложения
   * @return {boolean} - результат проверки (true/false)
   */
  var isCapacitiesSimilar = function (ad) {
    if (filterCapacities.value !== FILTER_UNSORTED_VALUE) {
      return ad.offer.guests === Number(filterCapacities.value);
    }
    return true;
  };

  /**
   * Проверяет подходит ли данное предложению по диапазону цен
   * @param {object} ad - данные предложения
   * @return {boolean} - результат проверки (true/false)
   */
  var isPricePerNightSimilar = function (ad) {
    if (filterPricePerNight.value !== FILTER_UNSORTED_VALUE) {

      var currentValue = '';

      if (ad.offer.price >= PRICE_HIGHT_VALUE) {
        currentValue = 'high';
      } else if (ad.offer.price >= PRICE_MIDDLE_VALUE) {
        currentValue = 'middle';
      } else {
        currentValue = 'low';
      }

      if (currentValue !== filterPricePerNight.value) {
        return false;
      }
    }
    return true;
  };

  /**
   * Проверяет подходит ли данное предложению по дополнительным параметрам (парковка, кухня и т.д.)
   * @param {object} ad - данные предложения
   * @return {boolean} - результат проверки (true/false)
   */
  var isFeaturesSimilar = function (ad) {
    var checkedFeatures = filter.querySelectorAll('.map__checkbox:checked');
    return Array.prototype.slice.call(checkedFeatures).every(function (item) {
      return ad.offer.features.indexOf(item.value) >= 0;
    });
  };

  /**
   * Проверяет подходит ли данное предложению по фильтру
   * @param {object} ad - данные предложения
   * @return {boolean} - результат проверки (true/false)
   */
  var isSimilar = function (ad) {
    return isPlaceTypeSimilar(ad) && isRoomNumbersSimilar(ad) && isCapacitiesSimilar(ad) && isPricePerNightSimilar(ad) && isFeaturesSimilar(ad);
  };

  window.filter = {
    activate: activateFilter,
    deactivate: deactivateFilter,
    isSimilar: isSimilar
  };
})();
