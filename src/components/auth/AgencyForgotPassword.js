import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Button, Hidden } from "@material-ui/core";
import { Form } from "react-final-form";

import { agencyApi } from "../../utils";
import AuthBackground from "./AuthBackground";
import { Input, mobxify } from "../general";
import { useQuery } from "../../hooks";

function AgencyForgotPassword({ snackStore }) {
  const email = useQuery("email");
  const [agency, setAgency] = useState(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    async function getAgency() {
      try {
        setFetching(true);
        const response = await agencyApi({
          path: `agencies/search?email=${email}`,
          method: "GET",
        });
        setAgency(response);
        setFetching(false);
      } catch (error) {
        setFetching(false);
        snackStore.show({
          message: "Unable to fetch agency details",
          severity: "error",
        });
      }
    }

    if (email) getAgency();
  }, [email, snackStore]);

  async function submit(values) {
    try {
      await agencyApi({
        path: "agency/users/password/reset/by_email/initiate",
        body: values,
      });
      snackStore.show({ message: "Email sent", severity: "success" });
    } catch (error) {
      snackStore.show({ message: error.message, severity: "error" });
    }
  }

  return (
    <AuthBackground logo={agency && agency.agency_logo_url}>
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
                    Let's help with Password
                  </Typography>
                </Grid>
                <Form onSubmit={submit} initialValues={{ email }}>
                  {({ handleSubmit, submitting, pristine, invalid }) => (
                    <form onSubmit={handleSubmit}>
                      <Grid item container spacing={2} direction="column">
                        <Grid item>
                          <Input
                            fullWidth
                            name="email"
                            label="Email"
                            variant="outlined"
                            style={{ marginBottom: "30px" }}
                          />
                        </Grid>
                      </Grid>
                      <Grid item container justify="space-between">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          // disabled={submitting || pristine || invalid}
                        >
                          RESET PASSWORD
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
                    {agency && agency.agency_name}
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

export default mobxify("snackStore")(AgencyForgotPassword);
