import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

export default class SelectComponent extends React.Component {
  state = {
    selectedOption: {},
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.testFunction(selectedOption);
  }
  render() {
    const { selectedOption } = this.state;
    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}

SelectComponent.propTypes = {
  options: PropTypes.object,
  testFunction: PropTypes.func,
};