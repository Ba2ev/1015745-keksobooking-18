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

      if (mapCard) {
        window.card.close();
      }
      window.card.open();
    }
  };

  var sortPins = function (pins) {
    var filteredPins = pins.slice().filter(window.filter.isSimilar);
    window.sortedData = filteredPins;
    return filteredPins;
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
    window.filter.activate();
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
