'use strict';
(function () {
  var mapPins = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var adPins;

  /**
   * Проверяет наличие активного пина (с классом 'map__pin--active') на карте
   * @return {Boolean} - результат проверки (true/false)
   */
  var isSomePinActive = function () {
    return Array.prototype.slice.call(adPins).some(function (pin) {
      return pin.classList.contains('map__pin--active');
    });
  };

  /**
   * Находит и убирает класс 'map__pin--active' у активного пина
   * @return {void}
   */
  var deactivatePin = function () {
    adPins.forEach(function (pin) {
      if (pin.classList.contains('map__pin--active')) {
        pin.classList.remove('map__pin--active');
      }
    });
  };

  /**
   * Функция для обработчика события, вызываемого при нажатии на пин
   * @param {object} evt - объект события
   * @return {void}
   */
  var onPinClick = function (evt) {
    var target = evt.target.closest('.map__pin:not(.map__pin--main)');
    adPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    if (target) {
      var currentIndex = Array.prototype.slice.call(adPins).indexOf(target);

      if (isSomePinActive()) {
        deactivatePin();
        window.card.close();
      }

      adPins[currentIndex].classList.add('map__pin--active');
      window.card.render(window.sortedData[currentIndex]);
      window.card.open();
    }
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
   * @param {Ad} ad
   * @return {HTMLButtonElement} - пин
   */
  var createAdHtml = function (ad) {
    var adElement = mapPinTemplate.cloneNode(true);
    adElement.style = 'left: ' + ad.location.x + 'px; top: ' + ad.location.y + 'px';
    adElement.querySelector('IMG').src = ad.author.avatar;
    adElement.querySelector('IMG').alt = ad.offer.title;

    return adElement;
  };

  /**
   * Получает с сервера данные о предложениях размещения и отправляет их на отрисовку
   * @return {void}
   */
  var loadPins = function () {
    window.backend.load(renderPins, window.showError);
  };

  /**
   * @param {Object[]} data - массив данных с предложениями размещения
   * @return {void}
   */
  var renderPins = function (data) {
    if (!window.data) {
      window.data = data;
      window.sortedData = data;
    }
    var fragment = window.createFragment(data, createAdHtml, window.params.pin.MAX_COUNT);
    mapPins.appendChild(fragment);
    window.filter.activate();
    mapPins.addEventListener('click', onPinClick);
  };


  /**
   * Получает отфильтрованные данные с предложениями размещения и отправляет их на отрисовку
   * @return {void}
   */
  var renderFilteredPins = function () {
    var filteredPins = window.data.filter(window.filter.isSimilar);
    window.sortedData = filteredPins;
    renderPins(filteredPins);
  };

  /**
   * Удаляет отрисованные пины
   * @return {void}
   */
  var clearPins = function () {

    var renderedPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    mapPins.removeEventListener('click', onPinClick);

    renderedPins.forEach(function (item) {
      item.remove();
    });
  };

  window.pin = {
    load: loadPins,
    filter: renderFilteredPins,
    clear: clearPins,
    deactivate: deactivatePin
  };
})();
