'use strict';
(function () {
  var mapPins = document.querySelector('.map__pins');
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterPlaceType = mapFilter.querySelector('#housing-type');
  var mapFilterRoomNumbers = mapFilter.querySelector('#housing-rooms');
  var mapFilterCapacities = mapFilter.querySelector('#housing-guests');
  var mapFilterPricePerNight = mapFilter.querySelector('#housing-price');
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var UNSORTED_VALUE = 'any';
  var PRICE_HIGHT_VALUE = 50000;
  var PRICE_MIDDLE_VALUE = 10000;

  var onPinClick = function (evt) {
    var mapCard = document.querySelector('.map__card.popup');
    var target = evt.target.closest('.map__pin:not(.map__pin--main)');

    if (target) {
      var adPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      var currentIndex = Array.prototype.slice.call(adPins).indexOf(target);
      window.card.render(window.data[currentIndex]);

      if (mapCard) {
        window.card.close();
      }
      window.card.open();
    }
  };

  var isPlaceTypeSimilar = function (ad) {
    if (mapFilterPlaceType.value !== UNSORTED_VALUE) {
      return ad.offer.type === mapFilterPlaceType.value;
    }
    return true;
  };

  var isRoomNumbersSimilar = function (ad) {
    if (mapFilterRoomNumbers.value !== UNSORTED_VALUE) {
      return ad.offer.rooms === Number(mapFilterRoomNumbers.value);
    }
    return true;
  };

  var isCapacitiesSimilar = function (ad) {
    if (mapFilterCapacities.value !== UNSORTED_VALUE) {
      return ad.offer.guests === Number(mapFilterCapacities.value);
    }
    return true;
  };

  var isPricePerNightSimilar = function (ad) {
    if (mapFilterPricePerNight.value !== UNSORTED_VALUE) {

      var currentValue = '';

      if (ad.offer.price >= PRICE_HIGHT_VALUE) {
        currentValue = 'high';
      } else if (ad.offer.price >= PRICE_MIDDLE_VALUE) {
        currentValue = 'middle';
      } else {
        currentValue = 'low';
      }

      if (currentValue !== mapFilterPricePerNight.value) {
        return false;
      }
    }
    return true;
  };

  var isFeaturesSimilar = function (ad) {
    var checkedFeatures = window.mapFilter.getCheckedFeatures();
    return checkedFeatures.every(function (item) {
      return ad.offer.features.indexOf(item.value) >= 0;
    });
  };

  var isSimilar = function (ad) {
    return isPlaceTypeSimilar(ad) && isRoomNumbersSimilar(ad) && isCapacitiesSimilar(ad) && isPricePerNightSimilar(ad) && isFeaturesSimilar(ad);
  };

  var sortPins = function (pins) {

    if (window.mapFilter.isDefaultParameters()) {
      window.data = pins;
      return pins;
    } else {
      var filteredPins = pins.slice().filter(isSimilar);
      window.data = filteredPins;
      return filteredPins;
    }
  };

  var createAdHtml = function (ad) {
    var adElement = mapPinTemplate.cloneNode(true);
    adElement.style = 'left: ' + ad.location.x + 'px; top: ' + ad.location.y + 'px';
    adElement.querySelector('IMG').src = ad.author.avatar;
    adElement.querySelector('IMG').alt = ad.offer.title;

    return adElement;
  };

  var createPins = function (pins) {
    var fragment = window.util.createFragment(sortPins(pins), createAdHtml, window.params.pin.MAX_COUNT);
    mapPins.appendChild(fragment);
    window.mapFilter.activate();
  };

  var renderPins = function () {
    window.backend.load(createPins, window.showError);

    mapPins.addEventListener('click', onPinClick);
  };

  var clearPins = function () {

    var renderedPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    mapPins.removeEventListener('click', onPinClick);

    renderedPins.forEach(function (item) {
      item.remove();
    });
  };

  window.pin = {
    render: renderPins,
    clear: clearPins
  };
})();
