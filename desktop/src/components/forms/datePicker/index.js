import React from 'react';
import Factory from './factory-date';

const DateIndex = (locals) => {

    const newLocals = Object.assign(
        {},
        locals,
        { className: 'class', containerClassName: 'Ct' }
    );

    const changeValFunction = value => {
        newLocals.value = value;
        newLocals.onChange(value);
    }
    return (
        <div>
            <Factory
                hasError={newLocals.hasError}
                error={newLocals.error}
                label={newLocals.label}
                changeValFunction={changeValFunction}
                containerClassName={'changeValFunction'}
                className={'changeValFunction'}
            />
        </div>
    );

};
export default DateIndex;
