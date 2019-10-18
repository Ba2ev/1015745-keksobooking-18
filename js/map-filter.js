'use strict';
(function () {
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterPlaceType = mapFilter.querySelector('#housing-type');
  var mapFilterPricePerNight = mapFilter.querySelector('#housing-price');
  var mapFilterRoomNumbers = mapFilter.querySelector('#housing-rooms');
  var mapFilterCapacities = mapFilter.querySelector('#housing-guests');
  var mapFilterFeatures = mapFilter.querySelectorAll('[name=features]');

  var saveMapFilterDefaultParameters = function () {
    var featuresStatuses = [];
    for (var i = 0; i < mapFilterFeatures.length; i++) {
      featuresStatuses.push(mapFilterFeatures[i].checked);
    }

    window.params['filterDefaultParameters'] = {
      defaultPlaceType: mapFilterPlaceType.value,
      defaulPricePerNight: mapFilterPricePerNight.value,
      defaultRoomNumbers: mapFilterRoomNumbers.value,
      defaultCapacities: mapFilterCapacities.value,
      defaultFeaturesStatuses: featuresStatuses
    };
  };

  var setMapFilterDefaultParameters = function () {
    var filterDefaultParameters = window.params.filterDefaultParameters;
    mapFilterPlaceType.value = filterDefaultParameters.defaultPlaceType;
    mapFilterPricePerNight.value = filterDefaultParameters.defaulPricePerNight;
    mapFilterRoomNumbers.value = filterDefaultParameters.defaultRoomNumbers;
    mapFilterCapacities.value = filterDefaultParameters.defaultCapacities;

    for (var i = 0; i < mapFilterFeatures.length; i++) {
      mapFilterFeatures[i].checked = filterDefaultParameters.defaultFeaturesStatuses[i];
    }
  };

  var isMapFilterDefaultParameters = function () {
    if (mapFilterPlaceType.value !== window.params.filterDefaultParameters.defaultPlaceType) {
      return false;
    }
    if (mapFilterPricePerNight.value !== window.params.filterDefaultParameters.defaulPricePerNight) {
      return false;
    }
    if (mapFilterRoomNumbers.value !== window.params.filterDefaultParameters.defaultRoomNumbers) {
      return false;
    }
    if (mapFilterCapacities.value !== window.params.filterDefaultParameters.defaultCapacities) {
      return false;
    }
    for (var i = 0; i < mapFilterFeatures.length; i++) {
      if (mapFilterFeatures[i].checked !== window.params.filterDefaultParameters.defaultFeaturesStatuses[i]) {
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
    saveMapFilterDefaultParameters: saveMapFilterDefaultParameters,
    setMapFilterDefaultParameters: setMapFilterDefaultParameters,
    isMapFilterDefaultParameters: isMapFilterDefaultParameters,
    getCheckedFeatures: getCheckedFeatures
  };
})();
