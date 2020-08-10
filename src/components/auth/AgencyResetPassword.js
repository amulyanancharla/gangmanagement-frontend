import React from "react";
import { Grid, Paper, Typography, Button, Hidden } from "@material-ui/core";
import { Form } from "react-final-form";
import { Redirect } from "react-router-dom";

import { agencyApi } from "../../utils";
import AuthBackground from "./AuthBackground";
import { Input, mobxify } from "../general";
import { useQuery } from "../../hooks";

function AgencyResetPassword({ snackStore, authStore }) {
  const resetToken = useQuery("password_reset_token");

  async function submit(values) {
    try {
      const { jwt, refresh_token } = await agencyApi({
        path: "agency/users/password/reset/by_email/validate",
        body: values,
        headers: {
          "X-Password-Reset-Token": resetToken,
        },
      });
      authStore.agentLogin(jwt, refresh_token);
      snackStore.show({
        message: "Password has been reset",
        severity: "success",
      });
    } catch (error) {
      snackStore.show({
        message: Object.values(error.errors)[0],
        severity: "error",
      });
    }
  }
  return authStore.isAgentLoggedIn ? (
    <Redirect to="/agency/dashboard" />
  ) : (
    <AuthBackground>
      <Grid container justify="center">
        <Grid item xs={6}>
          <Paper style={{ padding: "2rem" }}>
            <Grid container spacing={6}>
              <Grid
                container
                item
                xs={12}
                sm={7}
                spacing={4}
                direction="column"
              >
                <Grid item>
                  <Typography variant="h5" component="h4">
                    Please create a new password
                  </Typography>
                </Grid>
                <Form
                  onSubmit={submit}
                  validate={(values) => {
                    const errors = {};
                    if (values.confirm !== values.password) {
                      errors.confirm = "Must match";
                    }
                    return errors;
                  }}
                >
                  {({ handleSubmit, submitting, pristine, invalid }) => (
                    <form onSubmit={handleSubmit}>
                      <Grid item container spacing={2} direction="column">
                        <Grid item>
                          <Input
                            fullWidth
                            name="password"
                            label="Password"
                            variant="outlined"
                            type="password"
                          />
                        </Grid>
                        <Grid item>
                          <Input
                            fullWidth
                            name="confirm"
                            label="Confirm password"
                            variant="outlined"
                            type="password"
                            style={{ marginBottom: "3.5rem" }}
                          />
                        </Grid>
                      </Grid>
                      <Grid item container justify="space-between">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={submitting || pristine || invalid}
                        >
                          UPDATE PASSWORD
                        </Button>
                      </Grid>
                    </form>
                  )}
                </Form>
              </Grid>
              <Hidden smDown>
                <Grid item container sm={5}>
                  <Typography variant="h5" component="h5">
                    <span style={{ fontSize: "15px" }}>
                      Gang Tracking System for
                      <br />
                    </span>
                    Santa Monica Police Department, California
                  </Typography>
                  <Typography
                    variant="caption"
                    style={{
                      alignSelf: "flex-end",
                      color: "#3C3B6E",
                      fontSize: "10px",
                    }}
                  >
                    TECHNICAL QUERIES
                    <br />
                    support@smpd.ca.gov
                    <br />
                    +1 764.542.XXXX
                  </Typography>
                </Grid>
              </Hidden>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </AuthBackground>
  );
}

export default mobxify("snackStore", "authStore")(AgencyResetPassword);
