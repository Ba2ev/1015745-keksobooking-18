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
    mapFilterFeatures.forEach(function (item) {
      featuresStatuses.push(item.checked);
    });

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

    mapFilterFeatures.forEach(function (item, index) {
      item.checked = filterDefaultParameters.defaultFeaturesStatuses[index];
    });
  };

  var isMapFilterDefaultParameters = function () {
    var isDefaultMapFilterFeatures = Array.prototype.slice.call(mapFilterFeatures).some(function (item, index) {
      return item.checked !== window.params.filterDefaultParameters.defaultFeaturesStatuses[index];
    });

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
    if (!isDefaultMapFilterFeatures) {
      return false;
    }
    return true;
  };

  var getCheckedFeatures = function () {

    return Array.prototype.slice.call(mapFilterFeatures).filter(function (feature) {
      return feature.checked === true;
    });
  };

  var deactivateMapFilter = function () {
    mapFilterFeaturesGroup.setAttribute('disabled', 'disabled');
    mapFilterGroups.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    setMapFilterDefaultParameters();
  };

  var activateMapFilter = function () {
    mapFilterFeaturesGroup.removeAttribute('disabled');
    mapFilterGroups.forEach(function (item) {
      item.removeAttribute('disabled');
    });
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
