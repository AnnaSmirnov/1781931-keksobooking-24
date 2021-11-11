import {makesPageInactive, makesPageActive} from './form.js';


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

address.value =`${MAP_CENTER_LAT}, ${MAP_CENTER_LNG}`;

