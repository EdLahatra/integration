import PropTypes from 'prop-types'

import t from '../modules/tcomb-form';
import Factory from './factory-textarea';

const Component = t.form.Component;
const Nil = t.Nil;

// extend the base Component
export default class TextAreaComponent extends Component {

  // this is the only required method to implement
  getTemplate = () => Factory;

  // you can optionally override the default getLocals method
  // it will provide the locals param to your template
  getLocals() {
    const locals = super.getLocals();

    [
      'label',
      'name',
      'type',
      'maxLength',
      'className',
      'error',
      'hasError'
    ].forEach(name => { locals[name] = this.props.options[name] });

    return locals;
  }
}

// as example of transformer: this is the default transformer for textboxes
TextAreaComponent.transformer = {
  format: value => (Nil.is(value) ? null : value),
  parse: value => ((t.String.is(value) && value.trim() === '') || Nil.is(value) ? null : value),
};

TextAreaComponent.propTypes = {
  options: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    maxLength: PropTypes.String,
    label: PropTypes.String,
    className: PropTypes.String,
    error: PropTypes.String,
    hasError: PropTypes.String,
  }).isRequired,
}