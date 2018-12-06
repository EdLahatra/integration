import React from 'react';
import moment from 'moment';
import SimpleDatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import "react-datepicker/dist/react-datepicker.css";

export default class Datepicker extends React.Component {
    state = {
        date: moment(),
    }

    componentWillMount() {
        if(this.props.selected)this.setState({ date: this.props.selected });
        this.props.changeFunction(this.state.date);
    }

    handleChange = (date) => {
        this.setState({ date });
        this.props.changeFunction(date);
    }
    render() {
        return (
            <div className={this.props.containerClassName}>
                <span className="label-form strong">{this.props.label}</span>
                <div className="blc-select-container">
                    <SimpleDatePicker
                        onChange={this.handleChange}
                        onSelect={this.handleChange}
                        selected={this.state.date}
                        value={this.state.date}
                        dateFormat="DD/MM/YYYY"
                        className={`blc-datePicker ${this.props.className}`}
                    />
                </div>
                <br />
                {
                    this.props.hasError ? <label error style={{ "color": "red" }} htmlFor>{this.props.error}</label> : null
                }
            </div>

        );
    }
}
Datepicker.propTypes = {
    changeFunction: PropTypes.func.isRequired,
    containerClassName: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    hasError: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.string.isRequired,
};