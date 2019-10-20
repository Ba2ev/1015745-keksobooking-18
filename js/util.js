'use strict';
(function () {
  var synchronizeElementsValues = function (donorElement, acceptorElement) {
    var donorValue = donorElement.value;
    acceptorElement.value = donorValue;
  };

  var createFragment = function (baseArray, createHtml, countLimit) {
    var baseFragment = document.createDocumentFragment();
    var count = baseArray.length;
    if (countLimit > 0 && baseArray.length > countLimit) {
      count = countLimit;
    }
    for (var i = 0; i < count; i++) {
      baseFragment.appendChild(createHtml(baseArray[i]));
    }
    return baseFragment;
  };

  window.util = {
    synchronizeElementsValues: synchronizeElementsValues,
    createFragment: createFragment
  };
})();
