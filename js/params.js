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
      PhotoWidth: 45,
      PhotoHeight: 40
    },
    mainPin: {
      Width: 65,
      Height: 65,
      SpikeHeight: 22
    },
    pin: {
      Width: 50,
      Height: 70,
      PositionTopLimit: 130,
      PositionBottomLimit: 630,
      MaxCount: 5
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
      400: 'Данные отправлены в некорректной форме',
      404: 'Запрашиваемая страница не найдена'
    },
    server: {
      urlLoad: 'https://js.dump.academy/keksobooking/data',
      urlSave: 'https://js.dump.academy/keksobooking'
    }
  };
})();
