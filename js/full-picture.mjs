import {picturesList, blockMiniatures} from './miniature.mjs';
export const bigPicture = document.querySelector('.big-picture');

const picturesCollection = picturesList.getElementsByClassName('picture');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsFragment = document.createDocumentFragment();
const commentEl = bigPicture.querySelector('.social__comment').cloneNode(true);

function createBigPicture(evt){
  commentsList.innerHTML = '';
  for(let i = 0; i < picturesCollection.length; i++){
    if(picturesCollection[i] === evt.target.closest('.picture')){
      console.log(blockMiniatures[i].comments)
      blockMiniatures[i].comments.forEach(({avatar, message, name}) => {
        const commentElement = commentEl.cloneNode(true);
        commentElement.querySelector('.social__picture').src = avatar;
        commentElement.querySelector('.social__picture').alt = name;
        commentElement.querySelector('.social__text').textContent = message;
        commentsFragment.appendChild(commentElement);
      });
    }
  }

  commentsList.appendChild(commentsFragment);

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = evt.target.getAttribute('src');
  bigPicture.querySelector('.likes-count').textContent = evt.target.closest('.picture')
    .querySelector('.picture__likes').textContent;
  bigPicture.querySelector('.social__comment-shown-count').textContent = commentsList.children.length;
  bigPicture.querySelector('.social__comment-total-count').textContent = evt.target.closest('.picture')
    .querySelector('.picture__comments').textContent;

  bigPicture.querySelector('.social__caption').textContent = evt.target.alt;

}
export{createBigPicture, commentsList};
