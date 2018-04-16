import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bulma/css/bulma.css';
import 'bulma-extensions/bulma-carousel/dist/bulma-carousel.min.css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
