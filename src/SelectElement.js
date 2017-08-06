import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
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
                onChange={updatedValue =>
                    this.props.updateValue(
                        updatedValue,
                        this.props.questionNumber
                    )}
            />
        );
    }
}
export default SelectElement;
