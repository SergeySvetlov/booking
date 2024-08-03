const body = document.querySelector('body');
const errorTemplate = document.querySelector('#error').content;
const successTemplate = document.querySelector('#success').content;
const errorMessage = errorTemplate.querySelector('.error').cloneNode(true);
const successMessage = successTemplate.querySelector('.success').cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');

errorButton.onclick = () => {
  errorMessage.remove();
  document.removeEventListener('keydown', onEscKeydown);
};

function onEscKeydown (evt) {
  if (evt.keyCode === 27) {
    successMessage.remove();
    errorMessage.remove();
  }
  document.removeEventListener('keydown', onEscKeydown);
}

function closeMessage (message) {
  function onWindowClickHandler () {
    message.remove();
    document.removeEventListener('click', onWindowClickHandler);
  }
  document.addEventListener('click', onWindowClickHandler);
}

const showErrorMessage = () => {
  document.addEventListener('keydown', onEscKeydown);
  body.append(errorMessage);
  closeMessage(errorMessage);
};

const showSuccessMessage = () => {
  document.addEventListener('keydown', onEscKeydown);
  body.append(successMessage);
  closeMessage(successMessage);
};


export {showErrorMessage, showSuccessMessage};
