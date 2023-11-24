const bigPicture = document.querySelector('.big-picture');
const picturesList = document.querySelector('.pictures');
const picturesCollection = picturesList.getElementsByClassName('picture');

const commentsList = bigPicture.querySelector('.social__comments');
const commentsFragment = document.createDocumentFragment();
const commentEl = bigPicture.querySelector('.social__comment').cloneNode(true);


const pictureUrl = bigPicture.querySelector('.big-picture__img').querySelector('img');
const pictureLikes = bigPicture.querySelector('.likes-count');
const pictureCommentsAll = bigPicture.querySelector('.social__comment-total-count');
const pictureCommentsShown = bigPicture.querySelector('.social__comment-shown-count');
const pictureDescription = bigPicture.querySelector('.social__caption');

function showBigPicture(evt, arrayPictures){
  pictureUrl.src = evt.target.getAttribute('src');
  pictureLikes.textContent = evt.target.closest('.picture')
    .querySelector('.picture__likes').textContent;
  pictureCommentsShown.textContent = commentsList.children.length;
  pictureCommentsAll.textContent = evt.target.closest('.picture')
    .querySelector('.picture__comments').textContent;
  pictureDescription.textContent = evt.target.alt;
  const currentPicture = arrayPictures.find(({id}) => id === Number(evt.target.dataset.id));
  if (currentPicture !== undefined){
    currentPicture.comments.forEach(({avatar, message, name}) => {
      const commentElement = commentEl.cloneNode(true);
      commentElement.querySelector('.social__picture').src = avatar;
      commentElement.querySelector('.social__picture').alt = name;
      commentElement.querySelector('.social__text').textContent = message;
      commentsFragment.appendChild(commentElement);
    });
  }

  commentsList.replaceChildren(commentsFragment);
}

export {showBigPicture, commentsList};
