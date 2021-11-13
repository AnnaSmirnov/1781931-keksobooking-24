//import {adverts} from './popup.js';
import {setFormSubmit} from './form.js';
import {createPointsOfMap} from './map.js';
import {getData} from './api.js';
import {showMessageSuccess, showMessageError} from './utils.js';
//createPointsOfMap(adverts);

const ADVERT_COUNT = 10;
getData((adverts) => {
  createPointsOfMap(adverts.slice(0, ADVERT_COUNT));
});

setFormSubmit(showMessageSuccess, showMessageError);
