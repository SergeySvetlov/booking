const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avaChooser = document.querySelector('.ad-form-header__input');
const previewAva = document.querySelector('.ad-form-header__preview img');

const photoChooser = document.querySelector('.ad-form__input');
const previewPhoto = document.querySelector('.ad-form__photo img');

const initFileChooser = (fileChooser, preview) => {
  if (fileChooser === null) {
    return;
  }
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      preview.src = URL.createObjectURL(file);
    }
  });
};

const setFileChooser = () => initFileChooser(avaChooser, previewAva);
const setPhotoChooser = () => initFileChooser(photoChooser, previewPhoto);

export {setFileChooser, setPhotoChooser};
