'use strict';
(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var filter = map.querySelector('.map__filters');
  var form = document.querySelector('.ad-form');
  var buttonSubmit = form.querySelector('.ad-form__submit');
  var buttonReset = form.querySelector('.ad-form__reset');

  var deactivatePage = function () {
    map.classList.add('map--faded');
    window.mainPin.setFormCoordinates();
    window.form.deactivate();
    form.removeEventListener('submit', formSubmitHandler);
    buttonReset.removeEventListener('click', buttonResetClickHandler);
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    window.pin.load();
    filter.addEventListener('change', filterElementChangeHandler);
    window.form.activate();
    form.addEventListener('submit', formSubmitHandler);
    buttonReset.addEventListener('click', buttonResetClickHandler);
  };

  var resetPage = function () {
    filter.removeEventListener('change', filterElementChangeHandler);
    filter.reset();
    window.mainPin.setStartCoordinates();
    window.mainPin.setFormCoordinates();
    window.card.close();
    window.pin.clear();
    form.reset();
  };

  var updatePins = function () {
    window.card.close();
    window.pin.clear();
    window.pin.filter();
  };

  var activateMainPin = function (evt) {
    if (map.classList.contains('map--faded')) {
      activatePage();
    }
    window.mainPin.setFormCoordinates();
    window.mainPin.dragDrop(evt);
  };

  var windowLoadHandler = function () {
    deactivatePage();
    window.mainPin.saveStartCoordinates();
    window.removeEventListener('load', windowLoadHandler);
  };

  var mainPinMouseDownHandler = function (evt) {
    activateMainPin(evt);
  };

  var mainPinPressEnterHandler = function (evt) {
    if (evt.keyCode === window.params.keyCode.ENTER) {
      activateMainPin(evt);
    }
  };

  var filterElementChangeHandler = function () {
    window.debounce(updatePins);
  };

  var formSubmitHandler = function (evt) {
    buttonSubmit.disabled = true;
    window.backend.save(new FormData(form), function () {
      window.showSuccess();
      resetPage();
      deactivatePage();
    }, window.showError);
    evt.preventDefault();
  };

  var buttonResetClickHandler = function () {
    resetPage();
    deactivatePage();
  };

  window.addEventListener('load', windowLoadHandler);

  mainPin.addEventListener('mousedown', mainPinMouseDownHandler);

  mainPin.addEventListener('keydown', mainPinPressEnterHandler);

})();
