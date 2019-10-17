'use strict';
(function () {
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

  var isSimilar = function (ad) {
    var mapFilter = document.querySelector('.map__filters');
    var mapFilterPlaceType = mapFilter.querySelector('#housing-type');
    var mapFilterPricePerNight = mapFilter.querySelector('#housing-price');
    var mapFilterRoomNumbers = mapFilter.querySelector('#housing-rooms');
    var mapFilterCapacities = mapFilter.querySelector('#housing-guests');
    var unsortedValue = 'any';
    var checkedFeatures = window.mapFilter.getCheckedFeatures();

    if (mapFilterPlaceType.value !== unsortedValue && ad.offer.type !== mapFilterPlaceType.value) {
      return false;
    }

    if (mapFilterRoomNumbers.value !== unsortedValue && ad.offer.rooms !== Number(mapFilterRoomNumbers.value)) {
      return false;
    }

    if (mapFilterCapacities.value !== unsortedValue && ad.offer.guests !== Number(mapFilterCapacities.value)) {
      return false;
    }

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

    for (var i = 0; i < checkedFeatures.length; i++) {
      if (ad.offer.features.indexOf(checkedFeatures[i].value) < 0) {
        return false;
      }
    }

    return true;
  };

  var sortPins = function (pins) {

    if (window.mapFilter.isMapFilterDefaultParametrs()) {
      window.data = pins;
      return pins;
    } else {
      var filteredPins = pins.slice().filter(isSimilar);
      console.log(filteredPins);
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
