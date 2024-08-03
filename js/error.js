const ERROR_SHOW_TIME = 5000;
const showError = (message) => {
  const div = document.createElement('div');
  div.style.backgroundColor = 'red';
  div.style.color = 'white';
  div.style.position = 'absolute';
  div.style.zIndex = '100';
  div.style.left = '0';
  div.style.top = '0';
  div.style.right = '0';
  div.style.padding = '10px 3px';
  div.style.fontSize = '30px';
  div.style.textAlign = 'center';
  div.textContent = message;
  document.body.append(div);

  setTimeout(() => {
    div.remove();
  }, ERROR_SHOW_TIME);
};

export {showError};
