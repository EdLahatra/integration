import React from 'react';
import Modal from 'react-responsive-modal';
import t from 'tcomb-form';

import FichePersonnelle from 'models/FichePersonnelle';

import utils from '../lib/utils';

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "TP REACT",
      content: "Content from About",
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
    }
  }

  _initForm(value) {
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ];
    
    const filterFunction = inputValue => {
      if (inputValue) {
        return options.filter(i =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
          );
      }
      return options;
    };
    
    const promiseOptions = inputValue =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(filterFunction(inputValue));
        }, 1000);
      });
    const fields = utils.toFormTypeAndFieldsOptions(
      { schema: FichePersonnelle.schema },
      {
        list: {
          options: () => promiseOptions
        }
      }
    ).fields;
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

  componentWillMount() {
    this._initForm(this.state.value);
  }

  onChange = value => this.setState({ value });

  add = () => {
    var validate = this.refs.form.validate().value;
    console.log("add", validate);
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
    }
  }
  render() {
    const { options, value, type } = this.state;
    const { toogleModal, open } = this.props;
    return (
      <div>
        <button onClick={toogleModal}>Open modal</button>
        <Modal open={open} onClose={toogleModal} center>
          <h2>Formulaire</h2>
          <t.form.Form
            ref="form"
            type={type}
            options={options}
            value={value}
            onChange={this.onChange}
          />
          <button onClick={this.add}>Add</button>
        </Modal>
      </div>
    );
  }
}