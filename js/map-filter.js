'use strict';
(function () {
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterGroups = mapFilter.querySelectorAll('.map__filter');
  var mapFilterFeaturesGroup = mapFilter.querySelector('.map__features');
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
    var checkedFeatures = [];
    for (var i = 0; i < mapFilterFeatures.length; i++) {
      checkedFeatures.push(mapFilterFeatures[i]);
    }
    return checkedFeatures.slice().filter(function (feature) {
      return feature.checked === true;
    });
  };

  var deactivateMapFilter = function () {
    mapFilterFeaturesGroup.setAttribute('disabled', 'disabled');
    for (var i = 0; i < mapFilterGroups.length; i++) {
      mapFilterGroups[i].setAttribute('disabled', 'disabled');
    }
    setMapFilterDefaultParameters();
  };

  var activateMapFilter = function () {
    mapFilterFeaturesGroup.removeAttribute('disabled');
    for (var i = 0; i < mapFilterGroups.length; i++) {
      mapFilterGroups[i].removeAttribute('disabled');
    }
  };

  window.mapFilter = {
    activateMapFilter: activateMapFilter,
    deactivateMapFilter: deactivateMapFilter,
    saveMapFilterDefaultParameters: saveMapFilterDefaultParameters,
    setMapFilterDefaultParameters: setMapFilterDefaultParameters,
    isMapFilterDefaultParameters: isMapFilterDefaultParameters,
    getCheckedFeatures: getCheckedFeatures
  };
})();
