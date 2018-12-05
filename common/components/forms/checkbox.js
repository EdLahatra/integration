import t from 'tcomb-form';

const Component = t.form.Component;
const Nil = t.Nil;

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
  }
  // this is the only required method to implement
  getTemplate() {
    return this.props.options.factory.template;
  }

  static transformer = {
    format: value => Nil.is(value) ? false : value,
    parse: value => value
  }
  

  getLocals() {
    const locals = super.getLocals();
    // checkboxes must always have a label

    [
      'label',
      'placeholder',
      'help',
      'onBlur',
      'isValide',
    ].forEach(name => locals[name] = this.props.options[name]);

    return locals
  }
}
