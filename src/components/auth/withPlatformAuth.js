import React from "react";

import PlatformSignInForm from "./PlatformSignInForm";

import mobxify from "../general/mobxify";

export default (WrappedComponent) =>
  mobxify("authStore")((props) =>
    props.authStore.isPlatformLoggedIn ? (
      <WrappedComponent {...props} />
    ) : (
      <PlatformSignInForm {...props} />
    )
  );
