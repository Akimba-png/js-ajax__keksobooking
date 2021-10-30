const ERROR_DISPLAY_TIME = 5000;

const errorElement = document.createElement('p');
errorElement.style.position = 'absolute';
errorElement.style.top = '58px';
errorElement.style.zIndex = '1';
errorElement.style.width = '100%';
errorElement.style.color = 'red';
errorElement.style.textAlign = 'center';
errorElement.textContent = 'При загрузке данных произошла ошибка. Попробуйте повторить загрузку позднее.';

export const showErrorMessage = () => {
  document.body.appendChild(errorElement);
  setTimeout(
    () => {
      errorElement.remove();
    },
    ERROR_DISPLAY_TIME,
  );
};
