import {generatePictures} from './miniature.js';
import {openBigPicture} from './picture-modal.js';
import './upload-picture.js';
import { debounce } from './util.js';
import { setUserFormSubmit } from './form-validate.js';
import { onClosePictureOverlay } from './upload-picture.js';
import { showErrorLoadMessage, showPostSuccessMessage, showPostErrorMessage} from './message-modal';
import {getData} from './api.js';
import { showFilters, filterRandom, setDefaultClick, setRandomClick, setDiscussedClick, filterDiscussed, clearPicturesList } from './filter.js';
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
      const getRandomElements = filterRandom(data);
      const arrayRandomElements = getRandomElements();
      generatePictures(arrayRandomElements);
    }, RERENDER_DELAY,));

    setDiscussedClick(debounce(() => {
      clearPicturesList();
      const arrayDiscussedElement = filterDiscussed(data);
      generatePictures(arrayDiscussedElement);
    }, RERENDER_DELAY,));

    openBigPicture(data);
  })
  .catch((e) => {
    showErrorLoadMessage();
    console.error(e);
  });

setUserFormSubmit(onClosePictureOverlay, showPostSuccessMessage, showPostErrorMessage);

