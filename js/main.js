const OBJ_COUNT = 25;
const NUMBERS_ID = [
  1, 2, 3, 4, 5,
  6, 7, 8, 9, 10,
  11, 12, 13, 14, 15,
  16, 17, 18, 19, 20,
  21, 22, 23, 24, 25
];
const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг', 'Юрий', 'Путин', 'Генри', 'Людовик', 'Матвей', 'Ибрагим', 'Штольц', 'Ин Гю', 'Ашвария',
  'Марчелло', 'Анджела', 'Альба', 'Григорий', 'Тесла'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
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
const getRandomArrayElement = generateRandomArrayElement(NUMBERS_ID);
const getRandomPhoto = generateRandomArrayElement(NUMBERS_ID);
const getRandomName = generateRandomArrayElement(NAMES);

function createComment(){
  return {
    id: getRandomInteger(1, 500),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
    name: getRandomName(),
  };
}

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

