import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import './css/index.css';
// import App from './App';
import QuestionsList from './QuestionsList';
import registerServiceWorker from './registerServiceWorker';

import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    form: formReducer
});

const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
);
const store = createStore(rootReducer, enhancers);

ReactDOM.render(
    <Provider store={store}>
        <QuestionsList />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
