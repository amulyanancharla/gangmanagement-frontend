import React from "react";
import { Field } from "react-final-form";
import DateFnsUtils from "@date-io/moment";

import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

function DateInput({ name, label, onChange, validate, ...remainingProps }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Field
        name={name}
        validate={validate ? (val) => validate(name, val) : undefined}
      >
        {({ input, meta }) => (
          <DatePicker
            id={name}
            name={name}
            label={label}
            {...input}
            {...remainingProps}
            autoComplete="off"
            error={meta.error && meta.visited}
            helperText={meta.visited ? meta.error : null}
            onChange={(e) => {
              input.onChange(e);
              if (onChange) onChange(e);
            }}
          />
        )}
      </Field>
    </MuiPickersUtilsProvider>
  );
}

export default DateInput;
