import React from "react";
import { Field } from "react-final-form";

import {
  Checkbox as MCheckBox,
  FormControlLabel,
  Typography,
} from "@material-ui/core";

function CheckBox({ name, label, onChange, validate, ...remainingProps }) {
  return (
    <Field
      name={name}
      validate={validate ? (val) => validate(name, val) : undefined}
      type="checkbox"
    >
      {({ input, meta }) => (
        <>
          <FormControlLabel
            label={label}
            control={
              <MCheckBox
                id={name}
                name={name}
                {...input}
                {...remainingProps}
                type="checkbox"
                onChange={(e) => {
                  input.onChange(e);
                  if (onChange) onChange(e);
                }}
              />
            }
          />
          {meta.error && (
            <Typography color="error" variant="subtitle1">
              {meta.error}
            </Typography>
          )}
        </>
      )}
    </Field>
  );
}

export default CheckBox;
