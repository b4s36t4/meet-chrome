import React from 'react';
import { render } from 'react-dom';

import MyEvents from './MyEvents';
render(<MyEvents />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
