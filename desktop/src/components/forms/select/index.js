import React from 'react';

import Select from './selectCommponent';

let error = '';

const InputText = (locals) => {
  const getValue = value => {
    console.log('dddd', value);
    const val = value.value;
    locals.value = val;
    locals.onChange(val);
  }
  return (
    <Select
      porps={locals}
      getValue={getValue}
      promiseOptions={locals.promiseOptions}
    />
  );
};

export default InputText;
