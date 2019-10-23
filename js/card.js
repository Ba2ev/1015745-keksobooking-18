'use strict';
(function () {
  var mapCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var adCardPressEscHandler = function (evt) {
    if (evt.keyCode === window.params.keyCode.ESC) {
      closeAdCard();
    }
  };

  var openAdCard = function () {
    var mapCard = document.querySelector('.map__card.popup');
    var mapCardClose = mapCard.querySelector('.popup__close');
    mapCard.classList.remove('hidden');
    mapCardClose.addEventListener('click', closeAdCard);
    document.addEventListener('keydown', adCardPressEscHandler);
  };

  var closeAdCard = function () {
    var mapCard = document.querySelector('.map__card.popup');
    if (mapCard) {
      document.removeEventListener('keydown', adCardPressEscHandler);
      mapCard.remove();
    }
  };

  var createAdFeatureHtml = function (adFeature) {
    var adFeatureElement = document.createElement('li');
    adFeatureElement.className = 'popup__feature popup__feature--' + adFeature;
    return adFeatureElement;
  };

  var createAdPhotoHtml = function (adPhoto) {
    var adPhotoElement = document.createElement('img');
    adPhotoElement.src = adPhoto;
    adPhotoElement.className = 'popup__photo';
    adPhotoElement.width = window.params.ad.PHOTO_WIDTH;
    adPhotoElement.height = window.params.ad.PHOTO_HEIGHT;
    adPhotoElement.alt = 'Фотография жилья';
    return adPhotoElement;
  };

  var renderAdCard = function (ad) {
    var mapFilter = document.querySelector('.map__filters-container');
    var cardElement = mapCardTemplate.cloneNode(true);
    var adFeaturesFragment = window.util.createFragment(ad.offer.features, createAdFeatureHtml, 0);
    var adPhotosFragment = window.util.createFragment(ad.offer.photos, createAdPhotoHtml, 0);

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
