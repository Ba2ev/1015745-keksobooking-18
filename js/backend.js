'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === window.params.server.STATUS_SUCCESS) {
          onLoad(xhr.response);
        } else {
          onError('Не удалось получить данные. Код ошибки: ' + xhr.status + '. ' + window.params.errorCode[xhr.status]);
        }
      });

      xhr.addEventListener('error', function () {
        onError(window.params.server.ERROR_CONNECTION_MESSAGE);
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = window.params.server.TIMEOUT_LIMIT;

      xhr.open('GET', window.params.server.URL_LOAD);
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === window.params.server.STATUS_SUCCESS) {
          onLoad(xhr.response);
        } else {
          onError('Ошибка ' + xhr.status + ': ' + window.params.errorCode[xhr.status]);
        }
      });

      xhr.addEventListener('error', function () {
        onError(window.params.server.ERROR_CONNECTION_MESSAGE);
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout / 1000 + 'с');
      });

      xhr.timeout = window.params.server.TIMEOUT_LIMIT;

      xhr.open('POST', window.params.server.URL_SAVE);

      xhr.send(data);
    }
  };
})();
