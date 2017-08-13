import React, { Component } from 'react';
import Questions from './Data';
import 'react-select/dist/react-select.css';
import ReactSelect from 'react-select';
import { Field, reduxForm } from 'redux-form';

// import SelectElement from './SelectElement';
class SelectElement extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedValue: 'Select...' };
    }
    logChange(selectedValue) {
        console.log('Selected: ' + JSON.stringify(selectedValue));
        this.setState({ selectedValue: selectedValue });
    }

    formatOptions(options) {
        console.log('jksdfnk');
        let formattedOptions = options.map(eachOpt => ({
            value: eachOpt.Solution,
            label: eachOpt.Solution
        }));
        return formattedOptions;
    }
    render() {
        const { input: { value, onChange } } = this.props;
        return (
            <ReactSelect
                value={value}
                options={this.formatOptions(this.props.eachQuestion.Options)}
                onChange={(event, value) => {
                    onChange(value);
                    this.setState({ selectedValue: value });
                    this.props.updateValue(value, this.props.questionNumber);
                }}
            />
        );
    }
}
class EachQuestion extends Component {
    isAnswered() {
        if (this.props.isAnswered === false) {
            return 'not-answer';
        }
        return '';
    }

    render() {
        console.log('this.props', this.props);
        return (
            <div className={this.isAnswered()}>
                <p>
                    {this.props.eachQuestion.Description}
                </p>
                <Field
                    name={'question' + this.props.questionNumber}
                    {...this.props}
                    component={SelectElement}
                />
            </div>
        );
    }
}
class MyCustomInput extends Component {
    render() {
        const { input: { value, onChange } } = this.props;
        return (
            <div>
                <span>
                    The current value is {value}.
                </span>
                <button type="button" onClick={() => onChange(value + 1)}>
                    Inc
                </button>
                <button type="button" onClick={() => onChange(value - 1)}>
                    Dec
                </button>
            </div>
        );
    }
}
class QuestoinsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: Array(Questions.length).fill(null),
            isAnswered: Array(Questions.length).fill(null)
        };
    }
    getAllSelectedValue() {
        const isAnswerAllQuestions = this.checkValidation();
        if (isAnswerAllQuestions) {
            console.log('form submit=', this.state);
        } else {
            this.state.questions.forEach((question, index) => {
                console.log('this', this);
                if (question !== null) {
                    const isAnswered = this.state.isAnswered;
                    isAnswered[index] = true;
                    this.setState({ isAnswered: isAnswered });
                } else {
                    const isAnswered = this.state.isAnswered;
                    isAnswered[index] = false;
                    this.setState({ isAnswered: isAnswered });
                }
            });
        }
    }
    checkValidation() {
        return this.state.questions.every(answer => answer !== null);
    }
    updateValue(updatedValue, questionNumber) {
        const questions = this.state.questions.slice();
        questions[questionNumber] = updatedValue;
        this.setState({ questions: questions });
    }
    handleSubmit(values) {
        console.log(values);
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <ul>
                        {Questions.map((eachQuestion, i) => {
                            return (
                                <Field
                                    name={'question' + i}
                                    key={i}
                                    isAnswered={this.state.isAnswered[i]}
                                    questionNumber={i}
                                    eachQuestion={eachQuestion}
                                    component={SelectElement}
                                    updateValue={this.updateValue.bind(this)}
                                />
                            );
                        })}
                    </ul>
                </div>

                <Field name="firstName" component="input" type="text" />
                <Field name="lastName" component="input" type="text" />
                <Field name="email" component="input" type="text" />
                <button type="submit">Submit</button>
            </form>
        );
    }
}
QuestoinsList = reduxForm({
    form: 'questions'
})(QuestoinsList);
export default QuestoinsList;
