'use strict';
(function () {
  var AD_TITLES = ['Небольшое жильё', 'Моё пространство', 'Просторное жильё', 'Комфортное место', 'Жильё возле метро', 'Ночлег для пушественников', 'Тихое место', 'Жилье в романском стиле'];
  var AD_TYPES_EN = ['palace', 'flat', 'house', 'bungalo'];
  var AD_TYPES_RU = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
  var AD_CHEKINS = ['12:00', '13:00', '14:00'];
  var AD_CHEKOUTS = ['12:00', '13:00', '14:00'];
  var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var AD_DESCRIPTIONS = ['Прекрасное место для семейного отдыха', 'Много места, чтобы устроить вечеринку!', 'Нет соседей поблизости', 'Хороший вариант для деловых поездок', 'Рядом есть супермаркет', 'Одиночное размещение не допускается', 'Есть персональный гараж', 'Допускается размещение с животными'];
  var AD_PHOTOES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  window.data = {
    titles: AD_TITLES,
    typesEN: AD_TYPES_EN,
    typesRU: AD_TYPES_RU,
    checkins: AD_CHEKINS,
    checkouts: AD_CHEKOUTS,
    features: AD_FEATURES,
    descriptions: AD_DESCRIPTIONS,
    photoes: AD_PHOTOES
  };
})();
