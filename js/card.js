'use strict';
(function () {
  var mapCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var onAdCardEscPress = function (evt) {
    if (evt.keyCode === window.params.keyCode.esc) {
      closeAdCard();
    }
  };

  var openAdCard = function () {
    var mapCard = document.querySelector('.map__card.popup');
    var mapCardClose = mapCard.querySelector('.popup__close');
    mapCard.classList.remove('hidden');
    mapCardClose.addEventListener('click', closeAdCard);
    document.addEventListener('keydown', onAdCardEscPress);
  };

  var closeAdCard = function () {
    var mapCard = document.querySelector('.map__card.popup');
    if (mapCard) {
      document.removeEventListener('keydown', onAdCardEscPress);
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
    adPhotoElement.width = window.params.ad.photoWidth;
    adPhotoElement.height = window.params.ad.photoHeight;
    adPhotoElement.alt = 'Фотография жилья';
    return adPhotoElement;
  };

  var renderCard = function (ad) {
    var mapFilter = document.querySelector('.map__filters-container');
    var cardElement = mapCardTemplate.cloneNode(true);
    var adFeaturesFragment = window.util.createFragment(ad.offer.features, createAdFeatureHtml);
    var adPhotoesFragment = window.util.createFragment(ad.offer.photos, createAdPhotoHtml);

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
    cardElement.querySelector('.popup__photos').appendChild(adPhotoesFragment);

    mapFilter.before(cardElement);
  };

  window.card = {
    renderCard: renderCard,
    openAdCard: openAdCard,
    closeAdCard: closeAdCard,
    onAdCardEscPress: onAdCardEscPress
  };
})();
