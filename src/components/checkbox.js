/*
 * Copyright © GlobalVET AB, 2019.
 *
 * All rights reserved. No part or the whole of this source code and the compiled program
 * may be reproduced, copied, distributed, disseminated to the public, adapted or transmitted
 * in any form or by any means, including photocopying, recording, or other electronic or
 * mechanical methods, without the prior written permission of GlobalVET AB. This source code
 * and the compiled program may only be used for the purposes of GlobalVET AB. This source code
 * and the compiled program shall be kept confidential and shall not be made public or made
 * available or disclosed to any unauthorized person. Any dispute or claim arising out of the
 * breach of these provisions shall be governed by and construed in accordance with the
 * laws of Sweden.
 */
import React from 'react';
import { withFormsy } from 'formsy-react';

class MyCheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true
        };
        this.changeValue = this.changeValue.bind(this);
    }

    changeValue(event) {
        const checked = this.state.checked;
        this.setState({
            checked: !checked
        })
        this.props.setValue(this.state.checked);
    }

    render() {
        const className = 'form-group ' + (this.props.className || ' ') +
            (this.props.showRequired() ? 'required' : this.props.showError() ? 'error' : '');
        const errorMessage = this.props.getErrorMessage();
        const name = this.props.name;
        const title = this.props.title;

        return (

            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name={name} onChange={this.changeValue}></input>
                <label className="form-check-label" htmlFor="inlineCheckbox1">{title}</label>
            </div>

        );
    }
}

export default withFormsy(MyCheckBox);