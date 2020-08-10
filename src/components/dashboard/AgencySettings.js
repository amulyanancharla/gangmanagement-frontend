import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Paper,
  Button,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { Form } from "react-final-form";
import jiff from "jiff";

import { agencyApi } from "../../utils";
import { Input, Navbar, mobxify, FileInput } from "../general";

function AgencySettings({ authStore, snackStore }) {
  const [user, setUser] = useState({});
  const [support, setSupport] = useState({});
  const [masterUserId, setMasterUserId] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);

  useEffect(() => {
    async function getSettings() {
      try {
        const {
          master_agency_user_id,
          support_email,
          support_phonenumber,
          agency_logo_url,
        } = await agencyApi({
          path: `agencies/${authStore.agencyInfo.agency_id}`,
          method: "GET",
        });
        setLogoUrl(agency_logo_url);
        setMasterUserId(master_agency_user_id);
        setSupport({ support_email, support_phonenumber });
        const {
          firstname,
          middlename,
          lastname,
          phonenumber,
        } = await agencyApi({
          path: `agencies/${authStore.agencyInfo.agency_id}/users/${master_agency_user_id}`,
          method: "GET",
        });
        setUser({ firstname, middlename, lastname, phonenumber });
      } catch (error) {
        snackStore.show({
          message: "Unable to fetch settings",
          severity: "error",
        });
      }
    }

    getSettings();
  }, [snackStore, authStore.agencyInfo.agency_id]);

  function submit(values) {
    console.log(values);
  }

  async function submitUser(values) {
    try {
      await agencyApi({
        path: `agencies/${authStore.agencyInfo.agency_id}/users/${masterUserId}`,
        body: JSON.stringify(jiff.diff(user, values)),
        method: "PATCH",
        stringify: false,
      });
      setUser(values);
      snackStore.show({ message: "Settings updated", severity: "success" });
    } catch (error) {
      snackStore.show({ message: error.message, severity: "error" });
    }
  }

  async function submitSupport(values) {
    try {
      await agencyApi({
        path: `agencies/${authStore.agencyInfo.agency_id}`,
        body: JSON.stringify(jiff.diff(support, values)),
        method: "PATCH",
        stringify: false,
      });
      setSupport(values);
      snackStore.show({ message: "Settings updated", severity: "success" });
    } catch (error) {
      snackStore.show({ message: error.message, severity: "error" });
    }
  }
  return (
    <Navbar>
      <Typography variant="h4" style={{ marginTop: "2rem" }}>
        Settings
      </Typography>
      <Typography variant="caption">YOUR SETTINGS</Typography>
      <Grid item container spacing={2} style={{ marginTop: "1rem" }}>
        <Grid item xs={12} sm={7}>
          <Form onSubmit={submitUser} initialValues={user}>
            {({ handleSubmit, submitting, pristine, invalid }) => (
              <form onSubmit={handleSubmit}>
                <Paper style={{ padding: "1rem" }}>
                  <Typography variant="caption">USER SETTINGS</Typography>
                  <Grid
                    direction="column"
                    item
                    container
                    spacing={2}
                    style={{ marginTop: "1rem" }}
                  >
                    <Grid item>
                      <Typography variant="body2">Agency Admin</Typography>
                    </Grid>
                    <Grid item>
                      {authStore.agencyInfo && (
                        <Typography variant="body2">
                          {authStore.agencyInfo.sub}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <Input
                          name="firstname"
                          variant="outlined"
                          label="First Name"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Input
                          name="middlename"
                          variant="outlined"
                          label="Middle Name"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Input
                          name="lastname"
                          variant="outlined"
                          label="Last Name"
                        />
                      </Grid>
                    </Grid>
                    <Grid item container spacing={2} alignItems="center">
                      <Grid item xs={4}>
                        <Input
                          name="phonenumber"
                          variant="outlined"
                          label="Mobile"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Input
                          name="password"
                          variant="outlined"
                          label="Password"
                          type="password"
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      spacing={4}
                      alignItems="center"
                      justify="center"
                    >
                      <Grid item>
                        <Button
                          disabled={submitting || pristine || invalid}
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          APPLY CHANGE
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </form>
            )}
          </Form>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Form onSubmit={submitSupport} initialValues={support}>
            {({ handleSubmit, submitting, pristine, invalid }) => (
              <form onSubmit={handleSubmit}>
                <Paper style={{ padding: "1rem", minHeight: "20.5rem" }}>
                  <Typography variant="caption">SUPPORT DETAILS</Typography>
                  <Grid
                    container
                    item
                    spacing={2}
                    direction="column"
                    justify="center"
                    style={{ marginTop: "2rem" }}
                  >
                    <Grid item>
                      <Input
                        fullWidth
                        variant="outlined"
                        name="support_email"
                        label="Support Email"
                      />
                    </Grid>
                    <Grid item>
                      <Input
                        fullWidth
                        variant="outlined"
                        name="support_phonenumber"
                        label="Phone"
                      />
                    </Grid>
                    <Grid
                      item
                      style={{
                        alignSelf: "flex-end",
                      }}
                    >
                      <Button
                        disabled={submitting || pristine || invalid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </form>
            )}
          </Form>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Form onSubmit={submit}>
            {({ handleSubmit, submitting, pristine, invalid }) => (
              <form onSubmit={handleSubmit}>
                <Paper style={{ padding: "1rem", minHeight: "20.5rem" }}>
                  <Typography variant="caption">AGENCY LOGO</Typography>
                  <Grid
                    container
                    item
                    spacing={2}
                    direction="column"
                    alignItems="center"
                    style={{ marginTop: "2rem" }}
                  >
                    <Grid item>
                      <FileInput
                        url={logoUrl}
                        name="file"
                        label="Upload logo"
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        disabled={submitting || pristine || invalid}
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Save Changes
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </form>
            )}
          </Form>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Paper style={{ padding: "1rem" }}>
            <Typography variant="caption">THEMES</Typography>
            <Grid item container spacing={2}>
              <Grid item container>
                <Grid item container xs={6}>
                  <Grid
                    item
                    xs={3}
                    style={{
                      minHeight: "5rem",
                      backgroundColor: "#3C3B6E",
                    }}
                  ></Grid>
                  <Grid
                    item
                    xs={3}
                    style={{
                      minHeight: "5rem",
                      backgroundColor: "#FFFFFF",
                    }}
                  ></Grid>
                  <Grid
                    item
                    xs={3}
                    style={{
                      minHeight: "5rem",
                      backgroundColor: "#B22234",
                    }}
                  ></Grid>
                  <Grid
                    item
                    xs={3}
                    style={{
                      minHeight: "5rem",
                      backgroundColor: "#BDBDBD",
                    }}
                  ></Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={6}
                  alignItems="center"
                  justify="center"
                >
                  <FormControlLabel
                    value="theme1"
                    control={<Radio />}
                    label="Theme 1"
                  />
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item container xs={6}>
                  <Grid
                    item
                    xs={3}
                    style={{
                      minHeight: "5rem",
                      backgroundColor: "#331E36",
                    }}
                  ></Grid>
                  <Grid
                    item
                    xs={3}
                    style={{
                      minHeight: "5rem",
                      backgroundColor: "#ECFEE8",
                    }}
                  ></Grid>
                  <Grid
                    item
                    xs={3}
                    style={{
                      minHeight: "5rem",
                      backgroundColor: "#6EA4BF",
                    }}
                  ></Grid>
                  <Grid
                    item
                    xs={3}
                    style={{
                      minHeight: "5rem",
                      backgroundColor: "#C2EFEB",
                    }}
                  ></Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={6}
                  alignItems="center"
                  justify="center"
                >
                  <FormControlLabel
                    value="theme1"
                    control={<Radio />}
                    label="Theme 1"
                  />
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item container xs={6}>
                  <Grid
                    item
                    xs={3}
                    style={{
                      minHeight: "5rem",
                      backgroundColor: "#F5DD90",
                    }}
                  ></Grid>
                  <Grid
                    item
                    xs={3}
                    style={{
                      minHeight: "5rem",
                      backgroundColor: "#FFFFFF",
                    }}
                  ></Grid>
                  <Grid
                    item
                    xs={3}
                    style={{
                      minHeight: "5rem",
                      backgroundColor: "#F68E5F",
                    }}
                  ></Grid>
                  <Grid
                    item
                    xs={3}
                    style={{
                      minHeight: "5rem",
                      backgroundColor: "#586BA4",
                    }}
                  ></Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={6}
                  alignItems="center"
                  justify="center"
                >
                  <FormControlLabel
                    value="theme1"
                    control={<Radio />}
                    label="Theme 1"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Paper style={{ padding: "1rem" }}>
            <Typography variant="caption">CONTENT</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Navbar>
  );
}

export default mobxify("authStore", "snackStore")(AgencySettings);
