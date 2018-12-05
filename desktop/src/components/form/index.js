import React from 'react';

import { Form } from 'common/lib/tcomb-form';

import FichePersonnelle from 'common/schemas/FichePersonnelle';

let currentForm;

import utils from '../../lib/utils';

/*
const FormSchema = t.struct({
  name: t.String,         // a required string
  age: t.Number, // an optional number
  ville: t.maybe(t.String), // an optional number
  rememberMe: t.Boolean,   // a boolean
});
*/
export default class TestForm extends React.Component {
  getConfig = () => ({ schema: FichePersonnelle.schema }, {});

  _initForm(value) {
    const fields = utils.toFormTypeAndFieldsOptions({ schema: FichePersonnelle.schema }, {}).fields;
    this.setState({
      value,
      options: {
        auto: 'placeholders',
        i18n: {
          optional: '',
          required: '',
          add: 'Add', // add button
          remove: '✘', // remove button
          up: '↑', // move up button
          down: '↓', // move down button
        },
        stylesheet: 'FormStyle',
        fields,
      },
      type: utils.toFormTypeAndFieldsOptions({ schema: FichePersonnelle.schema }, {}).type,
    });
  }
  /*
  constructor(props) {
    super(props);
    this.state = {
      type: FormSchema,
      value: null,
      options: {
        auto: 'placeholders',
        i18n: {
          optional: '',
          required: '',
          add: 'Add', // add button
          remove: '✘', // remove button
          up: '↑', // move up button
          down: '↓' // move down button
        },
        fields: {
          name: {
            factory: FactoryInputText,
            placeholder: 'Your placeholder here',
            label: 'My name label',
            help: 'Your help message here',
            error: <div>Name is required</div>,
            onKeyUpInput: this.onKeyUpInput,
            fullWidth: true,
            onBlur: this.onBlur,
            isValide: this.isValide,
            errorInput: 'Error',
            isValide: this.isValide
          },
          age: {

          },
          rememberMe: {

          }
        }
      },
      form: null,
    };
  }*/
  constructor() {
    super();
    this.state = {
      value: null,
      visible: false,
      options: {
        auto: 'placeholders',
        i18n: {
          optional: '',
          required: '',
          add: 'Add', // add button
          remove: '✘', // remove button
          up: '↑', // move up button
          down: '↓', // move down button
        },
        stylesheet: 'FormStyle',
        fields: null,
      },
      type: null,
    };
  }

  componentWillMount() {
    this._initForm(this.state.value);
    currentForm = this.refs.form;
  }

  componentDidUpdate() {
    currentForm = this.refs.form;
  }

  onKeyUpInput = value => {
    console.log('onKeyUpInput');
  }

  onBlur = value => {
    console.log('onBlur');
  }

  isValide = value => {
    console.log('isValide', value);
    return true;
  }

  onChangeText = value => {
    console.log('onChangeText', value);
  }

  onSubmit = () => {
    console.log('value', this.refs)
    const value = this.refs.form.getValue();
    const validate = this.refs.form.validate();
    console.log('validate validate', validate);
    if (value) {
      console.log(value)
    }
  }

  onChange = value => this.setState({ value });
 
  render() {
    return (
      <form>
        {this.state.type && <Form
          ref="form"
          type={this.state.type}
          options={this.state.options}
          value={this.state.value}
          onChange={this.onChange}
        />}
        <div className="form-group">
          <button type="button" className="btn btn-primary" onClick={this.onSubmit}>Save</button>
        </div>
      </form>
    )
  }
}
