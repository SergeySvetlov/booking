const mapFilters = document.querySelector('.map__filters');
const checkboxes = mapFilters.querySelectorAll('.map__checkbox');

const housingType = document.getElementById('housing-type');
const housingPrice = document.getElementById('housing-price');
const housingRooms = document.getElementById('housing-rooms');
const housingGuests = document.getElementById('housing-guests');


const setFilter = (points) => {
  const typeArray = points.filter((point) => housingType.value === 'any'? point : point.offer.type === housingType.value);
  const roomsArray = points.filter((point) => housingRooms.value === 'any'? point : point.offer.rooms.toString() === housingRooms.value);
  const guestsArray = points.filter((point) => housingGuests.value === 'any'? point : point.offer.guests.toString() === housingGuests.value);
  const priceArray = points.filter((point) => {
    if (housingPrice.value === 'middle') {
      return point.offer.price >= 10000 && point.offer.price < 50000;
    } else
    if (housingPrice.value === 'low') {
      return point.offer.price < 10000;
    } else
    if (housingPrice.value === 'high') {
      return point.offer.price >= 50000;
    }
    return point;
  });

  const compareArrays = (arr1, arr2) => arr1.filter((item) => !(arr2.includes(item))).length === 0; // сравнение двух массивов

  const getFeaturesArray = () => {
    const checkedFeatures = [];
    checkboxes.forEach((checkbox) => checkbox.checked ? checkedFeatures.push(checkbox.value) : null);
    return checkedFeatures.length === 0 ? points : points.filter((point) => point.offer.features && compareArrays(checkedFeatures, point.offer.features));
  };

  const featuresArray = getFeaturesArray();

  const resultArray = points.filter((point) =>
    typeArray.includes(point) &&
      roomsArray.includes(point) &&
      guestsArray.includes(point) &&
      priceArray.includes(point) &&
      featuresArray.includes(point)
  );

  return resultArray.slice(0, 10);
};

export {setFilter};
