import React from "react";

import AgencySignInForm from "./AgencySignInForm";

import mobxify from "../general/mobxify";

export default (WrappedComponent) =>
  mobxify("authStore")((props) =>
    props.authStore.isAgentLoggedIn ? (
      <WrappedComponent {...props} />
    ) : (
      <AgencySignInForm {...props} />
    )
  );
