import {generatePictures} from './miniature.js';
import {openBigPicture} from './picture-modal.js';
import './upload-picture.js';
import { setUserFormSubmit } from './form-validate.js';
import { closePictureOverlay } from './upload-picture.js';
import { showErrorLoadMessage, showPostSuccsessMessage, showPostErrorMessage} from './message-modal';

import {getData} from './load.js';
import { showFilters } from './filter.js';

getData()
  .then((response) => {

    if (response.ok) {
      return response;
    }
    throw new Error(`${response.status} — ${response.statusText}`);
  })
  .then((response) => response.json())
  .then((data) => {
    generatePictures(data);
    showFilters();
    openBigPicture(data);
  })
  .catch((e) => {
    showErrorLoadMessage();
    console.error(e);
  });

setUserFormSubmit(closePictureOverlay, showPostSuccsessMessage, showPostErrorMessage);

