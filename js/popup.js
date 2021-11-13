//import {getRandomInteger, getRandomFloat, getRandomItemsArray,getRandomArrayElement} from './utils.js';
//import {TITLES,TYPES_HOUSING,CHECKIN_TIME,CHECKOUT_TIME,FEATURES_LIST,DESCRIPTION,PHOTOS_LIST} from './data.js';
/*
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

*/
//const cardTemplate = document.querySelector('#card').content;
//const popup = cardTemplate.querySelector('.popup');

const createAvatars = (advert, cardElement) => {
  if (advert.author.avatar) {
    cardElement.querySelector('.popup__avatar').src = advert.author.avatar;
  } else {
    cardElement.querySelector('.popup__avatar').remove();
  }
};

const createImages = (advert, cardElement) => {
  const photos =  cardElement.querySelector('.popup__photos');
  const photo = photos.querySelector('.popup__photo');
  if (advert.offer.photos === undefined || advert.offer.photos.length === 0) {
    photos.remove();
  }
  for (let k = 0; k < advert.offer.photos.length; k++) {
    const clonedPhoto = photo.cloneNode();
    clonedPhoto.src = advert.offer.photos[k];
    photos.appendChild(clonedPhoto);
  }
  photo.remove();
};

const getFlatType = (flatType) => {
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
};

const createCard = (advert, cardElement) => {
  createAvatars(advert, cardElement);
  createImages(advert, cardElement);
  for (let i = 0; i < advert.length; i++) {
    if (advert.offer.title) {
      cardElement.querySelector('.popup__title').textContent = advert.offer.title;
    } else {
      cardElement.querySelector('.popup__title').remove();
    }
    if (advert.offer.address) {
      cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
    } else {
      cardElement.querySelector('.popup__text--address').remove();
    }
    if (advert.offer.price) {
      cardElement.querySelector('.popup__text--price').textContent = `${advert.offer.price} ₽/ночь`;
    } else {
      cardElement.querySelector('.popup__text--price').remove();
    }
    if (advert.offer.type) {
      cardElement.querySelector('.popup__type').textContent = getFlatType(advert.offer.type);
    } else {
      cardElement.querySelector('.popup__type').remove();
    }
    if (advert.offer.rooms && advert.offer.guests) {
      cardElement.querySelector('.popup__text--capacity').textContent = `${advert.offer.rooms} комнаты для
    ${advert.offer.guests} гостей`;
    } else {
      cardElement.querySelector('.popup__text--capacity').remove();
    }
    if (advert.offer.checkin && advert.offer.checkout) {
      cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
    } else {
      cardElement.querySelector('.popup__text--time').remove();
    }
    if (advert.offer.description) {
      cardElement.querySelector('.popup__description').textContent = advert.offer.description;
    } else {
      cardElement.querySelector('.popup__description').remove();
    }
  }
};

/*
const adverts = [];
for (let i = 0; i < 10; i++) {
  adverts[i] = createCard(i);
}

const addAdvertsCards = (advertsArray) => {
  for (let i = 0; i < advertsArray.length; i++) {
    cards[i] = popup.cloneNode(true);
  }
  createCard(advertsArray, cards);
};
*/
export {createCard};

