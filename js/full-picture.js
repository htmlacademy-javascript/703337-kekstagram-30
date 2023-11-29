const bigPicture = document.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments');
const commentEl = bigPicture.querySelector('.social__comment').cloneNode(true);

const COMMENT_COUNT = 5;
const pictureUrl = bigPicture.querySelector('.big-picture__img').querySelector('img');
const pictureLikes = bigPicture.querySelector('.likes-count');
const pictureCommentsAll = bigPicture.querySelector('.social__comment-total-count');
const pictureCommentsShown = bigPicture.querySelector('.social__comment-shown-count');
const pictureDescription = bigPicture.querySelector('.social__caption');
const buttonLoadComments = bigPicture.querySelector('.social__comments-loader');

let arrayOfComments = [];

const getArrayNextComments = (arr) => {
  const arrayComments = [...arr];
  const index = 0;
  return () => {
    const nextComments = [];
    let i = 0;
    while(i < COMMENT_COUNT && arrayComments[i] !== undefined){
      nextComments[i] = arrayComments[i];
      i++;
    }
    arrayComments.splice(index, COMMENT_COUNT);
    arrayOfComments = [...arrayComments];
    return nextComments;
  };
};

const renderComments = (arr) => {
  const commentsFragment = document.createDocumentFragment();
  arr.forEach(({avatar, message, name}) => {
    const commentElement = commentEl.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentsFragment.appendChild(commentElement);
  });
  if (commentsFragment.childElementCount < COMMENT_COUNT){
    buttonLoadComments.classList.add('hidden');
  }
  return commentsFragment;
};

const onLoadNextComments = () => {
  const getNextComments = getArrayNextComments(arrayOfComments);
  commentsList.appendChild(renderComments(getNextComments()));
  pictureCommentsShown.textContent = commentsList.children.length;
};

const showBigPicture = (evt, arrayPictures) => {
  let currentPicture;
  let commentsArray;
  let getNextComments;
  if(evt.target.closest('.picture__info')){
    const idPicture = evt.target.closest('.picture__info').closest('.picture').firstElementChild.dataset.id;
    const imgPicture = evt.target.closest('.picture__info').closest('.picture').firstElementChild;
    currentPicture = arrayPictures.find(({id}) => id === Number(idPicture));
    arrayOfComments = [...currentPicture.comments];
    commentsArray = [...currentPicture.comments];
    getNextComments = getArrayNextComments(commentsArray);
    pictureUrl.src = imgPicture.getAttribute('src');
    pictureLikes.textContent = evt.target.closest('.picture__info').closest('.picture')
      .querySelector('.picture__likes').textContent;
    pictureCommentsAll.textContent = evt.target.closest('.picture__info').closest('.picture')
      .querySelector('.picture__comments').textContent;
    pictureDescription.textContent = evt.target.closest('.picture__info').closest('.picture').firstElementChild.alt;
  } else {
    pictureUrl.src = evt.target.getAttribute('src');
    pictureLikes.textContent = evt.target.closest('.picture')
      .querySelector('.picture__likes').textContent;

    pictureCommentsAll.textContent = evt.target.closest('.picture')
      .querySelector('.picture__comments').textContent;
    pictureDescription.textContent = evt.target.alt;
    currentPicture = arrayPictures.find(({id}) => id === Number(evt.target.dataset.id));
    arrayOfComments = [...currentPicture.comments];
    commentsArray = [...currentPicture.comments];
    getNextComments = getArrayNextComments(commentsArray);
  }

  if (currentPicture !== undefined){
    commentsList.innerHTML = '';
    commentsList.appendChild(renderComments(getNextComments()));
    pictureCommentsShown.textContent = `${commentsList.children.length}`;
  }
};

export {showBigPicture, onLoadNextComments};
