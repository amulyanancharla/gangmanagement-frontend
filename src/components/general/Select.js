import React from "react";
import { Field } from "react-final-form";

import {
  Select as MaterialSelect,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

function Select({
  name,
  label,
  onChange,
  options,
  validate,
  minWidth,
  allowNone,
  ...remainingProps
}) {
  return (
    <Field
      name={name}
      label={label}
      options={options}
      minWidth={minWidth}
      validate={validate ? (val) => validate(name, val) : undefined}
    >
      {({ input, meta, name, options }) => (
        <FormControl variant="outlined" style={{ minWidth: minWidth }}>
          <InputLabel
            id={`${name}-label`}
            error={meta.touched && meta.error && true}
          >
            {label}
          </InputLabel>
          <MaterialSelect
            labelId={`${name}-label`}
            id={name}
            label={label}
            error={meta.touched && meta.error && true}
            name={name}
            onChange={(e) => {
              input.onChange(e);
              if (onChange) onChange(e);
            }}
            {...input}
          >
            {allowNone && (
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            )}
            {options.map(({ name, value }, i) => (
              <MenuItem key={i} value={value}>
                {name}
              </MenuItem>
            ))}
          </MaterialSelect>
          {meta.touched && meta.error && (
            <FormHelperText error>{meta.error}</FormHelperText>
          )}
        </FormControl>
      )}
    </Field>
  );
}

export default Select;
