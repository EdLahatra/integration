import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

let error = '';

const InputText = (locals) => {
  return (<FormControl margin="normal" required={locals.required} fullWidth={locals.fullWidth}>
    <InputLabel>{locals.label}</InputLabel>
    <Input
      name={locals.name}
      type="text"
      id={locals.id}
      autoComplete={locals.autoComplete}
      value={locals.value}
      onChange={(e) => {
        error = '',
        console.log('locals.value', locals.value);
        const val = e.target.value;
        if (val && val.length < 2) error = 'test'
        locals.onChange(val);
      // locals.isValide(val);
      }
      }
      onKeyUp={locals.onKeyUpInput}
      placeholder={locals.placeholder}
      onBlur={locals.onBlur}
    />
    <FormHelperText id="help" >{locals.help}</FormHelperText>
    <FormHelperText id="name-error-text" >{error}</FormHelperText>
    {
      locals.required
        ? <FormHelperText id="name-error-text" error>
          {locals.isValide ? locals.errorInput : null}
        </FormHelperText>
        : null
    }
  </FormControl>);
};

export default InputText;
