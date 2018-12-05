import React from 'react';


const TextAreaInput = (locals) => (
  <div className="rowForm">
    <span className="label-form strong">{locals.label}</span>
    <textarea
      type={locals.type}
      name={locals.name}
      value={locals.value}
      onChange={(e) => locals.onChange(e.target.value)}
      maxLength={locals.maxLength}
      className={locals.className}
      hidden={locals.hidden}
    /><br />
    {
      locals.hasError ? <label error style={{ "color": "red" }} htmlFor>{locals.error}</label> : null
    }
  </div>

);

export default TextAreaInput;