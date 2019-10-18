'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoBlock = document.querySelector('.ad-form__photo');

  var createPhoto = function (photoSrc) {
    var adPhoto = document.createElement('IMG');
    adPhoto.classList.add('popup__photo');
    adPhoto.src = photoSrc;
    adPhoto.width = 70;
    adPhoto.height = 70;
    adPhoto.alt = 'Фотография жилья';
    return adPhoto;
  };

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        photoBlock.append(createPhoto(reader.result));
      });

      reader.readAsDataURL(file);
    }
  });
})();
