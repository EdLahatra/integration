import t from 'tcomb-form';

const Component = t.form.Component;
const Nil = t.Nil;

const defaultDatetimeValue = Object.freeze([null, null, null])

function toNull(value) {
  return (t.String.is(value) && value.trim() === '') || Nil.is(value) ? null : value
}

function parseNumber(value) {
  const n = parseFloat(value)
  const isNumeric = value == n // eslint-disable-line eqeqeq
  return isNumeric ? n : toNull(value)
}

// extend the base Component
export default class DateComponent extends Component {

    // this is the only required method to implement
    getTemplate() {
      return this.props.options.factory.template;
    }

    // you can optionally override the default getLocals method
    // it will provide the locals param to your template
    getLocals() {
        const locals = super.getLocals();
        [
          'help',
          'maximumDate',
          'minimumDate',
          'minuteInterval',
          'mode',
          'icon',
          'iconEnd',
          'onSubmitEditing',
          'format',
          'onSelect',
          'selected',
          'className',
          'containerClassName'
        ].forEach(name => locals[name] = this.props.options[name]); // eslint-disable-line
    
        return locals;
      }
}

// as example of transformer: this is the default transformer for textboxes
DateComponent.transformer = {
    format: (value) => {
        if (t.Array.is(value)) {
          return value
        } else if (t.Date.is(value)) {
          return [value.getFullYear(), value.getMonth(), value.getDate()].map(String)
        }
        return defaultDatetimeValue
      },
      parse: (value) => {
        const numbers = value.map(parseNumber)
        if (numbers.every(t.Number.is)) {
          return new Date(numbers[0], numbers[1], numbers[2])
        } else if (numbers.every(Nil.is)) {
          return null
        }
        return numbers
      }
};
