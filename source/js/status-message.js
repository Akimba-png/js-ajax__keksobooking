const DISPLAY_TIME = 3000;
const TOP_LAYER_LEVEL = 1000;
const DOWNLOAD_ERROR_TEXT = 'При загрузке данных произошла ошибка. Попробуйте повторить загрузку позднее.';

const errorElement = document.createElement('p');
errorElement.style.position = 'absolute';
errorElement.style.top = '58px';
errorElement.style.left = '50%';
errorElement.style.zIndex = '1';
errorElement.style.transform = 'translateX(-50%)';
errorElement.style.color = 'red';
errorElement.style.whiteSpace = 'nowrap';
// errorElement.textContent = DOWNLOAD_ERROR_TEXT;

const successTemplateElement = document
  .querySelector('#success').content
  .querySelector('.success');
successTemplateElement.style.zIndex = TOP_LAYER_LEVEL;

const errorTemplateElement = document
  .querySelector('#error').content
  .querySelector('.error');
errorTemplateElement.style.zIndex = TOP_LAYER_LEVEL;
const errorTemplateButtonElement = errorTemplateElement.querySelector('.error__button');


const clearNotification = (notificationElement, renderTime) => {
  setTimeout(
    () => {
      notificationElement.remove();
    }, renderTime,
  );
};

export const showErrorMessage = (messageText = DOWNLOAD_ERROR_TEXT) => {
  errorElement.textContent = messageText;
  document.body.appendChild(errorElement);
  clearNotification(errorElement, DISPLAY_TIME);
};

export const showSuccessScreen = () => {
  document.body.appendChild(successTemplateElement);
  clearNotification(successTemplateElement, DISPLAY_TIME);
};

const onPopupKeydowm = (evt) => {
  if (evt.code === 'Enter' || evt.code === 'Esc' || evt.code === 'Escape') {
    evt.preventDefault();
    errorTemplateElement.remove();
    document.removeEventListener('keydown', onPopupKeydowm);
  }
};

export const showErrorScreen = () => {
  document.body.appendChild(errorTemplateElement);
  document.addEventListener('keydown', onPopupKeydowm);
  errorTemplateButtonElement.addEventListener('click', () => {
    errorTemplateElement.remove();
    document.removeEventListener('keydown', onPopupKeydowm);
  });
};
