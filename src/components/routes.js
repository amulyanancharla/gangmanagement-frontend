import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import RegistrationForm from "./auth/RegistrationForm";
import withPlatformAuth from "./auth/withPlatformAuth";
import withAgencyAuth from "./auth/withAgencyAuth";
import PlatformSignInForm from "./auth/PlatformSignInForm";
import AgencySignInForm from "./auth/AgencySignInForm";
import Roles from "./dashboard/Roles";
import Agencies from "./dashboard/Agencies";
import AddAgency from "./dashboard/AddAgency";
import AgencyForgotPassword from "./auth/AgencyForgotPassword";
import AgencyResetPassword from "./auth/AgencyResetPassword";
import AgencyDashboard from "./dashboard/AgencyDashboard";
import AgencyUsers from "./dashboard/AgencyUsers";
import PlatformData from "./dashboard/PlatformData";
import AgencyData from "./dashboard/AgencyData";
import AgencyRoles from "./dashboard/AgencyRoles";
import AgencySettings from "./dashboard/AgencySettings";
import PersonForm from "./agency/person/Form";
import Profile from "./agency/person/Profile";
import Persons from "./agency/person/Persons";
import CalendarOverlay from "./calendar/CalendarOverlay";

const platformRoutes = [
  { path: "", component: PlatformSignInForm, authProtected: false },
  { path: "signin", component: PlatformSignInForm, authProtected: false },
  { path: "agencies", component: Agencies, authProtected: false },
  { path: "agencies/new", component: AddAgency },
  { path: "data", component: PlatformData },
];

const agencyRoutes = [
  { path: "signup", component: RegistrationForm, authProtected: false },
  { path: "signin", component: AgencySignInForm, authProtected: false },
  {
    path: "forgot_password",
    component: AgencyForgotPassword,
    authProtected: false,
  },
  { path: "roles", component: Roles },
  {
    path: "reset_password",
    component: AgencyResetPassword,
    authProtected: false,
  },
  { path: "roles", component: Roles },
  { path: "dashboard", component: AgencyDashboard },
  { path: "users", component: AgencyUsers },
  { path: "roles", component: AgencyRoles },
  { path: "settings", component: AgencySettings },
  { path: "persons/new", component: PersonForm, authProtected: false },
  { path: "persons/:id", component: Profile },
  { path: "persons/:id/edit", component: PersonForm },
  { path: "data", component: AgencyData },
  { path: "persons", component: Persons },
  { path: "calendaroverlay", component: CalendarOverlay },
];

export default (
  <BrowserRouter>
    <Switch>
      {platformRoutes.map(
        ({ path, authProtected = false, component: Component }) => {
          return (
            <Route
              key={path}
              exact
              path={`/platform/${path}`}
              component={
                authProtected
                  ? withPlatformAuth((props) => <Component {...props} />)
                  : (props) => <Component {...props} />
              }
            />
          );
        }
      )}
      {agencyRoutes.map(
        ({ path, authProtected = false, component: Component }) => (
          <Route
            key={path}
            exact
            path={`/agency/${path}`}
            component={
              authProtected
                ? withAgencyAuth((props) => <Component {...props} />)
                : (props) => <Component {...props} />
            }
          />
        )
      )}
    </Switch>
  </BrowserRouter>
);
