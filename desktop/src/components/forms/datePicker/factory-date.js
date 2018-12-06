import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class Datepicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date()
        };
        // this.props.changeValFunction(new Date());
    }

    componentWillMount() {
        this.props.changeValFunction(new Date());
    }
    
    handleChange = (date) => {
        this.setState({
            startDate: date
        });
        this.props.changeValFunction(date);
    }
    
    render() {
        return (
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
            />
        );
    }
}
