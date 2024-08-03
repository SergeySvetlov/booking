//import  { generateAdDescriptions }  from './mock.js';
import { setRenderAd } from './render-ads.js';
import { setFormEditing } from './form.js';
import { showError }  from './error.js';
import { getData } from './api.js';

const onSuccess = (data) => {
  setFormEditing(data, setRenderAd);
};

const onFail = (message) => {
  setFormEditing();
  showError(message);
};

getData(onSuccess, onFail);
