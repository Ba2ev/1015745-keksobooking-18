'use strict';
(function () {
  window.renderPins = function () {
    var createAdHTML = function (ad) {
      var mapPinTemplate = document.querySelector('#pin')
        .content
        .querySelector('.map__pin');
      var adElement = mapPinTemplate.cloneNode(true);

      adElement.style = 'left: ' + ad.location.x + 'px; top: ' + ad.location.y + 'px';
      adElement.querySelector('IMG').src = ad.author.avatar;
      adElement.querySelector('IMG').alt = ad.offer.title;

      return adElement;
    };

    var createPins = function (ads) {
      window.data = ads;
      var mapPins = document.querySelector('.map__pins');
      var fragment = window.util.createFragment(ads, createAdHTML);
      mapPins.appendChild(fragment);
    };

    window.backend.load(createPins, window.showError);
  };
})();
