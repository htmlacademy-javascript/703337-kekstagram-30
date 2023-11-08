import {NUMBERS_ID} from './const.js';
import {getRandomInteger, generateRandomArrayElement, createComment} from './util.js';

const getRandomArrayElement = generateRandomArrayElement(NUMBERS_ID);
const getRandomPhoto = generateRandomArrayElement(NUMBERS_ID);

function createObj (){
  return {
    id: getRandomArrayElement(),
    url: `photos/${getRandomPhoto()}.jpg`,
    description: 'Фото как фото',
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
  };
}

function generateObj(length){
  return Array.from({length: length}, createObj);
}

export {generateObj};
