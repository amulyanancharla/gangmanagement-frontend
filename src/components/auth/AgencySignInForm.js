import React, { useState } from "react";
import { Button, Grid, Paper, Typography, Hidden } from "@material-ui/core";
import { Form } from "react-final-form";
import { Link, Redirect } from "react-router-dom";

import { Input, mobxify } from "../general";
import AuthBackground from "./AuthBackground";
import { composeValidators, required, isEmail } from "../../utils/validations";

import { agencyApi } from "../../utils";

function SignInForm({ snackStore, authStore }) {
  const [email, setEmail] = useState("");
  const [agency, setAgency] = useState(null);

  async function submit(values) {
    try {
      const response = await agencyApi({
        path: "agency/users/login",
        body: values,
      });
      authStore.agentLogin(response);
      snackStore.show({
        message: "Successfully logged in",
        severity: "success",
      });
    } catch (error) {
      snackStore.show({ message: error.message, severity: "error" });
    }
  }

  async function getDetails(email) {
    try {
      const response = await agencyApi({
        path: `agencies/search?email=${email}`,
        method: "GET",
      });
      setAgency(response);
      setEmail(email);
    } catch (error) {
      snackStore.show({ message: error.message, severity: "error" });
    }
  }

  function emailUi({ handleSubmit, submitting, pristine, invalid }) {
    return (
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item>
            <Paper style={{ padding: "2rem" }}>
              <Grid
                item
                container
                spacing={2}
                direction="column"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="h5" component="h4">
                    Login
                  </Typography>
                </Grid>
                <Grid item>
                  <Input
                    validate={composeValidators(required, isEmail)}
                    fullWidth
                    name="email"
                    label="Email"
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting || pristine || invalid}
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    );
  }

  function loginUi({ handleSubmit, submitting, pristine, invalid }) {
    return (
      <form onSubmit={handleSubmit}>
        <Grid container justify="center">
          <Grid item xs={10}>
            <Paper style={{ padding: "2rem" }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h5" component="h4">
                    Login
                  </Typography>
                </Grid>
                <Grid container spacing={4}>
                  <Grid
                    container
                    item
                    xs={12}
                    sm={7}
                    spacing={6}
                    direction="column"
                  >
                    <Grid container item spacing={2} direction="column">
                      <Grid item>
                        <Typography
                          variant="body1"
                          style={{ margin: "15px 15px" }}
                        >
                          {email}
                        </Typography>
                        <Input
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          validate={required}
                        />
                      </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={submitting || pristine || invalid}
                        >
                          {submitting ? "Logging in..." : "Login"}
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          color="primary"
                          type="submit"
                          component={Link}
                          to={`/agency/forgot_password?email=${email}`}
                        >
                          Forgot Password
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Hidden smDown>
                    <Grid item container sm={5}>
                      <Typography variant="h5" component="h5">
                        <span style={{ fontSize: "15px" }}>
                          Gang Tracking System for
                          <br />
                        </span>
                        {agency.agency_name}
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
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    );
  }

  return authStore.isAgentLoggedIn ? (
    <Redirect to="/agency/dashboard" />
  ) : (
    <AuthBackground logo={agency ? agency.agency_logo_url : null}>
      {email === "" ? (
        <Form onSubmit={({ email }) => getDetails(email)}>
          {(props) => emailUi(props)}
        </Form>
      ) : (
        <Form onSubmit={submit}>{(props) => loginUi(props)}</Form>
      )}
    </AuthBackground>
  );
}

export default mobxify("snackStore", "authStore")(SignInForm);
