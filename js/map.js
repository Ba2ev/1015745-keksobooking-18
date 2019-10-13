'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters-container');
  var mapFilterGroups = mapFilter.querySelectorAll('.map__filter');
  var mapFilterFeaturesGroup = mapFilter.querySelector('.map__features');

  var deactivateMap = function () {
    map.classList.add('map--faded');
    mapFilterFeaturesGroup.setAttribute('disabled', 'disabled');
    for (var i = 0; i < mapFilterGroups.length; i++) {
      mapFilterGroups[i].setAttribute('disabled', 'disabled');
    }
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
    mapFilterFeaturesGroup.removeAttribute('disabled');
    for (var i = 0; i < mapFilterGroups.length; i++) {
      mapFilterGroups[i].removeAttribute('disabled');
    }
  };

  window.map = {
    deactivateMap: deactivateMap,
    activateMap: activateMap,
  };
})();
