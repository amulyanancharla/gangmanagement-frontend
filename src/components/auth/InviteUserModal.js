import React, { useState } from "react";
import { Typography, Dialog, Paper, Button, Grid } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { Form, Field } from "react-final-form";

import { mobxify, Select } from "../general";
import { agencyApi } from "../../utils";

function InviteUserModal({ children, snackStore, authStore }) {
  const [open, setOpen] = useState(false);

  async function submit(values) {
    try {
      await agencyApi({
        path: `agency/${authStore.agencyInfo.agency_id}/users/bulk/invites`,
        body: values,
      });
      snackStore.show({
        message: "Successfully invited",
        severity: "success",
      });
      setOpen(false);
    } catch (error) {
      snackStore.show({ message: error.message, severity: "error" });
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} component={Button}>
        + INVITE USERS
      </Button>
      {children}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Form
          onSubmit={submit}
          mutators={{
            setEmails: (args, state, utils) => {
              utils.changeValue(state, "emails", () => args[0]);
            },
          }}
        >
          {({ form, handleSubmit, submitting, pristine, invalid }) => (
            <form onSubmit={handleSubmit}>
              <Paper style={{ padding: "1.5rem" }}>
                <Typography variant="h5">Invite User</Typography>
                <Grid container>
                  <Grid item xs={4}>
                    <Select
                      name="agency_user_role"
                      label="Role"
                      minWidth="10rem"
                      options={[
                        { name: "Admin", key: "Admin", value: "Admin" },
                        { name: "Officer", key: "Officer", value: "Officer" },
                        {
                          name: "Sargent",
                          key: "Sargent",
                          value: "Sargent",
                        },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Field name="emails">
                      {({ input, meta }) => (
                        <ChipInput
                          variant="outlined"
                          fullWidth
                          label="Emails"
                          style={{ marginBottom: "2rem" }}
                          onChange={form.mutators.setEmails}
                        />
                      )}
                    </Field>
                    <Select
                      name="invitation_validity_in_days"
                      label="Invitation Validity"
                      minWidth="10rem"
                      options={[
                        { name: "7 days", key: "7", value: 7 },
                        { name: "10 days", key: "10", value: 10 },
                        {
                          name: "1 month",
                          key: "1",
                          value: 30,
                        },
                      ]}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  style={{ marginTop: "3rem" }}
                >
                  <Grid item style={{ flexGrow: 1 }}></Grid>
                  <Grid item>
                    <Button
                      color="primary"
                      onClick={() => setOpen(false)}
                      style={{ marginRight: "1rem" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={(submitting, pristine, invalid)}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          )}
        </Form>
      </Dialog>
    </>
  );
}

export default mobxify("authStore", "snackStore")(InviteUserModal);
