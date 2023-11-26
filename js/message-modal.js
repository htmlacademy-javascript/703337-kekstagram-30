import { isEscapeKey } from './util';
const bodyElement = document.querySelector('body');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorPostTemplate = document.querySelector('#error').content.querySelector('.error');
const succsessPostElement = successTemplate.cloneNode(true);
const errorPostElement = errorPostTemplate.cloneNode(true);
const errorLoadTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const buttonCloseSuccsessMessage = succsessPostElement.querySelector('.success__button');
const buttonCloseErrorMessage = errorPostElement.querySelector('.error__button');
const TIMEOUT = 5000;

function onDucumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

function onBodyClick (evt) {
  if(evt.target.closest('.success__inner') || evt.target.closest('.error__inner')){
    return;
  }
  hideMessage();
}

function hideMessage (){
  const existElement = document.querySelector('.succsess') || document.querySelector('.error');
  existElement.remove();
  document.removeEventListener('keydown', onDucumentKeydown);
  bodyElement.removeEventListener('click', onBodyClick);
}

const onCloseButtonClick = () => {
  hideMessage();
};

const showMessage = (element, button) => {
  bodyElement.append(element);
  button.addEventListener('click', onCloseButtonClick);
  bodyElement.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDucumentKeydown);
};

const showPostSuccsessMessage = () => {
  showMessage(succsessPostElement, buttonCloseSuccsessMessage);
};
const showPostErrorMessage = () => {
  showMessage(errorPostElement, buttonCloseErrorMessage);
};

const showErrorLoadMessage = () => {
  const errorLoadElement = errorLoadTemplate.cloneNode(true);
  bodyElement.append(errorLoadElement);
  setTimeout(() => {
    errorLoadElement.remove();
  }, TIMEOUT);
};
export {showPostSuccsessMessage, showPostErrorMessage, showErrorLoadMessage};
