import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActionArea,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { mobxify, Navbar } from "../general";
import { platformApi } from "../../utils";

function Agencies({ snackStore }) {
  const [agencies, setAgencies] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    async function getAgencies() {
      try {
        setFetching(true);
        const agencies = await platformApi({ method: "GET", path: "agencies" });
        setAgencies(agencies);
        setFetching(false);
      } catch (error) {
        setFetching(false);
        snackStore.show({
          message: "Unable to fetch agencies",
          severity: "error",
        });
      }
    }

    getAgencies();
  }, [snackStore]);

  return (
    <Navbar>
      <Typography variant="h4" style={{ marginTop: "50px" }}>
        Agencies
      </Typography>
      <Grid
        container
        spacing={3}
        style={{ marginTop: "3rem" }}
        justify="center"
      >
        <Grid container item sm={6} md={9} xs={10} spacing={2}>
          {fetching && (
            <Grid container alignContent="center" justify="center">
              <CircularProgress />
            </Grid>
          )}
          {!fetching &&
            agencies.map(
              ({
                agency_id,
                address_line1,
                agency_name,
                contact_email,
                state,
                contact_phonenumber,
                agency_logo_url,
              }) => (
                <Grid item sm={12} md={4} key={agency_id}>
                  <Grid container direction='column'>
                    <Grid container justify='center'>
                      <Grid item xs={6} style={{minHeight: '4rem', height: '4rem', marginBottom: '1.5rem', zIndex: '999999'}}>
                        <img
                          src={agency_logo_url}
                          style={{ width: "100%", textAlign: 'center' }}
                          alt="logo"
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper style={{height: '18rem', maxHeight: '18rem', overflow: 'auto', padding: '2rem'}}>
                        <Grid container direction='column'>
                          <Typography
                            gutterBottom
                            variant="h4"
                            component="h2"
                            style={{
                              color: "#475A96",
                              marginTop: '3rem'
                            }}
                          >
                            {agency_name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="span"
                            noWrap
                          >
                            {address_line1}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="span"
                          >
                            {state}
                          </Typography>
                          <Typography variant="caption" style={{selfAlign: 'flex-end', color: '#151515'}}>
                            234 active users
                          </Typography>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              )
            )}
        </Grid>
        <Grid item sm={6} md={3}>
          <Link
            to="agencies/new"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <Card style={{ marginTop: "30%", backgroundColor: "#3C3B6E" }}>
              <CardActionArea>
                <CardContent>
                  <Typography
                    variant="h5"
                    style={{
                      textAlign: "center",
                      margin: "7rem 2rem",
                      color: "white",
                    }}
                  >
                    + ADD AGENCY
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </Navbar>
  );
}

export default mobxify("snackStore")(Agencies);
