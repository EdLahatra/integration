import t from 'tcomb-form';

const Component = t.form.Component;
const Nil = t.Nil;

// extend the base Component
export default class MyComponent extends Component {
  constructor(props) {
    super(props);
  }
  // this is the only required method to implement
  getTemplate() {
    return this.props.options.factory.template;
  }

  // you can optionally override the default getLocals method
  // it will provide the locals param to your template
  getLocals() {
    const locals = super.getLocals();

    [
      'name',
      'id',
      'autoComplete',
      'value',
      'required',
      'onKeyUpInput',
      'fullWidth',
      'errorInput',
      'label',
      'placeholder',
      'help',
      'onBlur',
      'isValide',
    ].forEach(name => locals[name] = this.props.options[name]);

    return locals;
  }
}

// as example of transformer: this is the default transformer for textboxes
MyComponent.transformer = {
  format: value => (Nil.is(value) ? null : value),
  parse: value => ((t.String.is(value) && value.trim() === '') || Nil.is(value) ? null : value),
};
