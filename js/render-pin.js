'use strict';
(function () {
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

  window.renderPins = function () {
    var mapPins = document.querySelector('.map__pins');
    var fragment = window.util.createFragment(window.data, createAdHTML);
    mapPins.appendChild(fragment);
  };
})();
