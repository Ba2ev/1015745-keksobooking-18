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

  var sortPins = function (pins) {
    var mapFilter = document.querySelector('.map__filters');
    var mapFilterPlaceType = mapFilter.querySelector('#housing-type');
    if (mapFilterPlaceType.value === 'any') {
      window.data = pins;
      return pins;
    } else {
      var filteredPins = pins.slice().filter(function (ad) {
        return ad.offer.type === mapFilterPlaceType.value;
      });
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
    var fragment = window.util.createFragment(sortPins(pins), createAdHtml);
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
