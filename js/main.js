import {addPinsToMap, onLoadMap} from './map.js';
import {setMapFilters,removeBlockFiltersForm} from './filters.js';
import {addBlockForm, removeBlockForm} from './form.js';
import {sendData, getData} from './api.js';
import {loadAvatar, loadFoto} from './avatar.js';

addBlockForm();

sendData();

onLoadMap(() => {
  getData((offerList) => {
    removeBlockForm();
    addPinsToMap(offerList);
    setMapFilters(offerList);
  });
  removeBlockFiltersForm();
});

loadAvatar();
loadFoto();
