import './js/template';
import './js/map';
import { setResetButtonClick, setFormSubmit } from './js/form';
import { showSuccessScreen, showErrorScreen } from './js/status-message';

import { resetMap } from './js/map';
setResetButtonClick(resetMap);

setFormSubmit(
  () => {
    showSuccessScreen();
    resetMap();
  },
  showErrorScreen,
);


