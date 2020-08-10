import React from "react";
import { Field } from "react-final-form";

import { TextField, InputAdornment } from "@material-ui/core";

function Input({
  name,
  onChange,
  helperText,
  validate,
  prefix,
  ...remainingProps
}) {
  return (
    <Field
      name={name}
      validate={validate ? (val) => validate(name, val) : undefined}
    >
      {({ input, meta }) => (
        <TextField
          variant="outlined"
          id={name}
          name={name}
          {...input}
          {...remainingProps}
          autoComplete="off"
          error={meta.error && meta.visited}
          helperText={meta.visited ? meta.error : helperText}
          InputProps={{
            startAdornment: prefix && (
              <InputAdornment position="start">{prefix}</InputAdornment>
            ),
          }}
          onChange={(e) => {
            input.onChange(e);
            if (onChange) onChange(e);
          }}
        />
      )}
    </Field>
  );
}

export default Input;
