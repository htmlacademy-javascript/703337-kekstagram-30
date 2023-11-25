import { getRandomInteger } from './util';

const pictureFilter = document.querySelector('.img-filters');

const showFilters = () => {
  pictureFilter.classList.remove('img-filters--inactive');
};

const filteredDefault = (arr) => arr;

const filteredRandom = (arr) => {
  const arrayOfObjects = [...arr];
  const arrayFilter = [];

  return function (){
    const randomElement = arr[getRandomInteger(0, arr.length - 1)];
    const index = arr.indexOf(randomElement);
    arrayFilter.push(randomElement);
    arrayOfObjects.splice(index, 1);
    return arrayFilter;
  };
};
const filteredDiscussed = (arr) => {
  const elementsCount = 10;
  const index = 0;
  const arrayOfObjects = [...arr];
  let arraySorted = [];
  return function (){
    arrayOfObjects.sort((a, b) => b.comments.length - a.comments.length);
    arraySorted = arrayOfObjects.splice(index, elementsCount);
    return arraySorted;
  };
};

export {showFilters};
