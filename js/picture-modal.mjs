import {isEscapeKey} from './util.mjs';
import{bigPicture, createBigPicture} from './full-picture.mjs';

const body = document.querySelector('body');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

function openPictureModal (evt) {
  bigPicture.classList.remove('hidden');
  //bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  body.classList.add('modal-open');
  createBigPicture(evt);
  document.addEventListener('keydown', onDocumentKeydown);
}

function closePictureModal () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
}

export{openPictureModal,closePictureModal};
