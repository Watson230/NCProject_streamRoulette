import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bulma/css/bulma.css';
import 'bulma/bulma.sass';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
