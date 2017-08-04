import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Questions from './Data';
import Select from 'react-select';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

class QuestoinsList extends Component {
    logChange(val) {
        console.log('Selected: ' + JSON.stringify(val));
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
            <ul>
                {Questions.map((eachQuestion, i) => {
                    return (
                        <div key={i}>
                            <p>
                                {eachQuestion.Description}
                            </p>
                            {/* <select>
                                {eachQuestion.Options.map(eachOption =>
                                    <option value={eachOption.Solution}>
                                        {eachOption.Solution}
                                    </option>
                                )}
                            </select> */}
                            <Select
                                name="form-field-name"
                                value="one"
                                options={this.formatOptions(
                                    eachQuestion.Options
                                )}
                                onChange={this.logChange}
                            />
                        </div>
                    );
                })}
            </ul>
        );
    }
}
export default QuestoinsList;
