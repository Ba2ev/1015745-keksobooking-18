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
      PHOTO_WIDTH: 45,
      PHOTO_HEIGHT: 40
    },
    mainPin: {
      WIDTH: 65,
      HEIGHT: 65,
      SPIKE_HEIGHT: 22
    },
    pin: {
      POSITION_TOP_LIMIT: 130,
      POSITION_BOTTOM_LIMIT: 630,
      MAX_COUNT: 5
    },
    form: {
      TITLE_MIN_LENGTH: 30,
      TITLE_MAX_LENGTH: 100,
      BUNGALO_MIN_PRICE: 0,
      FLAT_MIN_PRICE: 1000,
      HOUSE_MIN_PRICE: 5000,
      PALACE_MIN_PRICE: 10000,
      PLACE_PHOTO_WIDTH: 70,
      PLACE_PHOTO_HEIGHT: 70,
      NO_GUESTS_LIMIT: 100
    },
    keyCode: {
      ESC: 27,
      ENTER: 13,
      SPACE: 32
    },
    errorCode: {
      400: 'Данные отправлены в некорректной форме',
      404: 'Запрашиваемая страница не найдена'
    },
    server: {
      URL_LOAD: 'https://js.dump.academy/keksobooking/data',
      URL_SAVE: 'https://js.dump.academy/keksobooking',
      METHOD_LOAD: 'GET',
      METHOD_SAVE: 'POST',
      STATUS_SUCCESS: 200,
      TIMEOUT_LIMIT: 5000,
      ERROR_CONNECTION_MESSAGE: 'Произошла ошибка соединения'
    }
  };
})();
