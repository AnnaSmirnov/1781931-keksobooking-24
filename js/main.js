function getRandomInteger(min, max) {
  if (min < 0 || max < 0){
    const errorRange = 'Некорректное значение диапазона';
    return errorRange;
  }
  if (min === max) {
    return max;
  }
  if (max < min) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

getRandomInteger();

function getRandomFloat(min, max, numberOfDecimalPlace) {
  if (min < 0 || max < 0){
    const errorRange = 'Некорректное значение диапазона';
    return errorRange;
  }
  if (min === max) {
    return max;
  }
  if (max < min) {
    [min, max] = [max, min];
  }
  const randomFloat = (Math.random() * (max - min) + min);
  return randomFloat.toFixed(numberOfDecimalPlace);
}

getRandomFloat();

//задание
const getRandomArrayElement = (elements) => {
  return elements[_.random(0, elements.length - 1)];
};

//autor
const ITEMS = [];
const NUMBER_OF_ITEMS = 10;
for (let i = 0; i < NUMBER_OF_ITEMS; i++) {
  let avatarObject = '';
  let avatarNumber = getRandomInteger(1, 10);
  if (avatarNumber < 10) {
    avatarNumber = '0' + {avatarNumber};
  };
  avatarObject = 'img/avatars/user{avatarNumber}.png';
}

const author = () => {
  return {
    avatar: avatarObject,
  };
};

// offer
const INTEGER_PRICE = getRandomInteger(0, 100000);

const TYPES_HOUSING = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TYPE_HOUSING_NUMBER = TYPES_HOUSING[getRandomInteger(0, 4)];

const NUMBER_ROOMS = getRandomInteger(1, 10);

const NUMBER_GUESTS = getRandomInteger(1, 10);

const CHECKIN_TIME = ['12:00', '13:00', '14:00'];
const CHECKIN_TIME_NUMBER = CHECKIN_TIME[getRandomInteger(0, 2)];

const CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIME_NUMBER = CHECKOUT_TIME[getRandomInteger(0, 2)];

const FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const FEATURES_LIST_NUMBER = getRandomArrayElement(FEATURES_LIST);

const PHOTOS_LIST = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const PHOTOS_LIST_NUMBER = getRandomArrayElement(PHOTOS_LIST);

//location

const LAT_NUMBER = getRandomFloat(35.65, 35.7, 5);

const LNG_NUMBER = getRandomFloat(139.7, 139.8, 5);

const OFFER_ADDRESS = `${LAT_NUMBER}, ${LNG_NUMBER}`;


const offer = () => {
  return {
    title: 'Давайте выберем идеальное жилье!',
    address: OFFER_ADDRESS,
    price: INTEGER_PRICE,
    type: TYPE_HOUSING_NUMBER,
    rooms: NUMBER_ROOMS,
    guests: NUMBER_GUESTS,
    checkin: CHECKIN_TIME_NUMBER,
    checkout: CHECKOUT_TIME_NUMBER,
    features: FEATURES_LIST_NUMBER,
    description: 'Здесь есть все для комфортного проживания.',
    photos: PHOTOS_LIST_NUMBER
  };
};

const location = () => {
  return {
    lat: LAT_NUMBER,
    lng: OFFER_ADDRESS
  };
};
