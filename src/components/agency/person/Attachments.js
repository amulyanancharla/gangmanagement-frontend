import React, { useState, useEffect } from "react";
import { Videocam, Attachment, Delete } from "@material-ui/icons";
import {
  Typography,
  Grid,
  Paper,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { Form, Field } from "react-final-form";

import { Input, Select, DateInput, DropZone, mobxify } from "../../general";
import { agencyApi, fileToBase64 } from "../../../utils";

function Attachments({ authStore, snackStore }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const { id } = useParams();

  async function getAttachments() {
    try {
      setFetching(true);
      const response = await agencyApi({
        path: `agencies/${authStore.agencyInfo.agency_id}/persons/${id}/attachments`,
        method: "GET",
      });
      setAttachments(response);
      setFetching(false);
    } catch (error) {
      setFetching(false);
      snackStore.show({
        message: "Unable to fetch attachments",
        severity: "error",
      });
    }
  }

  useEffect(() => {
    getAttachments();
  }, [id]);

  async function submit(values) {
    try {
      setIsSuccess(false);
      await agencyApi({
        path: `agencies/${authStore.agencyInfo.agency_id}/persons/${id}/attachments`,
        body: { ...values, data: file, attachment_name: fileName },
      });
      snackStore.show({
        message: "Successfully added attachment",
        severity: "success",
      });
      setIsSuccess(true);
      getAttachments();
    } catch (error) {
      snackStore.show({
        message: "Unable to add attachment",
        severity: "error",
      });
    }
  }

  if (fetching) {
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
            await handleSubmit(e);
            if (isSuccess) {
              form.reset();
              setFile(null);
              setFileName("");
            }
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Paper style={{ padding: "1rem" }}>
                <Grid item>
                  <Typography variant="caption">ATTACHMENTS</Typography>
                </Grid>
                <Grid container spacing={2}>
                  {attachments.map(
                    ({
                      attachment_id,
                      attachment_url,
                      attachment_name,
                      description,
                    }) => (
                      <Grid
                        key={attachment_id}
                        item
                        xs={6}
                        container
                        spacing={2}
                      >
                        <Grid item xs={1}>
                          <Attachment />
                        </Grid>
                        <Grid item xs={11}>
                          <Typography variant="body1">
                            {attachment_name}
                          </Typography>
                          <Typography variant="caption">
                            {/* <strong>Date</strong> 05.06.2019 */}
                          </Typography>
                          <Grid item style={{ marginTop: "0.5rem" }}>
                            <Input
                              variant="outlined"
                              name="hiddenfield"
                              label="Description"
                              multiline
                              rows={4}
                              disabled
                              fullWidth
                              value={description}
                            />
                          </Grid>
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
                    ADD NEW ATTCHMENT(S)
                  </Typography>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} container spacing={2}>
                    <Grid item xs={6}>
                      <Select
                        name="attachment_type"
                        label="TYPE"
                        minWidth="100%"
                        options={["VIDEO", "AUDIO", "DOCUMENT"].map(
                          (state) => ({
                            name: state,
                            key: state,
                            value: state,
                          })
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <DateInput
                        variant="outlined"
                        label="DATE"
                        name="date"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      variant="outlined"
                      label="DESCRIPTION"
                      name="description"
                      fullWidth
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {file === null && (
                      <Field name="files">
                        {(props) => (
                          <DropZone
                            onChange={async (files) => {
                              const data = await fileToBase64(files[0]);
                              setFile(data);
                              setFileName(files[0].name);
                            }}
                          />
                        )}
                      </Field>
                    )}
                    {file && (
                      <Grid container justify="space-between">
                        <Grid item xs={3}>
                          <Attachment fontSize="large" />
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="body1">{fileName}</Typography>
                        </Grid>
                        <Grid
                          item
                          xs={1}
                          style={{ cursor: "pointer" }}
                          onClick={() => setFile(null)}
                        >
                          <Delete />
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item container justify="center">
                    <Button type="submit">SAVE ATTACHMENT</Button>
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

export default mobxify("authStore", "snackStore")(Attachments);
