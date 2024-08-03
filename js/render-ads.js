const card = document.querySelector('#card').content.querySelector('.popup');

const TYPES = {
  'palace': 'Дворец' , 'flat': 'Квартира', 'house': 'Дом', 'bungalow': 'Бунгало', 'hotel': 'Отель'
};

const dataChecking = (dataItems, element, code) => {
  if (dataItems.some((item) => item === undefined)) {
    element.style.display = 'none';
    return;
  }
  code();
};

const setRenderAd = ({author, offer}) => {
  const newCard = card.cloneNode(true);
  const avatar = newCard.querySelector('.popup__avatar');
  const title = newCard.querySelector('.popup__title');
  const address = newCard.querySelector('.popup__text--address');
  const price = newCard.querySelector('.popup__text--price');
  const type = newCard.querySelector('.popup__type');
  const capacity = newCard.querySelector('.popup__text--capacity');
  const time = newCard.querySelector('.popup__text--time');
  const features = newCard.querySelector('.popup__features');
  const description = newCard.querySelector('.popup__description');
  const photos = newCard.querySelector('.popup__photos');
  // количество гостей и комнат
  const roomsForGuests = (offerRooms, offerGuests) => {
    const roomsCondition = (rooms) => {
      if (rooms === 1) {
        return 'комната';
      } else
      if (rooms >= 2 && rooms < 5) {
        return 'комнаты';
      } else {
        return 'комнат';
      }
    };
    const guestsCondition = (guests) => {
      if (guests === 1) {
        return 'гостя';
      } else
      if (guests > 1) {
        return 'гостей';
      } else {
        return '';
      }
    };
    capacity.textContent = `${offerRooms} ${roomsCondition(offerRooms)} ${offerRooms === 100 ? 'не для гостей' : `для ${offerGuests} ${guestsCondition(offerGuests)}`}`;
  };

  // отрисовка преимуществ
  const createFeatures = (offerFeatures) => {
    offerFeatures.forEach((feature) => {
      const item = document.createElement('li');
      item.classList.add('popup__feature',`popup__feature--${feature}`);
      newCard.querySelector('.popup__features').append(item);
    });
  };
  // отрисовка фоток
  const createPhotos = (offerPhotos) => {
    offerPhotos.forEach((photo) => {
      const item = document.createElement('img');
      item.classList.add('popup__photo');
      item.setAttribute('width', '45');
      item.setAttribute('height', '40');
      item.setAttribute('alt', 'Фотография жилья');
      item.src = photo;
      newCard.querySelector('.popup__photos').append(item);
    });
  };

  dataChecking([author.avatar], avatar, () => {avatar.src = author.avatar;});
  dataChecking([offer.title], title, () => {title.textContent = offer.title;});
  dataChecking([offer.address], address, () => {address.textContent = offer.address;});
  dataChecking([offer.price], price, () => {price.innerHTML = `${offer.price} <span>₽/ночь</span>`;});
  dataChecking([offer.type], type, () => {type.textContent = TYPES[offer.type];});
  dataChecking([offer.rooms, offer.guests], capacity, () => roomsForGuests(offer.rooms, offer.guests));
  dataChecking([offer.checkin, offer.checkout], time, () => {time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;});
  dataChecking([offer.description], description, () => {description.textContent = offer.description;});
  newCard.querySelector('.popup__features').innerHTML = '';
  newCard.querySelector('.popup__photos').innerHTML = '';
  dataChecking([offer.features], features, () => createFeatures(offer.features));
  dataChecking([offer.photos], photos, () => createPhotos(offer.photos));

  return newCard;
};


export { setRenderAd };
