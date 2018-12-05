import PropTypes from 'prop-types';

import t from '../modules/tcomb-form';
import Factory from './factory-field';

const Component = t.form.Component;
const Nil = t.Nil;

// extend the base Component
export default class InputComponent extends Component {

  // this is the only required method to implement
  getTemplate = () => Factory;

  // you can optionally override the default getLocals method
  // it will provide the locals param to your template
  getLocals() {
    const locals = super.getLocals();

    [
      'name',
      'id',
      'type',
      'placeholder',
      'onKeyUp',
      'onBlur',
      'label',
      'required',
      'help',
      'maxLength',
      'hidden',
      'containerID',
      'className',
      'containerClassName'
    ].forEach(name => { locals[name] = this.props.options[name] });

    return locals;
  }
}

// as example of transformer: this is the default transformer for textboxes
InputComponent.transformer = {
  format: value => (Nil.is(value) ? null : value),
  parse: value => ((t.String.is(value) && value.trim() === '') || Nil.is(value) ? null : value),
};

InputComponent.propTypes = {
  options: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onKeyUp: PropTypes.func,
    onBlur: PropTypes.func,
    label: PropTypes.string,
    required: PropTypes.string,
    help: PropTypes.string,
    maxLength: PropTypes.String,
    hidden: PropTypes.bool,
    containerID: PropTypes.String,
    className: PropTypes.String,
    containerClassName: PropTypes.String
  }).isRequired,
}