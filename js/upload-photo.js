'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var createPhoto = function (photoSrc) {
    var adPhoto = document.createElement('IMG');
    adPhoto.classList.add('popup__photo');
    adPhoto.src = photoSrc;
    adPhoto.width = window.params.form.PLACE_PHOTO_WIDTH;
    adPhoto.height = window.params.form.PLACE_PHOTO_HEIGHT;
    adPhoto.alt = 'Фотография жилья';
    return adPhoto;
  };

  window.photoChooserChangeHandler = function (chooser, renderPlace) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (renderPlace.tagName.toLowerCase() === 'img') {
          renderPlace.src = reader.result;
        } else {
          renderPlace.innerHTML = '';
          renderPlace.append(createPhoto(reader.result));
        }
      });

      reader.readAsDataURL(file);
    }
  };

})();
