'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500; // ms

  window.utils = {
    disable: function (value, elements) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].disabled = value;
      }
    },

    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    clamp: function (num, min, max) {
      return Math.min(Math.max(num, min), max);
    },

    debounce: function (fun) {
      var lastTimeout = null;
      return function () {
        var args = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          fun.apply(null, args);
        }, DEBOUNCE_INTERVAL);
      };
    },

    getRandom: function (array) {
      return Math.floor(Math.random() * array.length);
    },

    getRandomInRange: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getRandomArrayValue: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    shuffleArray: function (inputArray) {
      var array = inputArray.slice();
      var currentIndex = array.length;
      var temporaryValue;
      var randomIndex;
      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    },

    getRandomShuffledArray: function (arr) {
      window.utils.shuffleArray(arr);
      var counter = Math.floor(Math.random() * arr.length);
      return arr.slice(counter, arr.length);
    }
  };
})();

