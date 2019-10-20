'use strict';
(function () {
  var mapFilter = document.querySelector('.map__filters');
  var unsortedValue = 'any';

  var onPinClick = function (evt) {
    var mapCard = document.querySelector('.map__card.popup');
    var mapPins = document.querySelector('.map__pins');
    var target = evt.target.closest('.map__pin:not(.map__pin--main)');

    if (target) {
      var adPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      var mapAdPins = [];

      for (var i = 0; i < adPins.length; i++) {
        mapAdPins.push(adPins[i]);
      }

      var currentIndex = mapAdPins.indexOf(target);
      window.card.renderCard(window.data[currentIndex]);

      if (mapCard) {
        window.card.closeAdCard();
      }
      window.card.openAdCard();
    }
  };

  var isPlaceTypeSimilar = function (ad) {
    var mapFilterPlaceType = mapFilter.querySelector('#housing-type');
    if (mapFilterPlaceType.value !== unsortedValue) {
      return ad.offer.type === mapFilterPlaceType.value;
    }
    return true;
  };

  var isRoomNumbersSimilar = function (ad) {
    var mapFilterRoomNumbers = mapFilter.querySelector('#housing-rooms');
    if (mapFilterRoomNumbers.value !== unsortedValue) {
      return ad.offer.rooms === Number(mapFilterRoomNumbers.value);
    }
    return true;
  };

  var isCapacitiesSimilar = function (ad) {
    var mapFilterCapacities = mapFilter.querySelector('#housing-guests');
    if (mapFilterCapacities.value !== unsortedValue) {
      return ad.offer.guests === Number(mapFilterCapacities.value);
    }
    return true;
  };

  var isPricePerNightSimilar = function (ad) {
    var mapFilterPricePerNight = mapFilter.querySelector('#housing-price');
    if (mapFilterPricePerNight.value !== unsortedValue) {

      var currentValue = '';

      if (ad.offer.price >= 50000) {
        currentValue = 'high';
      } else if (ad.offer.price >= 10000) {
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
    for (var i = 0; i < checkedFeatures.length; i++) {
      if (ad.offer.features.indexOf(checkedFeatures[i].value) < 0) {
        return false;
      }
    }
    return true;
  };

  var isSimilar = function (ad) {
    return isPlaceTypeSimilar(ad) && isRoomNumbersSimilar(ad) && isCapacitiesSimilar(ad) && isPricePerNightSimilar(ad) && isFeaturesSimilar(ad);
  };

  var sortPins = function (pins) {

    if (window.mapFilter.isMapFilterDefaultParameters()) {
      window.data = pins;
      return pins;
    } else {
      var filteredPins = pins.slice().filter(isSimilar);
      window.data = filteredPins;
      return filteredPins;
    }
  };

  var createAdHtml = function (ad) {
    var mapPinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');
    var adElement = mapPinTemplate.cloneNode(true);

    adElement.style = 'left: ' + ad.location.x + 'px; top: ' + ad.location.y + 'px';
    adElement.querySelector('IMG').src = ad.author.avatar;
    adElement.querySelector('IMG').alt = ad.offer.title;

    return adElement;
  };

  var createPins = function (pins) {
    var mapPins = document.querySelector('.map__pins');
    var fragment = window.util.createFragment(sortPins(pins), createAdHtml, window.params.pin.maxCount);
    mapPins.appendChild(fragment);
    window.mapFilter.activateMapFilter();
  };

  var renderPins = function () {
    window.backend.load(createPins, window.showError);
  };

  var clearPins = function () {
    var mapPins = document.querySelector('.map__pins');
    var renderedPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < renderedPins.length; i++) {
      renderedPins[i].remove();
    }
  };

  window.pin = {
    renderPins: renderPins,
    clearPins: clearPins,
    onPinClick: onPinClick
  };
})();
