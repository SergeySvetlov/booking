import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './form-message.js';
import { setMap, latLngDefault, adress } from './map.js';
import { initSlider } from './slider.js';
import { setFileChooser, setPhotoChooser } from './file.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const filtersFieldsets = mapFilters.querySelectorAll('select, fieldset');
const title = document.querySelector('#title');
const price = document.querySelector('#price');
const priceSlider = document.querySelector('.ad-form__slider');
const type = document.querySelector('#type');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');
const submitButton = adForm.querySelector('.ad-form__submit');
const resetButton = adForm.querySelector('.ad-form__reset');

const MAX_PRICE = 100000;

const minPrices = [
  {'bungalow': 0},
  {'flat': 1000},
  {'hotel': 3000},
  {'house': 5000},
  {'palace': 10000}
];

const maxCapacities = [
  {1: 1},
  {2: 2},
  {3: 3},
  {100: 0}
];

const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFormFieldsets.forEach((item) => item.setAttribute('disabled', ''));
  mapFilters.classList.add('map__filters--disabled');
  filtersFieldsets.forEach((item) => item.setAttribute('disabled', ''));
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach((item) => item.removeAttribute('disabled', ''));
  filtersFieldsets.forEach((item) => item.removeAttribute('disabled', ''));
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});

const validateTitle = (value) => (value.length >= 30 && value.length <= 100);
const messageTitle = (value) => {
  if (value.length < 30) {
    return 'длина заголовка должна быть больше 30 символов';
  }
  if (value.length > 100) {
    return 'длина заголовка не должна быть длиннее 100 символов';
  }
};

const initTypePrice = () => {
  price.min = Object.values(minPrices[0])[0];
  price.max = MAX_PRICE;
  price.placeholder = Object.values(minPrices[0])[0];
  type.value = Object.keys(minPrices[0])[0];

  type.addEventListener('change', () => {
    const minPrice = minPrices.filter((min) => (type.value === Object.keys(min)[0]));
    price.placeholder = Object.values(minPrice[0])[0];
    price.min = Object.values(minPrice[0])[0];
    price.value = '';
    document.querySelector('#price ~ .ad-form__error').textContent = '';
  });
};

const validatePrice = (value) => (Number(value) >= price.min && Number(value) <= price.max);

const messagePrice = (value) => {
  if (Number(value) > price.max) {
    return `Максимальная цена: до ${price.max} руб.`;
  }
  if (Number(value) < price.min) {
    return `Минимальная цена: от ${price.min} руб.`;
  }
};

const validateCapacity = (value) => {
  const maxCapacity = maxCapacities.filter((max) => (roomNumber.value === Object.keys(max)[0]));
  return (value <= Object.values(maxCapacity[0])[0]);
};

const messageCapacity = () => {
  const maxCapacity = maxCapacities.filter((max) => (roomNumber.value === Object.keys(max)[0]));
  return `Максимально количество гостей: ${Object.values(maxCapacity[0])[0]}`;
};

pristine.addValidator(title, validateTitle, messageTitle);
pristine.addValidator(price, validatePrice, messagePrice);
pristine.addValidator(capacity, validateCapacity, messageCapacity);

const initTimeInOut = () => {
  timein.onchange = () => {
    timeout.value = timein.value;
  };
  timeout.onchange = () => {
    timein.value = timeout.value;
  };
};

const blockSubmitButton = () => {
  submitButton.setAttribute('disabled', '');
  submitButton.textContent = 'Отправка...';
};

const unblockSubmitButton = () => {
  submitButton.removeAttribute('disabled', '');
  submitButton.textContent = 'Опубликовать';
};

const resetForm = () => {
  mapFilters.reset();
  adForm.reset();
  adress.value = `${latLngDefault.lat}, ${latLngDefault.lng}`;
};

const setFormEditing = (data, renderPopup) => {
  if(!adForm) {
    return;
  }
  disableForm();
  initTypePrice();
  initSlider(price, priceSlider);
  initTimeInOut();
  setFileChooser();
  setPhotoChooser();
  setMap(activateForm, data, renderPopup);
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  });
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(() => {
        unblockSubmitButton();
        resetForm();
        showSuccessMessage();
      },
      () => {
        showErrorMessage();
        unblockSubmitButton();
      },
      new FormData(evt.target),
      );
    }
  });
};

export {setFormEditing};
