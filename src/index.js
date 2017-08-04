import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import QuestionsList from './QuestionsList';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<QuestionsList />, document.getElementById('root'));
registerServiceWorker();
