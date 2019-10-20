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
      photoWidth: 45,
      photoHeight: 40
    },
    mainPin: {
      width: 65,
      height: 65,
      spikeHeight: 22
    },
    pin: {
      width: 50,
      height: 70,
      positionTopLimit: 130,
      positionBottomLimit: 630,
      maxCount: 5
    },
    form: {
      titleMinLength: 30,
      titleMaxLength: 100,
      priceMinValue: 1000,
      priceMaxValue: 50000,
      roomsMaxValue: 5,
      guestsMaxValue: 8,
      bungaloMinPrice: 0,
      flatMinPrice: 1000,
      houseMinPrice: 5000,
      palaceMinPrice: 10000,
      placePhotoWidth: 70,
      placePhotoHeight: 70,
    },
    keyCode: {
      esc: 27,
      enter: 13,
      space: 32
    },
    errorCode: {
      400: 'Данные отправлены в некорректной форме',
      404: 'Запрашиваемая страница не найдена'
    },
    server: {
      urlLoad: 'https://js.dump.academy/keksobooking/data',
      urlSave: 'https://js.dump.academy/keksobooking'
    }
  };
})();
