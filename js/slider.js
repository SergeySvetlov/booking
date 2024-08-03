const initSlider = (input, slider) => {
  noUiSlider.create(slider, {
    start: 0,
    connect: 'lower',
    range: {
      'min': 0,
      'max': 100000
    },
    step: 100,
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    }
  });

  slider.noUiSlider.on('update', () => {
    input.value = slider.noUiSlider.get();
  });
};


export {initSlider};
