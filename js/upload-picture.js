import {isEscapeKey} from './util.js';
import {changeScalePhoto, changeButtonBiggerDisabled} from './change-scale-picture.js';
import { formValidate, resetForm } from './form-validate.js';
import {initEffects, resettingSlider} from'./slider-edit-photo.js';
import {uploadPicturePreview} from './avatar.js';
const body = document.querySelector('body');
const imgUpload = document.querySelector('.img-upload');
const uploadPhoto = imgUpload.querySelector('.img-upload__input');
const pictureOverlay = imgUpload.querySelector('.img-upload__overlay');
const closeButtonPictureOverlay = pictureOverlay.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');


const imgUploadPreview = form.querySelector('.img-upload__preview');
const editPicture = imgUploadPreview.getElementsByTagName('img');
const hashtagField = pictureOverlay.querySelector('.text__hashtags');
const commentField = pictureOverlay.querySelector('.text__description');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureOverlay();
  }
};

const onHashtagKeydown = (evt) => {
  if(document.activeElement === hashtagField){
    evt.stopPropagation();
  }
};
const onCommentKeydown = (evt) => {
  if(document.activeElement === commentField){
    evt.stopPropagation();
  }
};

uploadPhoto.addEventListener('change', () => {
  uploadPicturePreview();
  openPictureOverlay();
});

function openPictureOverlay (){
  pictureOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  changeButtonBiggerDisabled();
  changeScalePhoto();
  initEffects();
  formValidate();
  closeButtonPictureOverlay.addEventListener('click', closePictureOverlay);
  hashtagField.addEventListener('keydown', onHashtagKeydown);
  commentField.addEventListener('keydown', onCommentKeydown);
  document.addEventListener('keydown', onDocumentKeydown);
}

function closePictureOverlay () {
  const isErrorMessageExist = Boolean(document.querySelector('.error'));
  if(isErrorMessageExist){
    return;
  }

  resettingSlider();
  resetForm();
  hashtagField.removeEventListener('keydown', onHashtagKeydown);
  commentField.removeEventListener('keydown', onCommentKeydown);
  document.removeEventListener('keydown', onDocumentKeydown);
}

export {closePictureOverlay};
