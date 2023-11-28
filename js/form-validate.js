import { sendData } from './api.js';
const form = document.querySelector('.img-upload__form');
const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const uploadText = document.querySelector('.img-upload__text');
const hashtagField = uploadText.querySelector('.text__hashtags');
const commentField = uploadText.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const HASHTAGS_COUNT = 5;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const arrayHashtags = (value) => {
  const arrHashtags = value.trim().split(' ');
  for(let i = 0; i < arrHashtags.length; i++){
    arrHashtags[i] = arrHashtags[i].toLowerCase();
  }
  const newArray = arrHashtags.filter((x) => x !== '' && x !== undefined && x !== null);
  return newArray;
};

const validateHashtagsAmount = (value) => {
  const arr = arrayHashtags(value);
  return arr.length <= HASHTAGS_COUNT;
};

const validateHashtagsContent = (value) => {
  const arr = arrayHashtags(value);
  const content = arr.every((element) => hashtag.test(element));
  return content;
};

const validateHashtagsEqual = (value) => {
  const arr = arrayHashtags(value);
  const arrEqual = arr.filter((el, index, array) => array.indexOf(el) !== index);

  return arrEqual.length === 0;
};

const validateComment = (value) =>
  value.length >= 0 && value.length <= 140;

pristine.addValidator(form.querySelector('.text__hashtags'), validateHashtagsContent,
  'хэш-тег начинается с символа #, хеш-тег не может состоять только из одной решётки, максимальная длина одного хэш-тега 20 символов, включая решётку, строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.!');
pristine.addValidator(form.querySelector('.text__hashtags'), validateHashtagsEqual,
  'Есть одинаковые хештеги!');
pristine.addValidator(form.querySelector('.text__hashtags'), validateHashtagsAmount,
  'нельзя указать больше пяти хэш-тегов');
pristine.addValidator(commentField, validateComment,
  'Длина комментария не может составлять больше 140 символов!');

function formValidate (){
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(!pristine.validate(hashtagField)){
      hashtagField.closest('.img-upload__field-wrapper').classList.add('img-upload__field-wrapper--error');
    }
    if(!pristine.validate(commentField)){
      commentField.closest('.img-upload__field-wrapper').classList.add('img-upload__field-wrapper--error');
    }
    if (pristine.validate()){
      hashtagField.closest('.img-upload__field-wrapper').classList.remove('img-upload__field-wrapper--error');
      commentField.closest('.img-upload__field-wrapper').classList.remove('img-upload__field-wrapper--error');
      form.submit();
    }
  });
}
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setUserFormSubmit = (onSuccess, showSucModal, showErrModal) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then((response) => {
          if (response.ok) {
            onSuccess();
            showSucModal();
          } else{
            showErrModal();
          }
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(unblockSubmitButton);
    }
  });
};

export{formValidate, setUserFormSubmit};

