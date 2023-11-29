import {isEscapeKey} from './util.js';
import{showBigPicture, onLoadNextComments} from './full-picture.js';

const body = document.querySelector('body');
const picturesList = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const userModalClosePicture = bigPicture.querySelector('.big-picture__cancel');
const buttonLoadComments = bigPicture.querySelector('.social__comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

function openPictureModal () {
  return function(evt, arrayPictures){
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
    bigPicture.querySelector('.comments-loader').classList.remove('hidden');
    body.classList.add('modal-open');
    showBigPicture(evt, arrayPictures);
    buttonLoadComments.addEventListener('click', onLoadNextComments);
    userModalClosePicture.addEventListener('click', closePictureModal);
    document.addEventListener('keydown', onDocumentKeydown);
  };
}

function closePictureModal () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

function openBigPicture(arrMiniatures){
  const openPicture = openPictureModal();
  picturesList.addEventListener('click', (evt)=>{
    if(evt.target.closest('.picture') || evt.target.closest('.picture__info')){
      openPicture(evt, arrMiniatures);
    }
  });
}

export{openPictureModal,closePictureModal, openBigPicture};
