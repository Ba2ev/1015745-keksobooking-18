'use strict';
(function () {
  var mapPins = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var onPinClick = function (evt) {
    var mapCard = document.querySelector('.map__card.popup');
    var target = evt.target.closest('.map__pin:not(.map__pin--main)');

    if (target) {
      var adPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      var currentIndex = Array.prototype.slice.call(adPins).indexOf(target);
      window.card.render(window.sortedData[currentIndex]);
      adPins[currentIndex].classList.add('map__pin--active');

      if (mapCard) {
        window.card.close();
      }
      window.card.open();
    }
  };

  var createAdHtml = function (ad) {
    var adElement = mapPinTemplate.cloneNode(true);
    adElement.style = 'left: ' + ad.location.x + 'px; top: ' + ad.location.y + 'px';
    adElement.querySelector('IMG').src = ad.author.avatar;
    adElement.querySelector('IMG').alt = ad.offer.title;

    return adElement;
  };

  var loadPins = function () {
    window.backend.load(createPins, window.showError);
  };

  var createPins = function (pins) {
    if (!window.data) {
      window.data = pins;
      window.sortedData = pins;
    }
    var fragment = window.util.createFragment(pins, createAdHtml, window.params.pin.MAX_COUNT);
    mapPins.appendChild(fragment);
    window.filter.activate();
    mapPins.addEventListener('click', onPinClick);
  };

  var createFilteredPins = function () {
    var filteredPins = window.data.filter(window.filter.isSimilar);
    window.sortedData = filteredPins;
    createPins(filteredPins);
  };

  var clearPins = function () {

    var renderedPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    mapPins.removeEventListener('click', onPinClick);

    renderedPins.forEach(function (item) {
      item.remove();
    });
  };

  window.pin = {
    load: loadPins,
    filter: createFilteredPins,
    clear: clearPins
  };
})();
