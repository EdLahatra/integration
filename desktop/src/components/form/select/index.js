import React from 'react';

import Select from './selectCommponent';

let error = '';

const InputText = (locals) => {
  console.log('locals locals', locals.value);
  const testFunction = value => {
    console.log('testFunction', value);
    const val = value.value;
    locals.value = val;
    locals.onChange(val);
  }
  return (<Select porps={locals} testFunction={testFunction} />);
};

export default InputText;
