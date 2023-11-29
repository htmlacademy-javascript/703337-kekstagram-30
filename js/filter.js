import { getRandomInteger } from './util';
const buttonFilterDefault = document.querySelector('#filter-default');
const buttonFilterRandom = document.querySelector('#filter-random');
const buttonFilterDiscussed = document.querySelector('#filter-discussed');
const pictureFilter = document.querySelector('.img-filters');
const filtersForm = pictureFilter.querySelector('.img-filters__form');
const buttonList = filtersForm.getElementsByTagName('button');
const pictureList = document.querySelector('.pictures');
const ELEMENTS_COUNT = 10;

const showFilters = () => {
  pictureFilter.classList.remove('img-filters--inactive');
};

const filterDefault = (arr) => arr;

const filterRandom = (arr) => {
  const arrayOfObject = arr.map((item) => ({
    id: item.id,
    url: item.url,
    likes: item.likes,
    description: item.description,
    comments: item.comments,
  })
  );
  const arrayFilter = [];
  return function (){
    for (let i = 0; i < ELEMENTS_COUNT; i++){
      const indexInitial = getRandomInteger(0, arrayOfObject.length - 1);
      const randomObject = arrayOfObject[indexInitial];
      const randomElement = structuredClone(randomObject);
      const index = arrayOfObject.indexOf(randomObject);
      arrayOfObject.splice(index,1);
      arrayFilter.push(randomElement);
    }

    return arrayFilter;
  };
};

const clearPicturesList = () => {
  const pictureCollection = pictureList.querySelectorAll('.picture');
  for(const el of pictureCollection){
    el.remove();
  }
};

const filterDiscussed = (arr) => {
  const arrayOfObject = arr.map((item) => structuredClone(item));
  arrayOfObject.sort((a, b) => b.comments.length - a.comments.length);
  return arrayOfObject;

};

const toggleButtons = () => {
  for(const but of buttonList){
    but.classList.remove('img-filters__button--active');
  }
};

const setDefaultClick = (cb) => {
  buttonFilterDefault.addEventListener('click', () => {
    toggleButtons();
    buttonFilterDefault.classList.add('img-filters__button--active');
    cb();
  });
};

const setRandomClick = (cb1) => {
  buttonFilterRandom.addEventListener('click', () => {
    toggleButtons();
    buttonFilterRandom.classList.add('img-filters__button--active');
    cb1();
  });
};

const setDiscussedClick = (cb2) => {
  buttonFilterDiscussed.addEventListener('click', () => {
    toggleButtons();
    buttonFilterDiscussed.classList.add('img-filters__button--active');
    cb2();
  });
};

export {showFilters, filterRandom, filterDiscussed,filterDefault, setDefaultClick, setRandomClick, setDiscussedClick, clearPicturesList};
