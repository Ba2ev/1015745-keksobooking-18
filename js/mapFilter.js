'use strict';
(function () {
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterPlaceType = mapFilter.querySelector('#housing-type');
  var mapFilterPricePerNight = mapFilter.querySelector('#housing-price');
  var mapFilterRoomNumbers = mapFilter.querySelector('#housing-rooms');
  var mapFilterCapacities = mapFilter.querySelector('#housing-guests');
  var mapFilterFeatures = mapFilter.querySelectorAll('[name=features]');

  var saveMapFilterDefaultParametrs = function () {
    var featuresStatuses = [];
    for (var i = 0; i < mapFilterFeatures.length; i++) {
      featuresStatuses.push(mapFilterFeatures[i].checked);
    }

    window.params['filterDefaultParametrs'] = {
      defaultPlaceType: mapFilterPlaceType.value,
      defaulPricePerNight: mapFilterPricePerNight.value,
      defaultRoomNumbers: mapFilterRoomNumbers.value,
      defaultCapacities: mapFilterCapacities.value,
      defaultFeaturesStatuses: featuresStatuses
    };
  };

  var setMapFilterDefaultParametrs = function () {
    var filterDefaultParametrs = window.params.filterDefaultParametrs;
    mapFilterPlaceType.value = filterDefaultParametrs.defaultPlaceType;
    mapFilterPricePerNight.value = filterDefaultParametrs.defaulPricePerNight;
    mapFilterRoomNumbers.value = filterDefaultParametrs.defaultRoomNumbers;
    mapFilterCapacities.value = filterDefaultParametrs.defaultCapacities;

    for (var i = 0; i < mapFilterFeatures.length; i++) {
      mapFilterFeatures[i].checked = filterDefaultParametrs.defaultFeaturesStatuses[i];
    }
  };

  var isMapFilterDefaultParametrs = function () {
    if (mapFilterPlaceType.value !== window.params.filterDefaultParametrs.defaultPlaceType) {
      return false;
    }
    if (mapFilterPricePerNight.value !== window.params.filterDefaultParametrs.defaulPricePerNight) {
      return false;
    }
    if (mapFilterRoomNumbers.value !== window.params.filterDefaultParametrs.defaultRoomNumbers) {
      return false;
    }
    if (mapFilterCapacities.value !== window.params.filterDefaultParametrs.defaultCapacities) {
      return false;
    }
    for (var i = 0; i < mapFilterFeatures.length; i++) {
      if (mapFilterFeatures[i].checked !== window.params.filterDefaultParametrs.defaultFeaturesStatuses[i]) {
        return false;
      }
    }
    return true;
  };

  var getCheckedFeatures = function () {
    var chekedFeatures = [];
    for (var i = 0; i < mapFilterFeatures.length; i++) {
      chekedFeatures.push(mapFilterFeatures[i]);
    }
    return chekedFeatures.slice().filter(function (feature) {
      return feature.checked === true;
    });
  };

  window.mapFilter = {
    saveMapFilterDefaultParametrs: saveMapFilterDefaultParametrs,
    setMapFilterDefaultParametrs: setMapFilterDefaultParametrs,
    isMapFilterDefaultParametrs: isMapFilterDefaultParametrs,
    getCheckedFeatures: getCheckedFeatures
  };
})();
