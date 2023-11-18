const form = document.querySelector('.img-upload__form');
const imgUploadPreview = form.querySelector('.img-upload__preview');
const editPicture = imgUploadPreview.getElementsByTagName('img');
const effectsList = form.querySelector('.effects__list');
const listItems = effectsList.children;
const effectLevel = form.querySelector('.img-upload__effect-level');
const sliderElement = effectLevel.querySelector('.effect-level__slider');
const effectLevelValue = form.querySelector('.effect-level__value');

const typesOfEffects = {
  none: {
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
    step: 1,
    measure: '',
  },
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    measure: '',
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    measure: '',
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
    step: 1,
    measure: '%',
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 0,
    step: 0.1,
    measure: 'px',
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 1,
    step: 0.1,
  },
};
const sortUpdate = {
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',//%
  phobos: 'blur',//px
  heat: 'brightness',
};
let type = '';

const getTypeOfEffect = (value) => typesOfEffects[value];

const updatingSlider = () => {

  effectLevelValue.value = Number(sliderElement.noUiSlider.get());
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
  effectLevelValue.value = sliderElement.noUiSlider.options.start;
  editPicture[0].style.filter = 'none';
  if (evt.target.checked && evt.target.value !== 'none'){
    effectLevel.classList.remove('visually-hidden');
    sliderElement.noUiSlider.updateOptions(getTypeOfEffect(evt.target.value));

    editPicture[0].style.filter = `${sortUpdate[evt.target.value]}(${sliderElement.noUiSlider.options.range.min})`;
    effectLevelValue.value = sliderElement.noUiSlider.options.range.min;
  }
};

const initEffects = () => {
  noUiSlider.create(sliderElement, getTypeOfEffect('none'));
  listItems[0].querySelector('input').checked = true;
  effectLevel.classList.add('visually-hidden');
  editPicture[0].style.filter = '';
  effectLevelValue.value = '';

  for(const item of listItems){
    item.querySelector('input').addEventListener('change', changeEffects);
  }
  sliderElement.noUiSlider.on('update', updatingSlider);
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

