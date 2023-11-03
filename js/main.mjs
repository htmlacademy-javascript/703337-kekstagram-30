
import {picturesList} from './miniature.mjs';
import {closePictureModal, openPictureModal} from './picture-modal.mjs';
import{bigPicture} from './full-picture.mjs';
const userModalClosePicture = bigPicture.querySelector('.big-picture__cancel');

picturesList.addEventListener('click', (evt)=>{
  openPictureModal(evt);
});

userModalClosePicture.addEventListener('click', closePictureModal);
