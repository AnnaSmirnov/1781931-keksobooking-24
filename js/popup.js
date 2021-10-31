import {getRandomInteger, getRandomFloat, getRandomItemsArray,getRandomArrayElement} from './utils.js';
import {TITLES,TYPES_HOUSING,CHECKIN_TIME,CHECKOUT_TIME,FEATURES_LIST,DESCRIPTION,PHOTOS_LIST} from './data.js';

const ADVERT_COUNT = 10;

const createAvatar = () => {
  const avatarNumber = getRandomInteger(1, ADVERT_COUNT);
  if (avatarNumber >= 10) {
    return {avatar: `img/avatars/user${avatarNumber}.png`};
  }
  return {avatar: `img/avatars/user0${avatarNumber}.png`};
};

const createAdvert =() => {
  const LAT_NUMBER = getRandomFloat(35.65, 35.7, 5);
  const LNG_NUMBER = getRandomFloat(139.7, 139.8, 5);

  return {
    author: createAvatar(),
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${LAT_NUMBER}, ${LNG_NUMBER}`,
      price: getRandomInteger(0, 100000),
      type: getRandomArrayElement(TYPES_HOUSING),
      rooms: getRandomInteger(1, 10),
      guests: getRandomInteger(1, 10),
      checkin: getRandomArrayElement(CHECKIN_TIME),
      checkout: getRandomArrayElement(CHECKOUT_TIME),
      features: getRandomItemsArray(FEATURES_LIST),
      description: getRandomArrayElement(DESCRIPTION),
      photos: getRandomItemsArray(PHOTOS_LIST),
    },
    location: {
      lat: LAT_NUMBER,
      lng: LNG_NUMBER,
    },
  };
};

const adverts = [];
for (let i = 0; i < ADVERT_COUNT; i++) {
  adverts[i] = createAdvert(i);
}

const cardTemplate = document.querySelector('#card').content;
const popup = cardTemplate.querySelector('.popup');
const cards = [];


function createAvatars(advertsArray) {
  for (let i = 0; i < advertsArray.length; i++) {
    if (advertsArray[i].author.avatar) {
      cards[i].querySelector('.popup__avatar').src = advertsArray[i].author.avatar;
    } else {
      cards[i].querySelector('.popup__avatar').remove();
    }
  }
}

function createImages(advertsArray) {
  for (let i = 0; i < advertsArray.length; i++) {
    const photos = cards[i].querySelector('.popup__photos');
    const photo = photos.querySelector('.popup__photo');
    if (advertsArray[i].offer.photos === undefined || advertsArray[i].offer.photos.length === 0) {
      photos.remove();
    }
    for (let k = 0; k < advertsArray[i].offer.photos.length; k++) {
      const clonedPhoto = photo.cloneNode();
      clonedPhoto.src = advertsArray[i].offer.photos[k];
      photos.appendChild(clonedPhoto);
    }
    photo.remove();
  }
}

function getFlatType(flatType) {
  if (flatType === 'flat') {
    return 'Квартира';
  } else if (flatType === 'bungalow') {
    return 'Бунгало';
  } else if (flatType === 'house') {
    return 'Дом';
  } else if (flatType === 'palace') {
    return 'Дворец';
  } else if (flatType === 'hotel') {
    return 'Отель';
  }
}


function createCards(advertsArray) {
  createAvatars(advertsArray);
  createImages(advertsArray);
  for (let i = 0; i < advertsArray.length; i++) {
    if (advertsArray[i].offer.title) {
      cards[i].querySelector('.popup__title').textContent = advertsArray[i].offer.title;
    } else {
      cards[i].querySelector('.popup__title').remove();
    }
    if (advertsArray[i].offer.address) {
      cards[i].querySelector('.popup__text--address').textContent = advertsArray[i].offer.address;
    } else {
      cards[i].querySelector('.popup__text--address').remove();
    }
    if (advertsArray[i].offer.price) {
      cards[i].querySelector('.popup__text--price').textContent = `${advertsArray[i].offer.price} ₽/ночь`;
    } else {
      cards[i].querySelector('.popup__text--price').remove();
    }
    if (advertsArray[i].offer.type) {
      cards[i].querySelector('.popup__type').textContent = getFlatType(advertsArray[i].offer.type);
    } else {
      cards[i].querySelector('.popup__type').remove();
    }
    if (advertsArray[i].offer.rooms && advertsArray[i].offer.guests) {
      cards[i].querySelector('.popup__text--capacity').textContent = `${advertsArray[i].offer.rooms} комнаты для
    ${advertsArray[i].offer.guests} гостей`;
    } else {
      cards[i].querySelector('.popup__text--capacity').remove();
    }
    if (advertsArray[i].offer.checkin && advertsArray[i].offer.checkout) {
      cards[i].querySelector('.popup__text--time').textContent = `Заезд после ${advertsArray[i].offer.checkin}, выезд до ${advertsArray[i].offer.checkout}`;
    } else {
      cards[i].querySelector('.popup__text--time').remove();
    }
    if (advertsArray[i].offer.description) {
      cards[i].querySelector('.popup__description').textContent = advertsArray[i].offer.description;
    } else {
      cards[i].querySelector('.popup__description').remove();
    }
  }
}

function addAdvertsCards(advertsArray) {
  for (let i = 0; i < advertsArray.length; i++) {
    cards[i] = popup.cloneNode(true);
  }
  createCards(advertsArray);
  const mapCanvas = document.querySelector('#map-canvas');
  mapCanvas.appendChild(cards[0]);
}

export {
  addAdvertsCards,adverts
};
