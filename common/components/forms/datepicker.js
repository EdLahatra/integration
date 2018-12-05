const t = require('tcomb-form');

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

export default class DatePicker extends Component {
  constructor(props) {
    super(props);
  }

  static transformer = {
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
  }

  // this is the only required method to implement
  getTemplate() {
    return this.props.options.factory.template;
  }

  getLocals() {
    const locals = super.getLocals();
    [
      'help',
      'maximumDate',
      'minimumDate',
      'minuteInterval',
      'mode',
      'timeZoneOffsetInMinutes',
      'icon',
      'iconEnd',
      'onSubmitEditing',
      'format',
    ].forEach(name => locals[name] = this.props.options[name]); // eslint-disable-line

    return locals;
  }
}

