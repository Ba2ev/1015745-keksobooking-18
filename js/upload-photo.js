'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  /**
   * Создаёт превью изображения
   * @param {string} photoSrc - путь изображения
   * @return {HTMLImageElement} - изображение
   */
  var createPhoto = function (photoSrc) {
    var adPhoto = document.createElement('IMG');
    adPhoto.classList.add('popup__photo');
    adPhoto.src = photoSrc;
    adPhoto.width = window.params.form.PLACE_PHOTO_WIDTH;
    adPhoto.height = window.params.form.PLACE_PHOTO_HEIGHT;
    adPhoto.alt = 'Фотография жилья';
    return adPhoto;
  };

  /**
   * Удаляет превью изображения по нажатию на него
   * @param {*} evt - объект события
   * @return {void}
   */
  var photoClickHandler = function (evt) {
    evt.preventDefault();
    if (evt.target.tagName === 'IMG') {
      evt.target.remove();
    }
  };

  /**
   * Добавляет одно изображение без перезагрузки страницы
   * @param {HTMLInputElement} chooser
   * @param {HTMLImageElement} renderImage
   * @return {void}
   */
  var singlePhotoChooserChangeHandler = function (chooser, renderImage) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        renderImage.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  /**
   * Добавляет несколько изображений без перезагрузки страницы
   * @param {HTMLInputElement} chooser
   * @param {HTMLDivElement} renderPlace
   * @return {void}
   */
  var multiPhotoChooserChangeHandler = function (chooser, renderPlace) {
    var files = chooser.files;

    var matches = Array.prototype.slice.call(files).every(function (item) {
      var fileName = item.name.toLowerCase();
      var checkFormat = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      return checkFormat;
    });

    if (matches) {

      Array.prototype.slice.call(files).forEach(function (file) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          renderPlace.appendChild(createPhoto(reader.result));
        });

        reader.readAsDataURL(file);
      });

      renderPlace.addEventListener('click', photoClickHandler);
    }
  };

  window.uploadPhoto = {
    single: singlePhotoChooserChangeHandler,
    multi: multiPhotoChooserChangeHandler
  };
})();
