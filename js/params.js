'use strict';
(function () {
  window.params = {
    translation: {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    },
    ad: {
      adCount: 8,
      adPhotoWidth: 45,
      adPhotoHeight: 40
    },
    mainPin: {
      mainPinWidth: 65,
      mainPinHeight: 65,
      mainPinSpikeHeight: 22
    },
    pin: {
      pinWidth: 50,
      pinHeight: 70,
      pinPositionTopLimit: 130,
      pinPositionBottomLimit: 630
    },
    form: {
      priceMinValue: 1000,
      priceMaxValue: 50000,
      roomsMaxValue: 5,
      guestsMaxValue: 8,
      bungaloMinPrice: 0,
      flatMinPrice: 1000,
      houseMinPrice: 5000,
      palaceMinPrice: 10000
    },
    keyCode: {
      esc: 27
    },
    errorCode: {
      404: 'Запрашиваемая страница не найдена'
    },
    server: {
      url: 'https://js.dump.academy/keksobooking/data'
    }
  };
})();
