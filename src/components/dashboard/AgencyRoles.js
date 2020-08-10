import React from "react";
import { Navbar } from "../general";
import { Typography, Grid, Paper, Button } from "@material-ui/core";

function AgencyRoles() {
  return (
    <Navbar>
      <Typography variant="h4" style={{ marginTop: "50px" }}>
        Roles
      </Typography>
      <Typography variant="caption">MANAGE ROLES EFFECTIVELY</Typography>
      <Grid style={{ marginTop: "1rem" }}>
        <Typography variant="caption" style={{ color: "#4C4C4C" }}>
          CORE ROLES
        </Typography>
        <Grid item container spacing={2} style={{ marginTop: "1rem" }}>
          <Grid item xs={6} sm={3} md={2}>
            <Paper>
              <Grid item container spacing={2} justify="center">
                <Grid item>
                  <Typography variant="h5">Agency Admin</Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Grid}
                    item
                  >
                    Clone
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Paper>
              <Grid item container spacing={2} justify="center">
                <Grid item>
                  <Typography variant="h5">Sergeant/ Analyst</Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Grid}
                    item
                  >
                    Clone
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Paper>
              <Grid item container spacing={2} justify="center">
                <Grid item>
                  <Typography variant="h5">Police Officer</Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Grid}
                    item
                  >
                    Clone
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Paper>
              <Grid item container spacing={2} justify="center">
                <Grid item>
                  <Typography variant="h5">Consultant</Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Grid}
                    item
                  >
                    Clone
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid style={{ marginTop: "1rem" }}>
        <Typography variant="caption" style={{ color: "#4C4C4C" }}>
          AGENCY ROLES
        </Typography>
        <Grid container spacing={2} style={{ marginTop: "1rem" }}>
          <Grid item xs={6} sm={3} md={2}>
            <Grid item container spacing={2} justify="center" component={Paper}>
              <Grid item>
                <Typography variant="h5">Agency Admin</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  component={Grid}
                  item
                >
                  Clone
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Navbar>
  );
}

export default AgencyRoles;
