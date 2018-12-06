import React from 'react';

let error = '';

const InputText = (locals) => {
  return (<div margin="normal" required={locals.required}>
    <label>{locals.label}</label>
    <input
      name={locals.name}
      type={locals.type}
      id={locals.id}
      autoComplete={locals.autoComplete}
      value={locals.value}
      onChange={(e) => {
        error = '',
        console.log('locals.value', locals.value);
        const val = locals.type === 'checkbox' ? e.target.checked : e.target.value;
        if (val && val.length < 2) error = 'test'
        locals.onChange(val);
      // locals.isValide(val);
      }
      }
      onKeyUp={locals.onKeyUpInput}
      placeholder={locals.placeholder}
      onBlur={locals.onBlur}
    />
    <p id="help" >{locals.help}</p>
    <p id="name-error-text" >{error}</p>
    {
      locals.required
        ? <p id="name-error-text" error>
          {locals.isValide ? locals.errorInput : null}
        </p>
        : null
    }
  </div>);
};

export default InputText;
