import {isEscapeKey} from './util.js';
import {changeScalePhoto, changeButtonBiggerDisabled} from './change-scale-picture.js';
import {initEffects, resettingSlider} from'./slider-edit-photo.js';

const body = document.querySelector('body');
const imgUpload = document.querySelector('.img-upload');
const uploadPhoto = imgUpload.querySelector('.img-upload__input');
const pictureOverlay = imgUpload.querySelector('.img-upload__overlay');
const closeButtonPictureOverlay = pictureOverlay.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const scaleSmaller = form.querySelector('.scale__control--smaller');
const scaleBigger = form.querySelector('.scale__control--bigger');

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
  openPictureOverlay();
});

function openPictureOverlay (){
  pictureOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  changeButtonBiggerDisabled();
  changeScalePhoto();
  initEffects();
  //setUserFormSubmit();
  //formValidate();
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
  pictureOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadPhoto.value = '';
  hashtagField.value = '';
  commentField.value = '';
  editPicture[0].style.transform = 'scale(1)';
  scaleSmaller.disabled = false;
  scaleBigger.disabled = false;
  hashtagField.closest('.img-upload__field-wrapper').classList.remove('img-upload__field-wrapper--error');
  commentField.closest('.img-upload__field-wrapper').classList.remove('img-upload__field-wrapper--error');
  resettingSlider();

  hashtagField.removeEventListener('keydown', onHashtagKeydown);
  commentField.removeEventListener('keydown', onCommentKeydown);
  document.removeEventListener('keydown', onDocumentKeydown);
}

export {closePictureOverlay};
