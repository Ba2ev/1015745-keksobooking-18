'use strict';
(function () {
  var getRandomValue = function (minValue, maxValue) {
    var rand = Math.floor(minValue + Math.random() * (maxValue + 1 - minValue));
    return rand;
  };

  var getRandomLengthArray = function (baseArray) {
    var randomArray = [];
    var randomCount = getRandomValue(1, baseArray.length);
    var baseArrayCopy = baseArray.slice();
    for (var i = 0; i < randomCount; i++) {
      var randomElement = baseArrayCopy[getRandomValue(0, baseArrayCopy.length - 1)];
      baseArrayCopy.splice(baseArrayCopy.indexOf(randomElement), 1);
      randomArray.push(randomElement);
    }
    return randomArray;
  };

  var getArrayRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

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
    getRandomValue: getRandomValue,
    getRandomLengthArray: getRandomLengthArray,
    getArrayRandomElement: getArrayRandomElement,
    synchronizeElementsValues: synchronizeElementsValues,
    createFragment: createFragment,
  };
})();
