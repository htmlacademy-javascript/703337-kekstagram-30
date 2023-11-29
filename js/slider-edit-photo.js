const form = document.querySelector('.img-upload__form');
const imgUploadPreview = form.querySelector('.img-upload__preview');
const editPicture = imgUploadPreview.getElementsByTagName('img');
const effectList = form.querySelector('.effects__list');
const listItem = effectList.children;
const effectLevel = form.querySelector('.img-upload__effect-level');
const sliderElement = effectLevel.querySelector('.effect-level__slider');
const effectLevelValue = form.querySelector('.effect-level__value');

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

const onUpdateSlider = () => {
  effectLevelValue.value = Number(sliderElement.noUiSlider.get());
  if(type === 'marvin'){
    editPicture[0].style.filter = `${sortUpdate[type]}(${sliderElement.noUiSlider.get()}%)`;
  } else if(type === 'phobos'){
    editPicture[0].style.filter = `${sortUpdate[type]}(${sliderElement.noUiSlider.get()}px)`;
  } else{
    editPicture[0].style.filter = `${sortUpdate[type]}(${sliderElement.noUiSlider.get()})`;
  }
};

const onChangeEffects = (evt) => {
  type = evt.target.value;
  effectLevel.classList.add('visually-hidden');
  sliderElement.noUiSlider.updateOptions(getTypeOfEffect(evt.target.value));
  editPicture[0].style.filter = 'none';
  if (evt.target.checked && evt.target.value !== 'none'){
    effectLevel.classList.remove('visually-hidden');
    sliderElement.noUiSlider.updateOptions(getTypeOfEffect(evt.target.value));
    editPicture[0].style.filter = `${sortUpdate[evt.target.value]}(${sliderElement.noUiSlider.options.start}${typesOfEffects.measure})`;
  }
};

const initEffects = () => {
  noUiSlider.create(sliderElement, getTypeOfEffect('none'));
  listItem[0].querySelector('input').checked = true;
  effectLevel.classList.add('visually-hidden');
  editPicture[0].style.filter = '';
  effectLevelValue.value = '';
  sliderElement.noUiSlider.on('update', onUpdateSlider);

  for(const item of listItem){
    item.querySelector('input').addEventListener('change', onChangeEffects);
  }
};

const resetSlider = () => {
  sliderElement.removeEventListener('update', onUpdateSlider);
  for(const item of listItem){
    item.removeEventListener('change', onChangeEffects);
  }
  type = '';
  editPicture[0].style.filter = '';
  sliderElement.noUiSlider.destroy();
  effectLevelValue.value = '';
};

export{initEffects, resetSlider};

