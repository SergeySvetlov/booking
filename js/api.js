const mapFilters = document.querySelector('.map__filters');


const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.htmlacademy.pro/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Что то пошло нетак, обновите страницу. Ошибка: ${response.status}`);
      }
    })
    .then((data) => {
      onSuccess(data);
      mapFilters.classList.remove('map__filters--disabled'); // убираем блокировку фильтров если данные пришли.
    })
    .catch((err) => onFail(err.message));
};

const sendData = async (onSuccess, onFail, data) => {
  try  {
    const response = await fetch(
      'https://26.javascript.htmlacademy.pro/keksobooking',
      {
        method: 'POST',
        type: 'multipart/form-data',
        body: data,
      });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    onSuccess();
  } catch(err) {
    onFail(err.message);
  }
};

export {getData, sendData};
