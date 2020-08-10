import React, { useState } from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { Field } from "react-final-form";

const useStyles = makeStyles(() => ({
  input: {
    display: "none",
  },
}));

function FileInput({ name, label, url, ...props }) {
  const classes = useStyles();
  const [file, setFile] = useState();
  return (
    <Field name={name}>
      {({ input: { value, onChange, ...input } }) => {
        function handleChange({ target }) {
          setFile(URL.createObjectURL(target.files[0]));
          onChange(target.files);
        }

        return (
          <Grid
            container
            direction="column"
            style={{ justifyContent: "center" }}
          >
            <Grid item>
              {!file && url && <img src={url} width="128" height="128" />}
            </Grid>
            <Grid item>
              {file && <img src={file} width="128" height="128" />}
            </Grid>
            <Grid>
              <input
                {...input}
                id={name}
                type="file"
                onChange={handleChange}
                className={classes.input}
                {...props}
              />
              <label htmlFor={name}>
                <Button color="primary" component="span">
                  {label}
                </Button>
              </label>
            </Grid>
          </Grid>
        );
      }}
    </Field>
  );
}

export default FileInput;
