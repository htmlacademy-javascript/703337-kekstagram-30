import {NUMBERS_ID, NAMES, MESSAGES} from './const.mjs';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function isString (elem) {
  return typeof elem === 'string';
}

const generateRandomArrayElement = (arr) => {
  if(arr.every(isString)){
    arr = [...NAMES];
  } else {
    arr = NUMBERS_ID.slice();
  }

  return function (){
    const randomElement = arr[getRandomInteger(0, arr.length - 1)];
    const index = arr.indexOf(randomElement);
    arr.splice(index, 1);
    return randomElement;
  };
};

const getRandomName = generateRandomArrayElement(NAMES);

function createComment(){
  return {
    id: getRandomInteger(1, 500),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
    name: getRandomName(),
  };
}

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInteger, generateRandomArrayElement, createComment, isEscapeKey};
