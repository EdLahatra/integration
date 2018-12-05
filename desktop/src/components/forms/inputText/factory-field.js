import React from 'react';


const InputText = (locals) => (
  <div className={locals.containerClassName}>
    <span className="label-form strong">{locals.label}</span>
    <input
      id={locals.id}
      type={locals.type}
      name={locals.name}
      placeholder={locals.placeholder}
      value={locals.value ? locals.value : ''}
      required={locals.required}
      help={locals.help}
      onChange={(e) => locals.onChange(e.target.value)}
      onKeyUp={locals.onKeyUp}
      onBlur={locals.onBlur}
      maxLength={locals.maxLength}
      hidden={locals.hidden}
      className={locals.className}
    /><br />
    {
      locals.hasError ? <label error style={{ "color": "red" }} htmlFor>{locals.error}</label> : null
    }
  </div>
);

export default InputText;