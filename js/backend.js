'use strict';

(function () {


  var makeRequest = function (onLoad, onError, method, link, data) {
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

    xhr.open(method, link);
    xhr.send(data);
  };

  var loadData = function (onLoad, onError) {
    makeRequest(onLoad, onError, window.params.server.METHOD_LOAD, window.params.server.URL_LOAD);
  };
  var saveData = function (data, onLoad, onError) {
    makeRequest(onLoad, onError, window.params.server.METHOD_SAVE, window.params.server.URL_SAVE, data);
  };

  window.backend = {
    load: loadData,
    save: saveData
  };
})();
