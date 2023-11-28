import {generatePictures} from './miniature.js';
import {openBigPicture} from './picture-modal.js';
import './upload-picture.js';
import { debounce } from './util.js';
import { setUserFormSubmit } from './form-validate.js';
import { closePictureOverlay } from './upload-picture.js';
import { showErrorLoadMessage, showPostSuccessMessage, showPostErrorMessage} from './message-modal';
import {getData} from './api.js';
import { showFilters, filteredRandom, setDefaultClick, setRandomClick, setDiscussedClick, filteredDiscussed, clearPicturesList } from './filter.js';
const RERENDER_DELAY = 500;

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

    setDefaultClick(debounce(() =>{
      clearPicturesList();
      generatePictures(data);
    }
    , RERENDER_DELAY,));

    setRandomClick(debounce(() => {
      clearPicturesList();
      const getRandomElements = filteredRandom(data);
      const arrayRandomElements = getRandomElements();
      generatePictures(arrayRandomElements);
    }, RERENDER_DELAY,));

    setDiscussedClick(debounce(() => {
      const arrayDiscussedElement = filteredDiscussed(data);
      clearPicturesList();
      generatePictures(arrayDiscussedElement);
    }, RERENDER_DELAY,));

    openBigPicture(data);
  })
  .catch((e) => {
    showErrorLoadMessage();
    console.error(e);
  });

setUserFormSubmit(closePictureOverlay, showPostSuccessMessage, showPostErrorMessage);

