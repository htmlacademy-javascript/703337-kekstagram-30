const picturesList = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const miniaturesFragment = document.createDocumentFragment();

function generatePictures(arr){
  arr.forEach(({id, url, description, likes, comments})=>{
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').dataset.id = id;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    miniaturesFragment.appendChild(pictureElement);
  });

  picturesList.appendChild(miniaturesFragment);
}

export {generatePictures};

