import React from 'react';
import Factory from './factory-date';

const DateIndex = (locals) => {

    const newLocals = Object.assign({}, locals)

    const changeValFunction = value => {
        newLocals.value = value;
        newLocals.onChange(value);
    }
    return (
        <div>
            <Factory
                props={newLocals}
                hasError={newLocals.hasError}
                error={newLocals.error}
                label={newLocals.label}
                selected={newLocals.selected}
                changeFunction={changeValFunction} />
        </div>
    );

};
export default DateIndex;
