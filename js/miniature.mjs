import {generateObj} from './data.mjs';
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesList = document.querySelector('.pictures');

const blockMiniatures = generateObj(2);
const miniaturesFragment = document.createDocumentFragment();

blockMiniatures.forEach(({url, description, likes, comments})=>{
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  miniaturesFragment.appendChild(pictureElement);
});

picturesList.appendChild(miniaturesFragment);
