import React, { useState } from "react";
import { Typography, Paper, Grid, Button } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { Form } from "react-final-form";

import {
  Input,
  FileInput,
  mobxify,
  Navbar,
  Select,
  Checkbox,
} from "../general";
import { platformApi, states } from "../../utils";
import { composeValidators, required, isEmail } from "../../utils/validations";

function AddAgency({ snackStore }) {
  const [isSuccess, setIsSuccess] = useState(false);

  async function submit(values) {
    const { logo, ...bodyValues } = values;
    const request = encodeURIComponent(JSON.stringify(bodyValues));
    const body = new FormData();
    if (values.logo) body.append("file", values.logo[0]);
    try {
      await platformApi({
        path: `agencies?request=${request}`,
        body,
        contentType: "multipart",
      });
      setIsSuccess(true);
      snackStore.show({ message: "Added agency", severity: "success" });
    } catch (error) {
      snackStore.show({ message: error.message, severity: "error" });
    }
  }

  return isSuccess ? (
    <Redirect to="/platform/agencies" />
  ) : (
    <Navbar>
      <Form onSubmit={submit}>
        {({ handleSubmit, submitting, pristine, invalid }) => (
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" style={{ marginTop: "2rem" }}>
              Add Agency
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Paper style={{ marginTop: "3rem", padding: "1.5rem" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        GENERAL INFORMATION
                      </Typography>
                    </Grid>
                    <Grid spacing={2} container item xs={12} md={8}>
                      <Grid item xs={12}>
                        <Input
                          validate={required}
                          variant="outlined"
                          label="NAME OF POLICE DEPARTMENT"
                          name="agency_name"
                          placeholder="NAME OF POLICE DEPARTMENT"
                          fullWidth
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Input
                          validate={required}
                          variant="outlined"
                          name="address_line1"
                          label="ADDRESS"
                          placeholder="ADDRESS"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Input
                          variant="outlined"
                          name="custom_domain"
                          label="CUSTOM DOMAIN"
                          placeholder="CUSTOM DOMAIN"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Grid item container xs={12} md={4} spacing={2}>
                      <Grid item xs={12} style={{ minWidth: "4rem" }}>
                        <Select
                          name="state"
                          label="STATE"
                          minWidth="10rem"
                          options={states}
                        />
                      </Grid>
                      <Grid item container xs={12} style={{ minWidth: "4rem" }}>
                        <FileInput name="logo" label="Upload logo" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} justify="flex-end">
                    <Grid item>
                      <Button to="/platform/agencies" component={Link}>
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={submitting || pristine || invalid}
                      >
                        {submitting ? "Saving.." : "Save"}
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item container xs={12} md={4}>
                <Paper style={{ marginTop: "3rem", padding: "1.5rem" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        AGENCY ADMIN USER
                      </Typography>
                    </Grid>
                    <Grid spacing={2} container item xs={12}>
                      <Grid item xs={12}>
                        <Input
                          validate={required}
                          variant="outlined"
                          label="ADMIN FULL NAME"
                          name="agency_admin.fullname"
                          placeholder="ADMIN FULL NAME"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Input
                          validate={composeValidators(required, isEmail)}
                          variant="outlined"
                          name="agency_admin.email"
                          label="ADMIN EMAIL ADDRESS"
                          placeholder="ADMIN EMAIL ADDRESS"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Input
                          validate={required}
                          variant="outlined"
                          name="agency_admin.phonenumber"
                          label="PHONE NUMBER"
                          placeholder="PHONE NUMBER"
                          fullWidth
                          prefix="+1"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>

                <Paper style={{ marginTop: "1rem", padding: "1.5rem" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">DATA & FORMS</Typography>
                    </Grid>
                    <Grid spacing={2} container item xs={12}>
                      <Grid item xs={12}>
                        <Checkbox
                          name="allow_to_override_data_and_forms"
                          color="primary"
                          label="Allow user to override default elements label and type"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
                <Paper style={{ marginTop: "1rem", padding: "1.5rem" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        SECURITY SETTINGS
                      </Typography>
                    </Grid>
                    <Grid spacing={2} container item xs={12}>
                      <Grid item xs={12}>
                        <Checkbox
                          name="allow_to_override_security_settings"
                          color="primary"
                          label="Allow Agency Admin to change password policies"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </form>
        )}
      </Form>
    </Navbar>
  );
}

export default mobxify("snackStore")(AddAgency);
