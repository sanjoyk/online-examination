import React, { Component } from 'react';
import Questions from './Data';
import 'react-select/dist/react-select.css';
import ReactSelect from 'react-select';
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
        let formattedOptions = options.map(eachOpt => ({
            value: eachOpt.Solution,
            label: eachOpt.Solution
        }));
        console.log(formattedOptions);
        return formattedOptions;
    }
    render() {
        return (
            <ReactSelect
                value={this.state.selectedValue}
                options={this.formatOptions(this.props.eachQuestion.Options)}
                onChange={selectedValue => {
                    this.setState({ selectedValue: selectedValue });
                    this.props.updateValue(
                        selectedValue,
                        this.props.questionNumber
                    );
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
        return (
            <div className={this.isAnswered()}>
                <p>
                    {this.props.eachQuestion.Description}
                </p>
                <SelectElement
                    questionNumber={this.props.questionNumber}
                    eachQuestion={this.props.eachQuestion}
                    updateValue={this.props.updateValue}
                />
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
                    isAnswered[index] == true;
                    this.setState({ isAnswered: isAnswered });
                } else {
                    const isAnswered = this.state.isAnswered;
                    isAnswered[index] == false;
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
    render() {
        return (
            <div>
                <ul>
                    {Questions.map((eachQuestion, i) => {
                        return (
                            <EachQuestion
                                key={i}
                                isAnswered={this.state.isAnswered[i]}
                                questionNumber={i}
                                eachQuestion={eachQuestion}
                                updateValue={this.updateValue.bind(this)}
                            />
                        );
                    })}
                </ul>
                <input
                    type="button"
                    value="submit"
                    onClick={this.getAllSelectedValue.bind(this)}
                />
            </div>
        );
    }
}
export default QuestoinsList;
