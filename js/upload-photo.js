'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarDefaultLogo = document.querySelector('.ad-form-header__preview img');
  var avatarDefaultSrc = avatarDefaultLogo.src;

  var createPhoto = function (photoSrc) {
    var adPhoto = document.createElement('IMG');
    adPhoto.classList.add('popup__photo');
    adPhoto.src = photoSrc;
    adPhoto.width = window.params.form.PLACE_PHOTO_WIDTH;
    adPhoto.height = window.params.form.PLACE_PHOTO_HEIGHT;
    adPhoto.alt = 'Фотография жилья';
    return adPhoto;
  };

  var photoClickHandler = function (evt) {
    evt.preventDefault();
    if (evt.target.tagName === 'IMG') {
      evt.target.remove();
    }
  };

  window.avatarChooserChangeHandler = function (chooser, renderPlace) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        renderPlace.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  window.photoChooserChangeHandler = function (chooser, renderPlace) {
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

  window.clearAvatar = function () {
    avatarDefaultLogo.src = avatarDefaultSrc;
  };

  window.clearPhotos = function (renderPlace) {
    renderPlace.innerHTML = '';
  };

})();
