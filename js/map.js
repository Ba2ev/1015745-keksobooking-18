'use strict';
(function () {
  var map = document.querySelector('.map');

  var deactivateMap = function () {
    map.classList.add('map--faded');
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
  };

  window.map = {
    deactivateMap: deactivateMap,
    activateMap: activateMap
  };
})();
