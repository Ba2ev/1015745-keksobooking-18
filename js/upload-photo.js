'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreviewImage = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoBlock = document.querySelector('.ad-form__photo');

  var createPhoto = function (photoSrc) {
    var adPhoto = document.createElement('IMG');
    adPhoto.classList.add('popup__photo');
    adPhoto.src = photoSrc;
    adPhoto.width = window.params.form.placePhotoWidth;
    adPhoto.height = window.params.form.placePhotoHeight;
    adPhoto.alt = 'Фотография жилья';
    return adPhoto;
  };

  var chooserChangeHandler = function (chooser, renderPlace) {
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

  avatarChooser.addEventListener('change', function () {
    chooserChangeHandler(avatarChooser, avatarPreviewImage);
  });

  photoChooser.addEventListener('change', function () {
    chooserChangeHandler(photoChooser, photoBlock);
  });
})();
