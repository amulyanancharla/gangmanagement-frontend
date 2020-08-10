import React from "react";

import {
  Box,
  Typography,
  Grid,
  Paper,
  Switch,
  Divider,
} from "@material-ui/core";
import { Form } from "react-final-form";

import { Input, Select } from "../../general";

function Validations() {
  function submit(values) {
    console.log(values);
  }
  return (
    <Form onSubmit={submit}>
      {({ form, handleSubmit, submitting, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Paper style={{ padding: "1rem" }}>
                <Grid item>
                  <Typography variant="caption">BASIC INFORMATION</Typography>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Input
                      variant="outlined"
                      label="VALIDATION DATE"
                      name="validation.date"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Input
                      variant="outlined"
                      label="USER"
                      name="validation.user"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Select
                      name="validation.gangs"
                      label="GANGS"
                      minWidth="100%"
                      options={["BLACK", "GREY", "WHITE"].map((state) => ({
                        name: state,
                        key: state,
                        value: state,
                      }))}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Select
                      name="validation.opposition"
                      label="OPPOSITION GANGS"
                      minWidth="100%"
                      options={["BLACK", "GREY", "WHITE"].map((state) => ({
                        name: state,
                        key: state,
                        value: state,
                      }))}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Select
                      name="validation.sections"
                      label="SECTS"
                      minWidth="100%"
                      options={["BLACK", "GREY", "WHITE"].map((state) => ({
                        name: state,
                        key: state,
                        value: state,
                      }))}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Select
                      name="validation.oppostion_sections"
                      label="OPPOSIION SECTS"
                      minWidth="100%"
                      options={["BLACK", "GREY", "WHITE"].map((state) => ({
                        name: state,
                        key: state,
                        value: state,
                      }))}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <Typography variant="caption">Adult</Typography>
                  </Grid>
                  <Grid item>
                    <Switch
                      color="primary"
                      inputProps={{ "aria-label": "primary checkbox" }}
                      name="validation.type"
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">Juvenille</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">Member</Typography>
                  </Grid>
                  <Grid item>
                    <Switch
                      color="primary"
                      inputProps={{ "aria-label": "primary checkbox" }}
                      name="validation.type"
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">Assocaite</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper style={{ padding: "1rem" }}>
                <Grid item>
                  <Typography variant="caption">
                    STOP LOCATION INFORMATION
                  </Typography>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Input
                      variant="outlined"
                      label="ADDRESS"
                      name="validation.address"
                      fullWidth
                    />
                  </Grid>
                  <Grid item container spacing={1} xs={12}>
                    <Grid item xs={5}>
                      <Select
                        name="validation.district"
                        label="DISTRICT"
                        minWidth="100%"
                        options={["6D", "5Y", "3C"].map((state) => ({
                          name: state,
                          key: state,
                          value: state,
                        }))}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Select
                        name="validation.psa"
                        label="PSA"
                        minWidth="100%"
                        options={["6D", "5Y", "3C"].map((state) => ({
                          name: state,
                          key: state,
                          value: state,
                        }))}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Select
                        name="validation.sector"
                        label="SECTOR"
                        minWidth="100%"
                        options={["6D", "5Y", "3C"].map((state) => ({
                          name: state,
                          key: state,
                          value: state,
                        }))}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={7}>
                      <Input
                        variant="outlined"
                        label="DATE"
                        name="validation.date"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Input
                        variant="outlined"
                        label="TIME"
                        name="validation.time"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper style={{ padding: "1rem" }}>
                <Grid item xs={12}>
                  <Typography variant="caption">
                    NARRATIVE INFORMATION
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Input
                    variant="outlined"
                    label="NARRATION BY USER"
                    name="validation.narration"
                    fullWidth
                    rows={2}
                  />
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper style={{ padding: "1rem" }}>
                <Grid item xs={12}>
                  <Typography variant="caption">VALIDATION FORMS</Typography>
                </Grid>
                <Grid item container xs={12}>
                  <Grid item xs={3}>
                    <Box
                      style={{
                        background: "rgba(207, 247, 197, 0.7)",
                        borderRadius: "3px",
                      }}
                    >
                      <Typography variant="body2">
                        An Individual may be entered into the Intelligence
                        Branch Gang Database as a gang member if there is
                        documentation to support a resonable suspicion to
                        believe any one of the following:
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={1}>
                    <Divider orientation="vertical" component="hr" />
                  </Grid>
                  <Grid item xs={8}>
                    <Box
                      style={{
                        background: "rgba(207, 247, 197, 0.7)",
                        borderRadius: "3px",
                      }}
                    >
                      <Typography variant="body2">
                        An Individual may be entered into the Intelligence
                        Branch Gang Database as a Gang member if there is
                        documentation to support a resonable suspicion to
                        believe two of the following; or as a gang associate if
                        there is reasonable suspicion to believe one of the
                        following
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
}

export default Validations;
