import React from 'react';
import t from 'tcomb-form';

export default class Form extends React.Component {
  onSubmit = () => {
    console.log('value', this.refs)
    const value = this.refs.form.getValue();
    const validate = this.refs.form.validate();
    console.log('validate validate', validate);
    if (value) {
      console.log(value)
    }
  }

  onChange = value => {
    console.log('onChangeText onChangeText', value);
    this.setState({ value });
  }
 
  render() {
    return (
      <form>
        <t.form.Form
          ref="form"
          type={this.state.type}
          options={this.state.options}
          value={this.state.value}
          onChange={this.onChange}
        />
        <div className="form-group">
          <button type="button" className="btn btn-primary" onClick={this.onSubmit}>Save</button>
        </div>
      </form>
    )
  }
}
