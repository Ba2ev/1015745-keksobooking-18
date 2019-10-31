'use strict';
(function () {
  /**
   * Создаёт DocumentFragment на основе массива данных, функции преобразования данных в разметку и предельного кол-ва элементов.
   * @param {object[]} dataArray - массив данных, который будет пропущен через функцию преобразования в разметку
   * @param {function} createHtml - функция преобразования данных в разметку
   * @param {number} countLimit - предельное количество элементов во фрагменте
   * @return {DocumentFragment} - готовый DocumentFragment, который нужно вставить в разметку
   */
  window.createFragment = function (dataArray, createHtml, countLimit) {
    var baseFragment = document.createDocumentFragment();
    var count = dataArray.length;
    if (countLimit > 0 && dataArray.length > countLimit) {
      count = countLimit;
    }
    for (var i = 0; i < count; i++) {
      baseFragment.appendChild(createHtml(dataArray[i]));
    }
    return baseFragment;
  };
})();
