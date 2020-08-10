import React from "react";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { mobxify } from "./index";

function Notify({ snackStore }) {
  return (
    <Snackbar
      open={snackStore.open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={() => snackStore.hide()} severity={snackStore.severity}>
        {snackStore.message}
      </Alert>
    </Snackbar>
  );
}

export default mobxify("snackStore")(Notify);
