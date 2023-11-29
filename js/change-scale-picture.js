const form = document.querySelector('.img-upload__form');
const scaleSmaller = form.querySelector('.scale__control--smaller');
const scaleBigger = form.querySelector('.scale__control--bigger');
const scaleValue = form.querySelector('.scale__control--value');
const imgUploadPreview = form.querySelector('.img-upload__preview');
const effectsList = form.querySelector('.effects__list');
const listItems = effectsList.children;
const effectLevel = form.querySelector('.img-upload__effect-level');
const editPicture = imgUploadPreview.getElementsByTagName('img');
const STEP = 25;
const lowerValueScale = '25%';
const upperValueScale = '100%';

// function changeButtonSmallerDisabled (){
//   if(scaleValue.value === '25%'){
//     makePictureBigger();
//   } else{
//     scaleSmaller.disabled = false;
//   }
// }

// function changeButtonBiggerDisabled(){

//   if(scaleValue.value === '100%'){
//     makePictureSmaller();
//     scaleBigger.disabled = true;
//   } else{
//     scaleBigger.disabled = false;
//   }
// }

function onPictureSmaller (){
  if(scaleValue.value === lowerValueScale){
    return;
  }
  scaleValue.value = `${parseInt(scaleValue.value, 10) - STEP}%`;
  editPicture[0].style.transform = `scale(${parseInt(scaleValue.value, 10) / 100})`;
}

function onPictureBigger (){
  if(scaleValue.value === upperValueScale){
    return;
  }
  scaleValue.value = `${parseInt(scaleValue.value, 10) + STEP}%`;
  editPicture[0].style.transform = `scale(${parseInt(scaleValue.value, 10) / 100})`;
}

function changeScalePhoto (){
  if(listItems[0].querySelector('input').checked){
    effectLevel.classList.add('visually-hidden');
  }
  scaleSmaller.addEventListener('click', onPictureSmaller);
  scaleBigger.addEventListener('click', onPictureBigger);
}

export {changeScalePhoto};
