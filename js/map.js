import {makesPageActive} from './form.js';
import {createCustomPopup} from './popup.js';

const MAP_CENTER_LAT = 35.68390;
const MAP_CENTER_LNG = 139.75323;
const address = document.querySelector('#address');

const mapData = {
  markers: [],
};

const map = L.map('map-canvas')
  .on('load', () => {
    makesPageActive();
  })
  .setView({
    lat: MAP_CENTER_LAT,
    lng: MAP_CENTER_LNG,
  }, 14);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPin = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: MAP_CENTER_LAT,
    lng: MAP_CENTER_LNG,
  },
  {
    draggable: true,
    icon: mainPin,
  },
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const renderMarkers = (offers) => {
  offers.forEach((element) =>{

    const pin = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: element.location.lat,
        lng: element.location.lng,
      },
      {
        icon:pin,
      },
    );

    marker
      .addTo(map)
      .bindPopup(createCustomPopup(element));
    mapData.markers.push(marker);
  });
};


const removeMarkers = () => {
  mapData.markers.forEach((marker) => marker.remove());
  mapData.markers = [];
};

const resetMarker = () => {
  mainMarker.setLatLng({
    lat: MAP_CENTER_LAT,
    lng: MAP_CENTER_LNG,
  });
  address.value = `${mainMarker.getLatLng().lat.toFixed(5)}, ${mainMarker.getLatLng().lng.toFixed(5)}`;
};

export {renderMarkers,removeMarkers,resetMarker,map};

