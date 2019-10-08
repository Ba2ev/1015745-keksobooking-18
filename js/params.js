'use strict';
(function () {
  window.params = {
    mocs: {
      titles: ['Небольшое жильё', 'Моё пространство', 'Просторное жильё', 'Комфортное место', 'Жильё возле метро', 'Ночлег для пушественников', 'Тихое место', 'Жилье в романском стиле'],
      typesEN: ['palace', 'flat', 'house', 'bungalo'],
      typesRU: ['Дворец', 'Квартира', 'Дом', 'Бунгало'],
      checkins: ['12:00', '13:00', '14:00'],
      checkouts: ['12:00', '13:00', '14:00'],
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      descriptions: ['Прекрасное место для семейного отдыха', 'Много места, чтобы устроить вечеринку!', 'Нет соседей поблизости', 'Хороший вариант для деловых поездок', 'Рядом есть супермаркет', 'Одиночное размещение не допускается', 'Есть персональный гараж', 'Допускается размещение с животными'],
      photoes: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
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
    }
  };
})();
