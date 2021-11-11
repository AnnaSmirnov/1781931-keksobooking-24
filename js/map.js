import {makesPageInactive, makesPageActive} from './form.js';
import {createCard} from './popup.js';


const MAP_CENTER_LAT = 35.68390;
const MAP_CENTER_LNG = 139.75323;
const address = document.querySelector('#address');

makesPageInactive();

// Создание карты
const map = L.map('map-canvas')
  .on('load', () => {
    makesPageActive();
  })
  .setView({
    lat: MAP_CENTER_LAT,
    lng: MAP_CENTER_LNG,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Cоздание основной метки
const mainPinIcon = L.icon ({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// Добавление метки на карту
const mainPinMarker = L.marker(
  {
    lat: MAP_CENTER_LAT,
    lng: MAP_CENTER_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

//  Получение координат
mainPinMarker.on('moveend', (evt) => {
  const mainPinLocation = evt.target.getLatLng();
  const coordinates = `${(mainPinLocation.lat).toFixed(5)}, ${(mainPinLocation.lng).toFixed(5)}`;
  address.value = coordinates;
});


// Возвращает метку и карту к исходному состоянию
const resetMap = () => {
  map.setView({
    lat: MAP_CENTER_LAT,
    lng: MAP_CENTER_LAT,
  }, 10);
  mainPinMarker.setLatLng({
    lat: MAP_CENTER_LAT,
    lng: MAP_CENTER_LAT,
  });
  address.value =`${MAP_CENTER_LAT}, ${MAP_CENTER_LNG}`;
};

//создание popup
const createCustomPopup = (point) => {
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);
  createCard(point, popupElement);

  return popupElement;
};

// Отображение меток объявлений
const  createPointsOfMap = (data) => {
  data.forEach((offer) => {
    const lat = offer.location.lat;
    const lng = offer.location.lng;
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );
    marker
      .addTo(map)
      .bindPopup(createCustomPopup(offer));
  });
};

export {
  createPointsOfMap,
  resetMap
};
