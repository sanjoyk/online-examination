import React, { Component } from 'react';
import _ from 'underscore';
import './css/QuestionsList.css';
import { store } from './index';
//import actions
import {
    setSubmitionStatus,
    resetAllAnswers,
    resetAnswer,
    addAnswer,
    updateAnswerOfQuestion
} from './index';
import { connect } from 'react-redux';

class QuestionsList extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.clearAllAnswer = this.clearAllAnswer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    clearAllAnswer() {
        //use thunk
        store.dispatch(setSubmitionStatus(false));
        store.dispatch(resetAllAnswers());
    }

    handleInputChange(event) {
        const { name: questionNumber, value } = event.target;
        const answer = _.find(this.props.answers, {
            questionNumber: questionNumber
        });
        if (answer) {
            if (value === '') {
                store.dispatch(resetAnswer(questionNumber));
            } else {
                store.dispatch(updateAnswerOfQuestion(questionNumber, value));
            }
        } else {
            store.dispatch(addAnswer(questionNumber, value));
        }
    }
    _isAllQuestionsAnswered() {
        if (this.props.questions.length === this.props.answers.length) {
            return true;
        } else {
            return false;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        store.dispatch(setSubmitionStatus(true));
        if (!this._isAllQuestionsAnswered()) {
            return false;
        }
    }
    render() {
        const { questions } = this.props;
        return (
            <form name="questionsPaper" onSubmit={this.handleSubmit}>
                <div>
                    {questions.map(eachQuestion =>
                        <EachQuestions
                            key={eachQuestion.id}
                            eachQuestion={eachQuestion}
                            handleInputChange={this.handleInputChange}
                        />
                    )}
                </div>

                <button type="submit">Submit</button>
                <input
                    type="button"
                    value="Clear All Answewrs"
                    onClick={this.clearAllAnswer}
                />
            </form>
        );
    }
}
const mapStateToProps = state => ({
    questions: state.questions,
    answers: state.answers
});
export const QuestionsLists = connect(mapStateToProps)(QuestionsList);

const EachQuestion = ({
    isFormSubmitted,
    eachQuestion,
    handleInputChange,
    answer
}) => {
    console.log('Form submission', eachQuestion);
    return (
        <div
            className={
                (isFormSubmitted &&
                    (!answer || answer.selectedOption.length === 0)) === true
                    ? 'need-answer each-question '
                    : 'each-question '
            }
        >
            <label>
                {eachQuestion.description}
            </label>
            <SelectElement
                handleInputChange={handleInputChange}
                selectedOption={answer ? answer.selectedOption : ''}
                eachQuestion={eachQuestion}
            />
        </div>
    );
};
const mapStateToPropsOfEachQuestion = (state, { eachQuestion }) => ({
    isFormSubmitted: state.formSubmitted,
    answer: _.find(state.answers, {
        questionNumber: eachQuestion.id.toString()
    })
});
const EachQuestions = connect(mapStateToPropsOfEachQuestion)(EachQuestion);

const SelectElement = ({ handleInputChange, selectedOption, eachQuestion }) =>
    <select
        onChange={handleInputChange}
        name={eachQuestion.id}
        value={selectedOption}
    >
        <option value="">Select...</option>
        {calculateOptions(eachQuestion.options)}
    </select>;
const calculateOptions = options =>
    options.map(option =>
        <option key={option.id} value={option.id}>
            {option.text}
        </option>
    );
export default QuestionsList;
