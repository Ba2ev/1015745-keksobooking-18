'use strict';
(function () {
  var mapCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var createAdFeatureHTML = function (adFeature) {
    var adFeatureElement = document.createElement('li');
    adFeatureElement.className = 'popup__feature popup__feature--' + adFeature;
    return adFeatureElement;
  };

  var createAdPhotoHTML = function (adPhoto) {
    var adPhotoElement = document.createElement('img');
    adPhotoElement.src = adPhoto;
    adPhotoElement.className = 'popup__photo';
    adPhotoElement.width = window.params.ad.adPhotoWidth;
    adPhotoElement.height = window.params.ad.adPhotoHeight;
    adPhotoElement.alt = 'Фотография жилья';
    return adPhotoElement;
  };

  window.createCard = function (ad) {
    var mapFilter = document.querySelector('.map__filters-container');
    var cardElement = mapCardTemplate.cloneNode(true);
    var adFeaturesFragment = window.util.createFragment(ad.offer.features, createAdFeatureHTML);
    var adPhotoesFragment = window.util.createFragment(ad.offer.photos, createAdPhotoHTML);

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
})();
