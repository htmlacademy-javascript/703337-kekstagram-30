import { changeButtonBiggerDisabled } from './change-scale-picture';
const form = document.querySelector('.img-upload__form');
const imgUploadPreview = form.querySelector('.img-upload__preview');
const editPicture = imgUploadPreview.getElementsByTagName('img');
const effectsList = form.querySelector('.effects__list');
const listItems = effectsList.children;
const effectLevel = form.querySelector('.img-upload__effect-level');
const sliderElement = effectLevel.querySelector('.effect-level__slider');
const effectLevelValue = form.querySelector('.effect-level__value');
const scaleValue = form.querySelector('.scale__control--value');
const initialScaleValue = '100%';
const typesOfEffects = {
  none: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    measure: '',
  },
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    measure: '',
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    measure: '',
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    measure: '%',
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    measure: 'px',
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    measure: '',
  },
};
const sortUpdate = {
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness',
};
let type = '';

const getTypeOfEffect = (value) => typesOfEffects[value];

const updatingSlider = () => {
  effectLevelValue.value = Number(sliderElement.noUiSlider.get());
  console.log(effectLevelValue.value)
  if(type === 'marvin'){
    editPicture[0].style.filter = `${sortUpdate[type]}(${sliderElement.noUiSlider.get()}%)`;
  } else if(type === 'phobos'){
    editPicture[0].style.filter = `${sortUpdate[type]}(${sliderElement.noUiSlider.get()}px)`;
  } else{
    editPicture[0].style.filter = `${sortUpdate[type]}(${sliderElement.noUiSlider.get()})`;
  }
};

const changeEffects = (evt) => {
  type = evt.target.value;
  effectLevel.classList.add('visually-hidden');
  sliderElement.noUiSlider.updateOptions(getTypeOfEffect(evt.target.value));
  scaleValue.value = initialScaleValue;
  editPicture[0].style.transform = 'scale(1)';
  changeButtonBiggerDisabled();
  editPicture[0].style.filter = 'none';
  if (evt.target.checked && evt.target.value !== 'none'){
    effectLevel.classList.remove('visually-hidden');
    sliderElement.noUiSlider.updateOptions(getTypeOfEffect(evt.target.value));
    console.log(sliderElement.noUiSlider.options.start)
    editPicture[0].style.filter = `${sortUpdate[evt.target.value]}(${sliderElement.noUiSlider.options.start}${typesOfEffects.measure})`;
    //effectLevelValue.value = sliderElement.noUiSlider.options.start;
    console.log(effectLevelValue.value)
  }
};

const initEffects = () => {
  noUiSlider.create(sliderElement, getTypeOfEffect('none'));
  listItems[0].querySelector('input').checked = true;
  effectLevel.classList.add('visually-hidden');
  editPicture[0].style.filter = '';
  effectLevelValue.value = '';

  sliderElement.noUiSlider.on('update', updatingSlider);

  for(const item of listItems){
    item.querySelector('input').addEventListener('change', changeEffects);
  }
};

const resettingSlider = () => {
  sliderElement.removeEventListener('update', updatingSlider);
  for(const item of listItems){
    item.removeEventListener('change', changeEffects);
  }
  type = '';
  editPicture[0].style.filter = '';
  sliderElement.noUiSlider.destroy();
  effectLevelValue.value = '';
};

export{initEffects, resettingSlider};

