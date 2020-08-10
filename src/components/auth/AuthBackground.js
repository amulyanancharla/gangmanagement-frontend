import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";

import { Logo } from "../general";

const useStyles = makeStyles(({ palette }) => ({
  top: {
    height: "15rem",
    backgroundColor: palette.primary.main,
  },
  middle: {
    height: "5rem",
    backgroundColor: palette.secondary.main,
  },
  bottom: {
    minHeight: "27rem",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.background.default,
  },
  children: {
    marginTop: "-2rem",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    margin: "1rem 0rem 8rem",
    color: "#3C3B6E",
    "font-size": "11px",
  },
}));

function AuthBackground({ logo, children }) {
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Grid
        className={classes.top}
        container
        spacing={2}
        justify="center"
        alignContent="center"
      >
        <Logo />
      </Grid>
      <Grid item className={classes.middle}></Grid>
      <Grid item className={classes.bottom} container>
        <Grid container className={classes.children}>
          {children}
        </Grid>
        <Grid
          item
          container
          direction="column"
          alignContent="center"
          style={{ marginTop: "1rem" }}
        >
          <Grid item>
            {logo && <img src={logo} width={128} height={128} alt="logo" />}
          </Grid>
          <Grid item>
            <Typography
              variant="subtitle1"
              className={classes.footer}
              color="primary"
            >
              POWERED BY GANGS TRACK INC
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AuthBackground;
