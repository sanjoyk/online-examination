import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';

import './css/index.css';
import { QuestionsLists } from './QuestionsList';
import questionsList from './Data';
import registerServiceWorker from './registerServiceWorker';

const FORM_SUBMISION_STATUS = 'FORM_SUBMISION_STATUS';
const ADD_ANSWER = 'ADD_ANSWER';
const UPDATE_ANSWER = 'UPDATE_ANSWER';
const RESET_ANSWER = 'RESET_ANSWER';
const RESET_ALL_ANSWERS = 'RESET_ALL_ANSWERS';

//action creators
export const setSubmitionStatus = currentStatus => {
    return {
        type: FORM_SUBMISION_STATUS,
        status: currentStatus
    };
};
export const resetAllAnswers = () => {
    return {
        type: RESET_ALL_ANSWERS
    };
};
export const resetAnswer = questionNumber => {
    return {
        type: RESET_ANSWER,
        questionNumber: questionNumber
    };
};
export const updateAnswerOfQuestion = (questionNumber, value) => {
    return {
        type: UPDATE_ANSWER,
        questionNumber: questionNumber,
        selectedOption: value
    };
};
export const addAnswer = (questionNumber, value) => {
    return {
        type: ADD_ANSWER,
        questionNumber: questionNumber,
        selectedOption: value
    };
};
//reducers
const questions = (state = questionsList, action) => {
    return state;
};
const updateAnswer = (state, action) => {
    switch (action.type) {
        case ADD_ANSWER:
            return {
                questionNumber: action.questionNumber,
                selectedOption: action.selectedOption
            };
        case UPDATE_ANSWER:
            if (state.questionNumber !== action.questionNumber) {
                return state;
            }
            return { ...state, selectedOption: action.selectedOption };
        case RESET_ANSWER:
            if (state.questionNumber !== action.questionNumber) {
                return state;
            }
            return { ...state, selectedOption: '' };
        default:
            return state;
    }
};
const answers = (state = [], action) => {
    switch (action.type) {
        case ADD_ANSWER:
            return [...state, updateAnswer(null, action)];
        case UPDATE_ANSWER:
            return state.map(answer => updateAnswer(answer, action));
        case RESET_ANSWER:
            return state.map(answer => updateAnswer(answer, action));
        case RESET_ALL_ANSWERS:
            console.log('in all reset ');
            return [];
        default:
            return state;
    }
};
const formSubmitted = (state = false, action) => {
    if (action.type === FORM_SUBMISION_STATUS) {
        return action.status;
    }
    return state;
};
const questionsAnswersApp = combineReducers({
    questions,
    answers,
    formSubmitted
});
export const store = createStore(questionsAnswersApp, applyMiddleware(logger));
ReactDOM.render(
    <Provider store={store}>
        <QuestionsLists />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
