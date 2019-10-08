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
    var adFeaturesFragment = window.util.createFragment(ad.offer.features, createAdFeatureHTML);
    var adPhotoesFragment = window.util.createFragment(ad.offer.photos, createAdPhotoHTML);

    mapCardTemplate.querySelector('.popup__avatar').src = ad.author.avatar;
    mapCardTemplate.querySelector('.popup__title').textContent = ad.offer.title;
    mapCardTemplate.querySelector('.popup__text--address').textContent = ad.offer.address;
    mapCardTemplate.querySelector('.popup__text--price').innerHTML = ad.offer.price + '&#x20bd;<span>/ночь</span>';
    mapCardTemplate.querySelector('.popup__type').textContent = window.params.mocs.typesRU[window.params.mocs.typesEN.indexOf(ad.offer.type)];
    mapCardTemplate.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    mapCardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    mapCardTemplate.querySelector('.popup__features').innerHTML = '';
    mapCardTemplate.querySelector('.popup__features').appendChild(adFeaturesFragment);
    mapCardTemplate.querySelector('.popup__description').textContent = ad.offer.description;
    mapCardTemplate.querySelector('.popup__photos').innerHTML = '';
    mapCardTemplate.querySelector('.popup__photos').appendChild(adPhotoesFragment);

    return mapCardTemplate;
  };
})();
