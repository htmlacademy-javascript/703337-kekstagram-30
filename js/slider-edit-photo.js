const form = document.querySelector('.img-upload__form');
const imgUploadPreview = form.querySelector('.img-upload__preview');
const editPicture = imgUploadPreview.getElementsByTagName('img');
const effectsList = form.querySelector('.effects__list');
const listItems = effectsList.children;
const effectLevel = form.querySelector('.img-upload__effect-level');
const sliderElement = effectLevel.querySelector('.effect-level__slider');
const effectLevelValue = form.querySelector('.effect-level__value');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
});

for(const item of listItems){
  item.querySelector('input').addEventListener('change', (evt) => {
    sliderElement.noUiSlider.on('update', () => {
      effectLevelValue.value = Number(sliderElement.noUiSlider.get());
    });
    if (evt.target.checked && evt.target.value === 'chrome') {
      effectLevel.classList.remove('visually-hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 0,
        step: 0.1,
      });
      editPicture[0].style.filter = `grayscale(${sliderElement.noUiSlider.options.range.min})`;
      effectLevelValue.value = sliderElement.noUiSlider.options.range.min;

      sliderElement.noUiSlider.on('update', () => {
        editPicture[0].style.filter = `grayscale(${sliderElement.noUiSlider.get()})`;
      });
    } else if(evt.target.checked && evt.target.value === 'sepia'){
      effectLevel.classList.remove('visually-hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 0,
        step: 0.1,
      });
      effectLevelValue.value = sliderElement.noUiSlider.options.range.min;
      editPicture[0].style.filter = `sepia(${sliderElement.noUiSlider.options.range.min})`;
      sliderElement.noUiSlider.on('update', () => {
        editPicture[0].style.filter = `sepia(${sliderElement.noUiSlider.get()})`;
      });
    } else if(evt.target.checked && evt.target.value === 'marvin'){
      effectLevel.classList.remove('visually-hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 0,
        step: 1,
      });
      effectLevelValue.value = sliderElement.noUiSlider.options.range.min;
      editPicture[0].style.filter = `invert(${sliderElement.noUiSlider.options.range.min}%)`;
      sliderElement.noUiSlider.on('update', () => {
        editPicture[0].style.filter = `invert(${sliderElement.noUiSlider.get()}%)` ;
      });
    } else if(evt.target.checked && evt.target.value === 'heat'){
      effectLevel.classList.remove('visually-hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 1,
        step: 0.1,
      });

      editPicture[0].style.filter = `brightness(${sliderElement.noUiSlider.options.range.min})`;
      effectLevelValue.value = sliderElement.noUiSlider.options.range.min;
      sliderElement.noUiSlider.on('update', () => {
        editPicture[0].style.filter = `brightness(${sliderElement.noUiSlider.get()})` ;
      });
    } else if(evt.target.checked && evt.target.value === 'phobos'){
      effectLevel.classList.remove('visually-hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 0,
        step: 0.1,
      });
      effectLevelValue.value = sliderElement.noUiSlider.options.range.min;
      editPicture[0].style.filter = `blur(${sliderElement.noUiSlider.options.range.min})`;
      sliderElement.noUiSlider.on('update', () => {
        editPicture[0].style.filter = `blur(${sliderElement.noUiSlider.get()}px)` ;
      });
    } else{
      effectLevel.classList.add('visually-hidden');
      effectLevelValue.value = sliderElement.noUiSlider.options.start;
      editPicture[0].style.filter = false;
      sliderElement.noUiSlider.updateOptions({
        start: 0,
      });
    }
  });
}


