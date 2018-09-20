'use strict';

(function () {
  window.backend = {

    save: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking/';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Response Status: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.open('POST', URL);
      xhr.send(data);
    },


    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('GET', URL);

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Response status: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Failed to connect');
      });
      xhr.addEventListener('timeout', function () {
        onError('The server timed out waiting for the request.');
      });

      xhr.timeout = 10000; // 10s

      xhr.open('GET', URL);

      xhr.send();
    }
  };
})();
