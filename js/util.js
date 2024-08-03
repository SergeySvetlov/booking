// Функция, возвращающая случайное целое число из переданного диапазона включительно.

const getRandomInteger = (min, max) => {
  if (min >= max) {
    return null;
  } return Math.floor((max - min) * Math.random() + min);
};

//Создать неповторяющееся случайное целое число

const uniqueIntegers = [];

const getUniqueInteger = (min, max) => {
  let newInteger;
  do {
    newInteger = getRandomInteger(min, max);
  } while (uniqueIntegers.includes(newInteger));
  uniqueIntegers.push(newInteger);
  return newInteger;
};

const getUniqueIntegerZero = (min, max) => {
  const integer = getUniqueInteger(min, max);
  return (integer < 10 ? `0${integer}` : integer);
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.

const getRandomNumber = (min, max, n) => {
  if (min >= max) {
    return null;
  } return ((max - min) * Math.random() + min).toFixed(n);
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle

function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {getRandomInteger, getUniqueInteger, getUniqueIntegerZero, getRandomNumber, debounce, throttle};
