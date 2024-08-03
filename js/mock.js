import {getRandomInteger, getUniqueIntegerZero, getRandomNumber} from './util.js';

const QUANTITY_OF_DISCRIPTIONS = 10;

const TYPES = [ 'palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const getRandomItems = (items) => {
  const result = [];
  for (let i = 0; i < getRandomInteger(1, items.length - 1); i++) {
    result[i] = items[getRandomInteger(0, items.length - 1)];
  }
  const newResult = result.filter((item, i) => i === result.indexOf(item));
  return newResult;
};

const getRandomPhotos = () => {
  const result = [];
  for (let i = 0; i < getRandomInteger(1, 10); i++) {
    result[i] = PHOTOS[getRandomInteger(0, PHOTOS.length - 1)];
  }
  return result;
};


const createAdDescription = () => {
  const lat = getRandomNumber(59.90000, 59.95000, 5);
  const lng = getRandomNumber(30.28000, 30.33000, 5);
  return ({
    author: {
      avatar: `img/avatars/user${getUniqueIntegerZero(0, 10)}.png`
    },
    offer: {
      title: 'Заголовок',
      addres: `${lat}, ${lng}`,
      price: getRandomInteger(100, 3000),
      type: TYPES[getRandomInteger(0, TYPES.length - 1)],
      rooms: getRandomInteger(1, 10),
      guests: getRandomInteger(1, 10),
      checkin: TIMES[getRandomInteger(0, TIMES.length - 1)],
      checkout: TIMES[getRandomInteger(0, TIMES.length - 1)],
      features: getRandomItems(FEATURES),
      description: 'строка — описание помещения. Придумайте самостоятельно.',
      photos: getRandomPhotos(),
    },
    location: {
      lat: lat,
      lng: lng,
    }
  });
};

const generateAdDescriptions = () => Array.from({length: QUANTITY_OF_DISCRIPTIONS}, createAdDescription);

export { generateAdDescriptions };
