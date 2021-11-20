import {addPinsToMap, onLoadMap} from './map.js';
import {setMapFilters} from './filters.js';
import {makesPageInactive,makesPageActive} from './form.js';
import {sendData, getData} from './api.js';
import {loadAvatar, loadFoto} from './avatar.js';

makesPageInactive();

sendData();

onLoadMap(() => {
  getData((offerList) => {
    addPinsToMap(offerList);
    setMapFilters(offerList);
    makesPageActive();
  });
});

loadAvatar();
loadFoto();
