'use strict';

(function () {

  var MIN_Y = 130;
  var MAX_Y = 630;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var USER_PIN_WIDTH = 65;
  var USER_PIN_HEIGHT = 81;

  var map = document.querySelector('.map');

  var pinsContainer = document.querySelector('.map__pins');
  var filtersContainer = document.querySelector('.map__filters-container');
  var pinTemplate = document.querySelector('template')
      .content
      .querySelector('.map__pin');


  var userPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFieldsets = adForm.querySelectorAll('fieldset');
  var filters = map.querySelectorAll('[id^="housing-"]');

  var closePopup = function () {
    var currentPin = map.querySelector('.map__pin--active');
    currentPin.classList.remove('map__pin--active');
    var popup = map.querySelector('.popup');
    if (popup !== null) {
      map.removeChild(popup);
    }
  };

  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };

  var isPopup = function () {
    var popup = map.querySelector('.popup');
    if (popup !== null) {
      map.removeChild(popup);
    }
  };

  var openPopup = function (item) {
    isPopup();
    insertCards(item);
    map.querySelector('.popup__close').addEventListener('click', closePopup);
    document.addEventListener('keydown', onPopupEscPress);

  };

  // rendering a pin

  var renderPin = function (item) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = item.location.x - Math.floor(PIN_WIDTH / 2) + 'px';
    pinElement.style.top = item.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = item.author.avatar;
    pinElement.querySelector('img').alt = item.offer.title;
    pinElement.addEventListener('click', function () {
      openPopup(item);
      pinElement.classList.add('map__pin--active');
    });
    return pinElement;
  };


  // inserting pins

  var insertPins = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderPin(array[i]));
    }
    pinsContainer.appendChild(fragment);
  };

  // inserting cards

  var insertCards = function (item) {
    map.insertBefore(window.renderCard(item), filtersContainer);
  };


  // Activate the page

  var activateSite = function () {
    map.classList.remove('map--faded');
    window.utils.disable(false, adFieldsets);
    adForm.classList.remove('ad-form--disabled');
    window.generateAds();
    insertPins(window.ads);
    window.updateUserLocation();
    window.utils.disable(false, filters);
  };

  userPin.addEventListener('mouseup', activateSite);

  // DRAGGING THE USER PIN

  var mainPin = map.querySelector('.map__pin--main');

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = window.utils.clamp(mainPin.offsetTop - shift.y, MIN_Y - USER_PIN_HEIGHT, MAX_Y) + 'px';
      mainPin.style.left = window.utils.clamp(mainPin.offsetLeft - shift.x, 0, map.offsetWidth - USER_PIN_WIDTH) + 'px';
      window.updateUserLocation();

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // удаление меток

  var removePins = function () {
    var pinsCol = map.querySelectorAll('.map__pin');
    for (var i = 1; i < pinsCol.length; i++) {
      pinsContainer.removeChild(pinsCol[i]);
    }
  };

  // обновление меток

  var updatePins = function () {
    var similarAds = window.ads.filter(function (it) {
      return window.filters.checkType(it) && window.filters.checkPrice(it) && window.filters.checkRooms(it) && window.filters.checkGuests(it);
    });

    var checkFeatures = function () {
      var selectedFeatures = map.querySelectorAll('input:checked');
      for (var i = 0; i < selectedFeatures.length; i++) {
        similarAds = similarAds.filter(function (ad) {
          return ad.offer.features.includes(selectedFeatures[i].value);
        });
      }
      return similarAds;
    };

    checkFeatures();

    removePins();
    isPopup();
    insertPins(similarAds);
  };

  var onFiltersChange = window.utils.debounce(updatePins);

  for (var i = 0; i < filters.length; i++) {
    filters[i].addEventListener('change', onFiltersChange);
  }

})();
