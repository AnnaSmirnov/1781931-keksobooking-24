import {getRandomInteger, getRandomFloat, getRandomItemsArray} from './utils.js';

const INTEGER_PRICE = getRandomInteger(0, 100000);

const TYPES_HOUSING = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TYPE_HOUSING_NUMBER = TYPES_HOUSING[getRandomInteger(0, 4)];

const NUMBER_ROOMS = getRandomInteger(1, 10);

const NUMBER_GUESTS = getRandomInteger(1, 10);

const CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKIN_TIME_NUMBER = CHECKIN_TIME[getRandomInteger(0, 2)];

const CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUT_TIME_NUMBER = CHECKOUT_TIME[getRandomInteger(0, 2)];

const FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const createRandomFeatures = () => getRandomItemsArray(FEATURES_LIST);

const PHOTOS_LIST = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const createRandomPhotos = () => getRandomItemsArray(PHOTOS_LIST);

const LAT_NUMBER = getRandomFloat(35.65, 35.7, 5);

const LNG_NUMBER = getRandomFloat(139.7, 139.8, 5);

const OFFER_ADDRESS = `${LAT_NUMBER}, ${LNG_NUMBER}`;

const CHOSEN_HOUSING_COUNT = 10;

// Функция создания автора объявления

const createAuthor = () => {
  const avatarNumber = getRandomInteger(1, 10);
  if (avatarNumber >= 10) {
    return {avatar: `img/avatars/user${avatarNumber}.png`};
  }
  return {avatar: `img/avatars/user0${avatarNumber}.png`};
};

// Функция создания координат

const createLocation = () => ({
  lat: LAT_NUMBER,
  lng: LNG_NUMBER,
});

// Функция создания объявления

const createOffer = () => ({
  title: 'Давайте выберем идеальное жилье!',
  address: OFFER_ADDRESS,
  price: INTEGER_PRICE,
  type: TYPE_HOUSING_NUMBER,
  rooms: NUMBER_ROOMS,
  guests: NUMBER_GUESTS,
  checkin: CHECKIN_TIME_NUMBER,
  checkout: CHECKOUT_TIME_NUMBER,
  features: createRandomFeatures(),
  description: 'Здесь есть все для комфортного проживания.',
  photos: createRandomPhotos(),
});

const createChosenHousing = () =>
  ({
    author: createAuthor (),
    offer: createOffer(),
    location: createLocation(),
  });

const createAnnouncement = () => {
  Array.from({length: CHOSEN_HOUSING_COUNT}, createChosenHousing);
};

export {createAnnouncement};
