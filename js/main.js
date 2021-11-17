import {addPinsToMap, loadMap, setFilterForm} from './map.js';
import {makesPageInactive,activateFilterForm} from './form.js';
import {sendData, getData} from './api.js';

makesPageInactive();

sendData();

loadMap(() => {
  getData((offerList) => {
    addPinsToMap(offerList);
    setFilterForm(offerList);
    activateFilterForm();
  });
});
