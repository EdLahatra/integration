import React from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/lib/Async';

export default class SelectComponent extends React.Component {
  state = { inputValue: '' };
  handleInputChange = inputValue => {
    this.setState({ inputValue });
    return inputValue;
  };
  render() {
    return (
      <AsyncSelect
        isMulti={false}
        cacheOptions
        defaultOptions
        loadOptions={this.props.promiseOptions}
        onInputChange={this.handleInputChange}
        onChange={value => this.props.getValue(value)}
      />
    );
  }
}

SelectComponent.propTypes = {
  getValue: PropTypes.func,
};