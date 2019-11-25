import { withFormsy } from 'formsy-react';
import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.changeValue = this.changeValue.bind(this);
    }

    changeValue(event) {
        // setValue() will set the value of the component, which in
        // turn will validate it and the rest of the form
        // Important: Don't skip this step. This pattern is required
        // for Formsy to work.
        this.props.setValue(event.currentTarget.value);
    }

    render() {
        // An error message is returned only if the component is invalid
        const errorMessage = this.props.getErrorMessage();

        return (
        <div>
            <div className="input-group flex-nowrap mt-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id={this.props.name}>Verseny fajtája</span>
                </div>
                <input className="form-control" onChange={this.changeValue} aria-describedby={this.props.name} type={this.props.type} name={this.props.name} value={this.props.getValue() || ''} />
                <span>{errorMessage}</span>
            </div>
            </div>
        );
    }
}

export default withFormsy(Input);