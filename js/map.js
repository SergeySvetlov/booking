import { setFilter } from './filter.js';
import { debounce } from './util.js';

const mapFilters = document.querySelector('.map__filters');
const adress = document.querySelector('#address');
const mapCanvas = document.querySelector('#map-canvas');
const adForm = document.querySelector('.ad-form');

const latLngDefault = {
  lat: 35.67626,
  lng: 139.74953,
};
const scaleDefault = 13;

// сеттер карты принимает функцию активации формы, данные для маркеров и функцию отрисовки карточек которые вставляются в попап маркеров.
const setMap = (activateForm, points, renderPopup) => {
  if (!mapCanvas) {
    return;
  }
  adress.value = `${latLngDefault.lat}, ${latLngDefault.lng}`;
  // инициализация карты
  const map = L.map('map-canvas')
    .on('load', () => {
      activateForm();
    })
    .setView(latLngDefault, scaleDefault);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  // добавление главного маркера
  const marker = L.marker(
    latLngDefault,
    {
      draggable: true,
      icon: L.icon({
        iconUrl: '../img/main-pin.svg',
        iconSize: [52, 52],
        iconAnchor: [26, 52],
      }),
    },
  );
  marker.addTo(map);
  // обработчик события перемещения главного маркера и передачи его координат в инпут
  marker.on('moveend', (evt) => {
    adress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });
  if (!points || !(points.length)) {
    return;
  }
  // создаём слой на карте
  const markerGroup = L.layerGroup().addTo(map);
  // функция по созданию маркера с попапом и добавление его на слой
  const createMarker = (point) => {
    const newMarker = L.marker(
      point.location,
      {
        icon: L.icon({
          iconUrl: '../img/pin.svg',
          iconSize: [40, 40],
          iconAnchor: [20, 40],
        }),
      },
    );
    newMarker.addTo(markerGroup).bindPopup(renderPopup(point));
  };
  // перебераем все данные и создаём под них маркеры с попапами
  setFilter(points).forEach((point) => {
    createMarker(point);
  });

  mapFilters.addEventListener('change', debounce(() => {
    markerGroup.clearLayers();
    setFilter(points).forEach((point) => {
      createMarker(point);
    });
  }));

  mapFilters.addEventListener('reset', debounce(() => {
    markerGroup.clearLayers();
    setFilter(points).forEach((point) => {
      createMarker(point);
    });
  }));

  //обработчик нажатия сброса карты
  adForm.addEventListener('reset', () => {
    map.closePopup();
    marker.setLatLng(latLngDefault);
    map.setView(latLngDefault, scaleDefault);
  });
};

export { setMap, latLngDefault, adress };
