import React, { useState, useEffect } from "react";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { Form } from "react-final-form";
import { Redirect } from "react-router-dom";

import { Checkbox, Input, mobxify } from "../general";
import { useQuery } from "../../hooks";
import AuthBackground from "./AuthBackground";
import { agencyApi } from "../../utils";
import { required } from "../../utils/validations";

function RegistrationForm({ snackStore }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [agency, setAgency] = useState(null);
  const inviteToken = useQuery("invitation_token");

  useEffect(() => {
    async function getDetails() {
      try {
        const response = await agencyApi({
          path: `agencies/search_by_invitation_token`,
          method: "GET",
          headers: { "X-Invitation-Token": inviteToken },
        });
        setAgency(response);
      } catch (error) {
        snackStore.show({ message: error.message, severity: "error" });
      }
    }

    getDetails();
  }, [snackStore, inviteToken]);

  async function submit(values) {
    try {
      await agencyApi({
        path: "agency/users/accept/invitation",
        body: values,
        headers: {
          "X-Invitation-Token": inviteToken,
        },
      });
      setIsSuccess(true);
      snackStore.show({
        message: "Successfully signed up",
        severity: "success",
      });
    } catch (error) {
      snackStore.show({ message: error.message, severity: "error" });
    }
  }

  function formUi({ handleSubmit, submitting, pristine, invalid }) {
    return (
      <form onSubmit={handleSubmit}>
        <Grid container justify="center">
          <Grid item xs={10} sm={6} md={6}>
            <Paper style={{ padding: "2rem" }}>
              <Typography variant="h5" component="h4">
                Registration Process
              </Typography>
              <Grid
                item
                container
                direction="row"
                style={{ margin: "1.5rem 0rem" }}
              >
                <Grid item container spacing={2} sm={7} md={7}>
                  <Grid item xs={12}>
                    <Input
                      validate={required}
                      variant="outlined"
                      name="firstname"
                      label="First Name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      validate={required}
                      variant="outlined"
                      name="middlename"
                      label="Middle Name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      fullWidth
                      validate={required}
                      variant="outlined"
                      name="lastname"
                      label="Last Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      fullWidth
                      validate={required}
                      variant="outlined"
                      name="phonenumber"
                      label="Mobile Number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      fullWidth
                      validate={required}
                      variant="outlined"
                      name="password"
                      type="password"
                      label="Password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      fullWidth
                      validate={required}
                      variant="outlined"
                      type="password"
                      name="confirm"
                      label="Re-Enter Password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Checkbox
                      fullWidth
                      name="agree"
                      color="primary"
                      label="I accept to the Terms & Conditions of usage for the following application powered by Gangs Tracks"
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  sm={5}
                  md={5}
                  container
                  alignItems="center"
                  justify="center"
                  direction="column"
                >
                  {agency && (
                    <>
                      <img src={agency.agency_logo_url} alt="logo" />
                      <Typography variant="h5" component="h5">
                        {agency.agency_name}
                      </Typography>
                    </>
                  )}
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={submitting || pristine || invalid}
              >
                submit
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
    );
  }

  return isSuccess ? (
    <Redirect to="/agency/signin" />
  ) : (
    <AuthBackground>
      <Form
        validate={(values) => {
          const errors = {};
          if (values.confirm !== values.password) {
            errors.confirm = "Must match";
          } else if (!values.agree) {
            errors.agree = "Must agree";
          }
          return errors;
        }}
        onSubmit={submit}
      >
        {(props) => formUi(props)}
      </Form>
    </AuthBackground>
  );
}

export default mobxify("snackStore")(RegistrationForm);
