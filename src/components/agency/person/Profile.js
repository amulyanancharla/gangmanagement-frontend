import React from "react";
import Navbar from "../../general/Navbar";
import { Typography, Grid, Paper, Chip, Box } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import { Link } from "react-router-dom";

import MapRoundIcon from "../../../styles/media/map_round.png";
import logoImage from "../../../styles/media/user_prof.png";
import VideocamIcon from "@material-ui/icons/Videocam";

function Profile() {
  return (
    <Navbar>
      <Grid container style={{ marginTop: "50px" }} justify="space-between">
        <Grid item>
          <Grid container alignItems="center" style={{ color: "#3C3B6E" }}>
            <ArrowBackIcon />
            <Typography variant="body1">
              <Link to="/agency/persons">Back to Persons</Link>
            </Typography>
          </Grid>
        </Grid>
        <Grid item style={{ background: "#fff" }}>
          <Grid container alignItems="center">
            <Typography variant="h6">
              Next (DR. RABBIT HECTAR HANNIBAL)
            </Typography>
            <ArrowForwardIcon />
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h3">Jamie "Wrong" Fauchs</Typography>
      <Grid container style={{ marginTop: "1rem" }} spacing={2}>
        <Grid item xs={12} md={3}>
          <Typography variant="h3">Image carousel</Typography>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Paper style={{ padding: "1rem" }}>
                <Typography variant="caption">SOCIAL MEDIA PRESENCE</Typography>
                <Grid
                  container
                  direction="column"
                  style={{ color: "#475A96", marginTop: "0.5rem" }}
                  spacing={2}
                >
                  <Grid item container spacing={2} alignItems="center">
                    <FacebookIcon />
                    <Typography variant="caption">/username</Typography>
                  </Grid>
                  <Grid item container spacing={2} alignItems="center">
                    <InstagramIcon />
                    <Typography variant="caption">/username</Typography>
                  </Grid>
                  <Grid item container spacing={2} alignItems="center">
                    <FacebookIcon />
                    <Typography variant="caption">/username</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item>
              <Paper style={{ padding: "1rem" }}>
                <Typography variant="caption">ATTACHMENTS</Typography>
                <Grid
                  container
                  direction="column"
                  style={{ marginTop: "0.5rem" }}
                  spacing={2}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <VideocamIcon />
                    </Grid>
                    <Grid item>
                      <Grid container direction="column">
                        <Typography variant="body1">Video Clip</Typography>
                        <Typography variant="caption">
                          Uploaded 07.05.2015
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <VideocamIcon />
                    </Grid>
                    <Grid item>
                      <Grid container direction="column">
                        <Typography variant="body1">Video Clip</Typography>
                        <Typography variant="caption">
                          Uploaded 07.05.2015
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <VideocamIcon />
                    </Grid>
                    <Grid item>
                      <Grid container direction="column">
                        <Typography variant="body1">Video Clip</Typography>
                        <Typography variant="caption">
                          Uploaded 07.05.2015
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={9} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper style={{ padding: "1rem" }}>
                <Grid item>
                  <Typography variant="caption">
                    PHYSICAL APPEARANCES
                  </Typography>
                </Grid>
                <Grid item container spacing={4}>
                  <Grid item>
                    <Typography variant="caption">Age</Typography>
                    <Typography variant="h6">45</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">Gender</Typography>
                    <Typography variant="h6">Male</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">Agency PID</Typography>
                    <Typography variant="h6">ASD432432D</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">Race & Ethinicity</Typography>
                    <Typography variant="h6">Asian/Filipino</Typography>
                  </Grid>
                </Grid>
                <Grid item container spacing={4}>
                  <Grid item>
                    <Typography variant="caption">Height</Typography>
                    <Typography variant="h6">5'11"</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">Weight Range</Typography>
                    <Typography variant="h6">160 - 175 lbs</Typography>
                  </Grid>
                </Grid>
                <Grid item container spacing={4}>
                  <Grid item>
                    <Typography variant="caption">Build</Typography>
                    <Typography variant="h6">Average</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">Hair Color</Typography>
                    <Typography variant="h6">Shaven</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">Facial Hair</Typography>
                    <Typography variant="h6">Shaven</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">Eye Color</Typography>
                    <Typography variant="h6">Brown</Typography>
                  </Grid>
                </Grid>
                <Grid item container spacing={4}>
                  <Grid item>
                    <Typography variant="caption">Tattoos</Typography>
                    <Typography variant="h6">Ankles, Chest</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">Scars</Typography>
                    <Typography variant="h6">N.A</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper style={{ padding: "1rem" }}>
                <Grid item>
                  <Typography variant="caption">KNOWN ADDRESS</Typography>
                </Grid>
                <Grid
                  item
                  container
                  alignItems="center"
                  style={{ color: "#475A96" }}
                >
                  <Grid item xs={10}>
                    <Typography variant="caption">Home address</Typography>
                    <Typography variant="h5">
                      1626 James St, Los Angeles, CA 9010
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <img src={MapRoundIcon} alt="map" />
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  alignItems="center"
                  style={{ color: "#475A96" }}
                >
                  <Grid item xs={10}>
                    <Typography variant="caption">Home address</Typography>
                    <Typography variant="h5">
                      1626 James St, Los Angeles, CA 9010
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <img src={MapRoundIcon} alt="map" />
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  alignItems="center"
                  style={{ color: "#475A96" }}
                >
                  <Grid item xs={10}>
                    <Typography variant="caption">Home address</Typography>
                    <Typography variant="h5">
                      1626 James St, Los Angeles, CA 9010
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <img src={MapRoundIcon} alt="map" />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper style={{ padding: "1rem" }}>
                <Typography variant="caption">KNOWN ASSOCIATES</Typography>
                <Grid container spacing={4} style={{ marginTop: "0.5rem" }}>
                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      style={{ textAlign: "center" }}
                    >
                      <img src={logoImage} alt="user logo" />
                      <Chip
                        label="Jypsy Jokers"
                        color="primary"
                        style={{
                          marginTop: "-1rem",
                          backgroundColor: "#66A6FF",
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      style={{ textAlign: "center" }}
                    >
                      <img src={logoImage} alt="user logo" />
                      <Chip
                        label="Jypsy Jokers"
                        color="primary"
                        style={{
                          marginTop: "-1rem",
                          backgroundColor: "#66A6FF",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={5}>
              <Paper style={{ padding: "1rem" }}>
                <Typography variant="caption">VEHICLES ASSOCIATED</Typography>
                <Grid container spacing={1}>
                  <Grid item>
                    <Box
                      style={{
                        backgroundColor: "#EEF1FA",
                        border: "2px solid #F68E5F",
                        padding: "1rem",
                        borderRadius: "1rem",
                      }}
                    >
                      <Grid
                        container
                        spacing={2}
                        direction="column"
                        style={{ textAlign: "center" }}
                      >
                        <Typography variant="caption">Florida</Typography>
                        <Typography variant="h5">CGG - 3267</Typography>
                        <Typography variant="body2">JKLSD368923JH</Typography>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      style={{
                        backgroundColor: "#EEF1FA",
                        border: "2px solid #F68E5F",
                        padding: "1rem",
                        borderRadius: "1rem",
                      }}
                    >
                      <Grid
                        container
                        spacing={2}
                        direction="column"
                        style={{ textAlign: "center" }}
                      >
                        <Typography variant="caption">Florida</Typography>
                        <Typography variant="h5">CGG - 3267</Typography>
                        <Typography variant="body2">JKLSD368923JH</Typography>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={7}>
              <Paper style={{ padding: "1rem" }}>
                <Typography variant="caption">ATTACHMENTS</Typography>
                <Grid
                  container
                  direction="column"
                  style={{ marginTop: "0.5rem" }}
                  spacing={2}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>05:06</Grid>
                    <Grid item>
                      <Grid container direction="column">
                        <Typography variant="body1">
                          Bethany (Girlfriend)
                        </Typography>
                        <Typography variant="caption">
                          nidoasd oasidonas siodasn hj dsahd asjhd idsad dsa
                          kdnsn sm ad
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>05:06</Grid>
                    <Grid item>
                      <Grid container direction="column">
                        <Typography variant="body1">
                          Bethany (Girlfriend)
                        </Typography>
                        <Typography variant="caption">
                          nidoasd oasidonas siodasn hj dsahd asjhd idsad dsa
                          kdnsn sm ad
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Navbar>
  );
}

export default Profile;
