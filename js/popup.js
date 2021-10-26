import {getRandomInteger, getRandomFloat, getRandomItemsArray,getRandomArrayElement} from './utils.js';
import {TITLES,TYPES_HOUSING,CHECKIN_TIME,CHECKOUT_TIME,FEATURES_LIST,DESCRIPTION,PHOTOS_LIST} from './data.js';

const ADVERT_COUNT = 10;

const createAdvert =() => {
  const LAT_NUMBER = getRandomFloat(35.65, 35.7, 5);
  const LNG_NUMBER = getRandomFloat(139.7, 139.8, 5);
  const createAvatar = () => {
    const avatarNumber = getRandomInteger(1, ADVERT_COUNT);
    if (avatarNumber >= 10) {
      return {avatar: `img/avatars/user${avatarNumber}.png`};
    }
    return {avatar: `img/avatars/user0${avatarNumber}.png`};
  };

  return {
    author: {
      avatar: createAvatar(),
    },
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
Array.from({length: ADVERT_COUNT}, createAdvert);


const houseType = {
  flat: 'Квартира ',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const advertTemplate = document.querySelector('#card').content.querySelector('.popup');
const advertListFragment = document.createDocumentFragment();

const advertListElement = document.querySelector('#map-canvas');


const generateAdvert = (advert) => {
  const advertCard = advertTemplate.cloneNode(true);
  advertListElement.appenedChild(advertCard);

  const title = advert.offer.title;
  const titleElement = advertCard.querySelector('.popup__title');
  if (title) {
    titleElement.textContent = title;
  } else {
    titleElement.remove();
  }

  const address = advert.offer.address;
  const addressElement = advertCard.querySelector('.popup__text--address');
  if (address) {
    addressElement.textContent = address;
  } else {
    addressElement.remove();
  }

  const price = advert.offer.price;
  const priceElement = advertCard.querySelector('.popup__text--price');
  if (price) {
    priceElement.textContent = `${price} ₽/ночь`;
  } else {
    priceElement.remove();
  }

  const type = houseType[advert.offer.type];
  const typeElement = advertCard.querySelector('.popup__type');
  if (type) {
    typeElement.textContent = type;
  } else {
    typeElement.remove();
  }

  const rooms = advert.offer.rooms;
  const guests = advert.offer.guests;
  const capacityElement = advertCard.querySelector('.popup__text--capacity');
  if (rooms && guests) {
    capacityElement.textContent = `${rooms} комнаты для ${guests} гостей`;
  } else {
    capacityElement.remove();
  }

  const checkin = advert.offer.checkin;
  const checkout = advert.offer.checkout;
  const timeElement = advertCard.querySelector('.popup__text--time');
  if (checkin && checkout) {
    timeElement.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    timeElement.remove();
  }

  const features = advert.offer.features;
  const featuresElement = advertCard.querySelector('.popup__features');
  if (features) {
    featuresElement.textContent = features;
  } else {
    featuresElement.remove();
  }

  const description = advert.offer.description;
  const descriptionElement = advertCard.querySelector('.popup__description');
  if (description) {
    descriptionElement.textContent = description;
  } else {
    descriptionElement.remove();
  }

  const photos = advert.offer.photos;
  const photosElement = advertCard.querySelector('.popup__photos');
  if(photos) {
    photosElement.src = photos;
  } else {
    photosElement.remove();
  }

  const avatar = advert.author.avatar;
  const avatarElement = advertCard.querySelector('.popup__avatar');
  if(avatar) {
    avatarElement.src = photos;
  } else {
    avatarElement.remove();
  }

  advertListFragment.appendChild(advertCard);
  advertListElement.appendChild(advertListFragment);
};

const firstAdvertItem = createAdvert(1);

export {generateAdvert,firstAdvertItem};
