import React, { useState, useEffect } from "react";
import SettingsVoiceIcon from "@material-ui/icons/SettingsVoice";
import { useParams } from "react-router-dom";

import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Form } from "react-final-form";

import { Input, Select, mobxify, DateInput } from "../../general";
import { agencyApi } from "../../../utils";

function Narratives({ authStore, snackStore }) {
  const [fetchingUsers, setFetchingUsers] = useState(false);
  const [fetchingNarratives, setFetchingNarratives] = useState(false);
  const [users, setUsers] = useState([]);
  const [narratives, setNarratives] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const { id } = useParams();

  async function submit(values) {
    try {
      setIsSuccess(false);
      await agencyApi({
        path: `agencies/${authStore.agencyInfo.agency_id}/persons/${id}/narratives`,
        body: values,
      });
      snackStore.show({
        message: "Successfully added narrative",
        severity: "success",
      });
      setIsSuccess(true);
      getNarratives();
    } catch (error) {
      snackStore.show({
        message: "Unable to add narrative",
        severity: "error",
      });
    }
  }

  async function getNarratives() {
    try {
      setFetchingNarratives(true);
      const response = await agencyApi({
        path: `agencies/${authStore.agencyInfo.agency_id}/persons/${id}/narratives`,
        method: "GET",
      });
      setNarratives(response);
      setFetchingNarratives(false);
    } catch (error) {
      setFetchingNarratives(false);
      snackStore.show({
        message: "Unable to fetch narratives",
        severity: "error",
      });
    }
  }

  async function getUsers() {
    try {
      setFetchingUsers(true);
      const response = await agencyApi({
        path: `agencies/${authStore.agencyInfo.agency_id}/users`,
        method: "GET",
      });
      setUsers(response);
      setFetchingUsers(false);
    } catch (error) {
      setFetchingUsers(false);
      snackStore.show({
        message: "Unable to fetch users",
        severity: "error",
      });
    }
  }

  useEffect(() => {
    getUsers();
    getNarratives();
  }, [id, snackStore, authStore]);

  if (fetchingNarratives) {
    return (
      <Grid container alignContent="center" justify="center">
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Form onSubmit={submit}>
      {({ form, handleSubmit, submitting, pristine, invalid }) => (
        <form
          onSubmit={async (e) => {
            handleSubmit(e);
            if (isSuccess) form.reset();
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Paper style={{ padding: "1rem" }}>
                <Grid item>
                  <Typography variant="caption">EARLIER NARRATIONS</Typography>
                </Grid>
                <Grid container spacing={2}>
                  {narratives.map(
                    ({ narrative_id, created_by, notes, source_type }) => (
                      <Grid
                        item
                        xs={6}
                        key={narrative_id}
                        container
                        spacing={2}
                      >
                        <Grid item xs={2}>
                          <Typography variant="caption">OCT</Typography>
                          <Typography variant="h5">30</Typography>
                          <Typography variant="caption">2019</Typography>
                        </Grid>
                        <Grid item xs={10}>
                          <Typography variant="body1">{source_type}</Typography>
                          <Typography variant="caption">
                            <strong>By Officer</strong> {created_by.firstname}
                          </Typography>
                          <Box
                            p={1}
                            mt={1}
                            style={{
                              background: "rgba(196, 196, 196, 0.1)",
                              border: "1px solid #D9D9D9",
                              borderRadius: "3px",
                            }}
                          >
                            <Typography variant="body2">{notes}</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    )
                  )}
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper style={{ padding: "1rem" }}>
                <Grid item>
                  <Typography variant="caption">
                    ADD NARRATIVE INFORMATION
                  </Typography>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Input
                      variant="outlined"
                      label="SOURCE TYPE"
                      name="source_type"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      variant="outlined"
                      label="SOURCE NAME"
                      name="source_name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} container spacing={2}>
                    <Grid item xs={6}>
                      <Select
                        name="created_by"
                        label="OFFICER NAME"
                        minWidth="100%"
                        options={users.map(({ firstname }) => ({
                          name: firstname,
                          key: firstname,
                          value: firstname,
                        }))}
                      />
                    </Grid>
                    {/* <Grid item xs={6}>
                      <DateInput
                        variant="outlined"
                        label="DATE"
                        name="date"
                        fullWidth
                      />
                    </Grid> */}
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      variant="outlined"
                      label="NARRATION"
                      name="notes"
                      fullWidth
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item container spacing={2}>
                    <Grid item>
                      <SettingsVoiceIcon style={{ color: "blue" }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="caption">
                        Click here to voice record narration
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container justify="center">
                    <Button type="submit">SAVE NARRATION</Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
}

export default mobxify("authStore", "snackStore")(Narratives);
