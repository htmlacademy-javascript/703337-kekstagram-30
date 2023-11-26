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

function getArrayNextComments (arr) {
  const arrayComments = [...arr];
  //console.log('массив комментариев', arrayComments);
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
    //console.log('result', nextComments)
    return nextComments;
  };
}

function renderComments (arr){
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
  //console.log(commentsFragment.childElementCount);
  return commentsFragment;
}

const loadNextComments = () => {
  const getNextComments = getArrayNextComments(arrayOfComments);
  commentsList.appendChild(renderComments(getNextComments()));
  pictureCommentsShown.textContent = commentsList.children.length;
};

function showBigPicture(evt, arrayPictures){
  pictureUrl.src = evt.target.getAttribute('src');
  pictureLikes.textContent = evt.target.closest('.picture')
    .querySelector('.picture__likes').textContent;

  pictureCommentsAll.textContent = evt.target.closest('.picture')
    .querySelector('.picture__comments').textContent;
  pictureDescription.textContent = evt.target.alt;
  const currentPicture = arrayPictures.find(({id}) => id === Number(evt.target.dataset.id));
  arrayOfComments = [...currentPicture.comments];
  const commentsArray = [...currentPicture.comments];
  const getNextComments = getArrayNextComments(commentsArray);
  if (currentPicture !== undefined){
    commentsList.innerHTML = '';
    commentsList.appendChild(renderComments(getNextComments()));
    pictureCommentsShown.textContent = commentsList.children.length;
  }
}

export {showBigPicture, loadNextComments};
