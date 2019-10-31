'use strict';
(function () {
  var mapFilter = document.querySelector('.map__filters-container');
  var mapCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  /**
   * Закрывает карточку предложения размещения по клавише "Esc"
   * @param {object} evt - объект события
   * @return {void}
   */
  var adCardPressEscHandler = function (evt) {
    if (evt.keyCode === window.params.keyCode.ESC) {
      closeAdCard();
      window.pin.deactivate();
    }
  };

  /**
   * Отображает карточку предложения размещения
   * @return {void}
   */
  var openAdCard = function () {
    var mapCard = document.querySelector('.map__card.popup');
    var mapCardClose = mapCard.querySelector('.popup__close');
    mapCard.classList.remove('hidden');
    mapCardClose.addEventListener('click', closeAdCard);
    document.addEventListener('keydown', adCardPressEscHandler);
  };

  /**
   * Закрывает карточку предложения размещения
   * @return {void}
   */
  var closeAdCard = function () {
    var mapCard = document.querySelector('.map__card.popup');
    var mapCardClose = mapCard.querySelector('.popup__close');
    if (mapCard) {
      document.removeEventListener('keydown', adCardPressEscHandler);
      mapCardClose.removeEventListener('click', closeAdCard);
      window.pin.deactivate();
      mapCard.remove();
    }
  };

  /**
   * Создаёт в карточке предложения дополнительный параметр(парковка, кухня и т.д.)
   * @param {String} adFeature - название дополнительного параметра
   * @return {HTMLLIElement} - li-элемент разметки с соответствующим классом
   */
  var createAdFeatureHtml = function (adFeature) {
    var adFeatureElement = document.createElement('li');
    adFeatureElement.className = 'popup__feature popup__feature--' + adFeature;
    return adFeatureElement;
  };

  /**
   * Создаёт в карточке предложения превью фотографии
   * @param {String} adPhoto  - адрес изображения
   * @return {HTMLImageElement} - превью фотографии
   */
  var createAdPhotoHtml = function (adPhoto) {
    var adPhotoElement = document.createElement('img');
    adPhotoElement.src = adPhoto;
    adPhotoElement.className = 'popup__photo';
    adPhotoElement.width = window.params.ad.PHOTO_WIDTH;
    adPhotoElement.height = window.params.ad.PHOTO_HEIGHT;
    adPhotoElement.alt = 'Фотография жилья';
    return adPhotoElement;
  };

  /**
   * Объект в котором хранятся данные предложения размещения
   * @typedef { author: {
   *              avatar: string
   *            },
   *            location: {
   *              x: number,
   *              y: number
   *            },
   *            offer: {
   *              address: string,
   *              checkin: string,
   *              checkout: string,
   *              description: string,
   *              features: object[],
   *              guests: number,
   *              photos: object[],
   *              price: number,
   *              rooms: number,
   *              title: string,
   *              type: string,
   *            }
   *          } Ad
   */

  /**
   * Отрисовывает карточку предложения и помещает ёё в разметку
   * @param {Ad} ad - данные предолжения для заполнения карточки
   * @return {void}
   */
  var renderAdCard = function (ad) {
    var cardElement = mapCardTemplate.cloneNode(true);
    var adFeaturesFragment = window.createFragment(ad.offer.features, createAdFeatureHtml, 0);
    var adPhotosFragment = window.createFragment(ad.offer.photos, createAdPhotoHtml, 0);

    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = ad.offer.price + '&#x20bd;<span>/ночь</span>';
    cardElement.querySelector('.popup__type').textContent = window.params.translation[ad.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = '';
    cardElement.querySelector('.popup__features').appendChild(adFeaturesFragment);
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    cardElement.querySelector('.popup__photos').innerHTML = '';
    cardElement.querySelector('.popup__photos').appendChild(adPhotosFragment);

    mapFilter.before(cardElement);
  };

  window.card = {
    render: renderAdCard,
    open: openAdCard,
    close: closeAdCard
  };
})();
