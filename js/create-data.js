'use strict';
(function () {
  window.createData = function () {

    var createAd = function (adArrayIndex) {
      var map = document.querySelector('.map');
      var ad = {
        author: {
          avatar: 'img/avatars/user0' + (adArrayIndex + 1) + '.png'
        },
        location: {
          x: window.util.getRandomValue(window.params.pin.pinWidth, map.offsetWidth) - window.params.pin.pinWidth / 2,
          y: window.util.getRandomValue(window.params.pin.pinPositionTopLimit + window.params.pin.pinHeight, window.params.pin.pinPositionBottomLimit) - window.params.pin.pinHeight
        },
      };
      ad.offer = {
        title: window.params.mocs.titles[adArrayIndex],
        address: String(ad.location.x) + ', ' + String(ad.location.y),
        price: window.util.getRandomValue(window.params.form.priceMinValue, window.params.form.priceMaxValue),
        type: window.util.getArrayRandomElement(window.params.mocs.typesEN),
        rooms: window.util.getRandomValue(1, window.params.form.roomsMaxValue),
        guests: window.util.getRandomValue(1, window.params.form.guestsMaxValue),
        checkin: window.util.getArrayRandomElement(window.params.mocs.checkins),
        checkout: window.util.getArrayRandomElement(window.params.mocs.checkouts),
        features: window.util.getRandomLengthArray(window.params.mocs.features),
        description: window.util.getArrayRandomElement(window.params.mocs.descriptions),
        photos: window.util.getRandomLengthArray(window.params.mocs.photoes)
      };
      return ad;
    };

    var data = [];
    for (var i = 0; i < window.params.ad.adCount; i++) {
      data.push(createAd(i));
    }

    window.data = data;
  };
})();
