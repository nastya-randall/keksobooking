'use strict';

// generate ads

(function () {

  var titles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var types = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var checkinTime = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var locations = [];
  window.ads = [];

  var ADS_NUMBER = 8;
  var MIN_PRICE = 100;
  var MAX_PRICE = 500;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;

  var PIN_SIZE = 45;
  var MIN_Y = 150;
  var MAX_Y = 630;
  var map = document.querySelector('.map');


  // generating ads' coordinates

  var generateLocation = function () {
    for (var i = 0; i < ADS_NUMBER; i++) {
      var location = {
        x: window.utils.getRandomInRange(map.offsetLeft + PIN_SIZE / 2, map.offsetWidth - PIN_SIZE / 2),
        y: window.utils.getRandomInRange(MIN_Y, MAX_Y)
      };
      locations.push(location);
    }
    return locations;
  };


  window.generateAds = function () {
    generateLocation();

    for (var i = 0; i < ADS_NUMBER; i++) {
      var titleRand = window.utils.getRandom(titles);
      var ad = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: titles[titleRand],
          address: locations[i].x + ', ' + locations[i].y,
          price: window.utils.getRandomInRange(MIN_PRICE, MAX_PRICE),
          type: window.utils.getRandomArrayValue(types),
          rooms: window.utils.getRandomInRange(MIN_ROOMS, MAX_ROOMS),
          guests: window.utils.getRandomInRange(2, MAX_ROOMS),
          checkin: window.utils.getRandomArrayValue(checkinTime),
          checkout: window.utils.getRandomArrayValue(checkinTime),
          features: window.utils.getRandomShuffledArray(features),
          description: '',
          photos: window.utils.shuffleArray(photos)
        },
        location: {
          x: locations[i].x,
          y: locations[i].y
        }
      };
      titles.splice(titleRand, 1);
      window.ads.push(ad);
    }
  };

//  generateAds();
})();
