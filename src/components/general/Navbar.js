import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CssBaseline,
  Hidden,
  makeStyles,
} from "@material-ui/core";

import {
  ExitToApp,
  Dashboard,
  Group,
  Shuffle,
  FileCopy,
  Settings,
  Menu,
  Close,
  People,
  NotificationsNoneOutlined,
} from "@material-ui/icons";

import { NavLink, useLocation } from "react-router-dom";

import { useCurrentApp } from "../../hooks";
import { Logo } from "../general";
import logoImage from "../../styles/media/logo.svg";
import mobxify from "./mobxify";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    borderBottom: "10px solid #B22234",
  },
  title: {
    fontSize: "1rem",
  },
  drawer: {
    width: 200,
  },
  sideLogo: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  sideLogoText: {
    fontSize: "11px",
    color: "#4C4C4C",
  },
  navIcon: {
    color: "#fff",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  active: {
    color: theme.palette.primary.main,
  },
}));

function Navbar({ children, authStore }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState("");

  const location = useLocation();

  useEffect(() => {
    const paths = location.pathname.split("/");
    if (paths.length >= 3) setKey(paths[2]);
  }, [location]);

  const app = useCurrentApp();

  const drawer = (
    <div>
      <Toolbar />
      <IconButton onClick={() => setOpen(!open)} style={{ float: "right" }}>
        <Close />
      </IconButton>
      {app === "agency" && (
        <Grid
          container
          direction="column"
          alignItems="center"
          alignContent="center"
        >
          <img
            className={classes.sideLogo}
            src={logoImage}
            alt="santa monica logo"
          />
          <Typography className={classes.sideLogoText}>
            SANTA MONICA, CA
          </Typography>
          <Typography className={classes.sideLogoText}>
            POLICE DEPARTMENT
          </Typography>
        </Grid>
      )}
      <Divider />
      <List>
        {app === "agency" && (
          <ListItem
            button
            key="dashboard"
            component={NavLink}
            activeClassName={classes.active}
            to="/agency/dashboard"
          >
            <ListItemIcon className={key === "dashboard" ? classes.active : ""}>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        )}
        {app === "platform" && (
          <ListItem
            button
            key="agencies"
            component={NavLink}
            activeClassName={classes.active}
            to="/platform/agencies"
          >
            <ListItemIcon className={key === "agencies" ? classes.active : ""}>
              <Group />
            </ListItemIcon>
            <ListItemText
              primary="Agencies"
              className={key === "agencies" ? classes.active : ""}
            />
          </ListItem>
        )}
        {app === "agency" && (
          <>
            <ListItem
              button
              key="roles"
              component={NavLink}
              activeClassName={classes.active}
              to="/agency/roles"
            >
              <ListItemIcon className={key === "roles" ? classes.active : ""}>
                <Shuffle />
              </ListItemIcon>
              <ListItemText
                primary="Roles"
                className={key === "roles" ? classes.active : ""}
              />
            </ListItem>
            <ListItem
              button
              key="persons"
              component={NavLink}
              activeClassName={classes.active}
              to="/agency/persons"
            >
              <ListItemIcon className={key === "roles" ? classes.active : ""}>
                <People />
              </ListItemIcon>
              <ListItemText
                primary="Persons"
                className={key === "roles" ? classes.active : ""}
              />
            </ListItem>
          </>
        )}
        <ListItem
          button
          key="data"
          component={NavLink}
          activeClassName={classes.active}
          to={`/${app}/data`}
        >
          <ListItemIcon className={key === "data" ? classes.active : ""}>
            <FileCopy />
          </ListItemIcon>
          <ListItemText primary="Data" />
        </ListItem>
        {app === "agency" && (
          <ListItem
            button
            key="settings"
            component={NavLink}
            activeClassName={classes.active}
            to="/agency/settings"
          >
            <ListItemIcon className={key === "data" ? classes.active : ""}>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <div className={classes.main}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
        <Toolbar>
          <Hidden mdUp implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setOpen(!open)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          </Hidden>
          <IconButton>
            <Logo />
          </IconButton>
          <Grid container direction="column" justify="center">
            <Typography className={classes.title} variant="h6">
              GANG
            </Typography>
            <Typography className={classes.title} variant="h6">
              TRACKER
            </Typography>
          </Grid>
          <IconButton className={classes.navIcon} size="medium">
            <NotificationsNoneOutlined />
          </IconButton>
          <IconButton
            onClick={() =>
              app === "platform"
                ? authStore.platformLogout()
                : authStore.agentLogout()
            }
            className={classes.navIcon}
            size="medium"
          >
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Hidden smDown implementation="css">
        <Drawer className={classes.drawer} variant="permanent">
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden mdUp implementation="css">
        <Drawer className={classes.drawer} variant="temporary" open={open}>
          {drawer}
        </Drawer>
      </Hidden>
      <div className={classes.content}>
        <Toolbar />
        {children}
      </div>
    </div>
  );
}

export default mobxify("authStore")(Navbar);
