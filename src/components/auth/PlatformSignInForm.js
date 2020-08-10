import React from "react";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { Form } from "react-final-form";
import { Redirect } from "react-router-dom";

import { Input, mobxify } from "../general";
import AuthBackground from "./AuthBackground";
import { composeValidators, required, isEmail } from "../../utils/validations";
import { platformApi } from "../../utils";

function PlatformSignInForm({ authStore, snackStore }) {
  async function submit(values) {
    try {
      const { jwt, refresh_token } = await platformApi({
        path: "platform/users/login",
        body: values,
      });
      authStore.platformLogin({ jwt, refresh_token });
    } catch (error) {
      snackStore.show({ message: error.message, severity: "error" });
    }
  }

  function loginUi({ handleSubmit, submitting, pristine, invalid }) {
    return (
      <form onSubmit={handleSubmit}>
        <Paper style={{ padding: "2rem" }}>
          <Grid container spacing={2} direction="column" alignItems="center">
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
              <Input
                type="password"
                validate={required}
                fullWidth
                name="password"
                label="Password"
              />
            </Grid>
            {!invalid && (
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting || pristine}
                >
                  {submitting ? "Submitting..." : "submit"}
                </Button>
              </Grid>
            )}
          </Grid>
        </Paper>
      </form>
    );
  }

  return authStore.isPlatformLoggedIn ? (
    <Redirect to="/platform/agencies" />
  ) : (
    <AuthBackground>
      <Form onSubmit={submit}>{(props) => loginUi(props)}</Form>
    </AuthBackground>
  );
}

export default mobxify("authStore", "snackStore")(PlatformSignInForm);
