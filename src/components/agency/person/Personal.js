import React, { useState, useEffect } from "react";

import {
  Typography,
  Grid,
  GridList,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select as MaterialSelect,
  InputLabel,
} from "@material-ui/core";
import { Form } from "react-final-form";
import { DropzoneDialog } from "material-ui-dropzone";
import { Redirect, useParams } from "react-router-dom";

import { DateInput, Input, Select, mobxify } from "../../general";
import { required } from "../../../utils/validations";
import { agencyApi, fileToBase64 } from "../../../utils";

function Personal({ authStore, snackStore }) {
  const [openUpload, setOpenUpload] = useState(false);
  const [pics, setPics] = useState([]);
  const [files, setFiles] = useState([]);
  const [picsDialog, setPicsDialog] = useState(false);
  const [personId, setPersonId] = useState(null);

  const { id } = useParams();
  const [editMode, setEditMode] = useState(id && true);
  const [fetching, setFetching] = useState(false);
  const [person, setPerson] = useState({});

  useEffect(() => {
    async function getPerson() {
      try {
        setFetching(true);
        const response = await agencyApi({
          path: `agencies/${authStore.agencyInfo.agency_id}/persons/${id}`,
          method: "GET",
        });
        const today = new Date();
        const year = today.getFullYear();
        const age_lower_limit = year - response.age_lower_limit;
        const age_upper_limit = year - response.age_upper_limit;
        response.age = `${age_lower_limit}-${age_upper_limit}`;
        response.weight = `${response.weight_lower_limit}-${response.weight_upper_limit}`;
        response.height = `${response.height_lower_limit}-${response.height_upper_limit}`;
        setPerson(response);
        const imgs = response.photos.map(({ photo_s3_url, photo_tag }) => ({
          data: photo_s3_url,
          tag: photo_tag,
        }));
        setFetching(false);
        setPics(imgs);
      } catch (error) {
        setFetching(false);
        snackStore.show({
          message: "Unable to fetch person details",
          severity: "error",
        });
      }
    }

    if (id) getPerson();
  }, [id]);

  async function submit(values) {
    const ages = values.age.split("-");
    const heights = values.height.split("-");
    const weights = values.weight.split("-");
    if (ages.length > 0) {
      const today = new Date();
      const year = today.getFullYear();
      values = {
        age_lower_limit: year - ages[1],
        age_upper_limit: year - ages[0],
        ...values,
      };
    }

    if (heights.length > 0) {
      values = {
        height_lower_limit: heights[0],
        height_upper_limit: heights[1],
        ...values,
      };
    }

    if (weights.length > 0) {
      values = {
        weight_lower_limit: weights[0],
        weight_upper_limit: weights[1],
        ...values,
      };
    }

    delete values["weight"];
    delete values["height"];
    delete values["age"];

    try {
      const response = await agencyApi({
        path: `agencies/${authStore.agencyInfo.agency_id}/persons`,
        body: { ...values, photos: pics },
      });
      setPersonId(response.person_id);
      snackStore.show({
        message: "Successfully added personal details",
        severity: "success",
      });
    } catch (error) {
      snackStore.show({ message: error.message, severity: "error" });
    }
  }

  async function setPicsState() {
    const ps = [];

    for (let i = 0; i < files.length; i++) {
      let p = await fileToBase64(files[i]);
      ps.push({ data: p, type: "none", is_primary: false });
    }

    setPics(ps);
  }

  return personId ? (
    <Redirect to={`/agency/persons/${personId}/edit`} />
  ) : (
    <Form onSubmit={submit} initialValues={person}>
      {({ form, handleSubmit, submitting, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          <Dialog md={6} open={picsDialog} onClose={() => setPicsDialog(false)}>
            <DialogTitle>{"Manage Photos"}</DialogTitle>
            <DialogContent style={{ maxHeight: 300, OverflowX: "auto" }}>
              <Grid container spacing={2}>
                {pics.map((pic, index) => (
                  <Grid item key={index}>
                    <Grid item direction="column" alignItems="center" container>
                      <Grid item>
                        <img src={pic.data} height="128" />
                      </Grid>
                      <Grid item>
                        <InputLabel>{"Type"}</InputLabel>
                        <MaterialSelect
                          value={pic.type}
                          onChange={(e) => {
                            const pi = pics.filter((p) => p.data !== pic.data);
                            setPics([
                              {
                                data: pic.data,
                                type: e.target.value,
                                is_primary: e.target.value === "primary",
                              },
                              ...pi,
                            ]);
                          }}
                        >
                          {[
                            { name: "Profile Pic", value: "primary" },
                            { name: "Mugshot", value: "mugshot" },
                            { name: "Tattoo", value: "tattoo" },
                          ].map(({ name, value }, i) => (
                            <MenuItem key={i} value={value}>
                              {name}
                            </MenuItem>
                          ))}
                        </MaterialSelect>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setFiles([]);
                  setPicsDialog(false);
                }}
                color="secondary"
              >
                Discard
              </Button>
              <Button
                onClick={() => {
                  setPicsDialog(false);
                  setOpenUpload(true);
                }}
              >
                Add more
              </Button>
              <Button
                onClick={() => {
                  setPicsDialog(false);
                }}
                color="primary"
                autoFocus
              >
                Proceed
              </Button>
            </DialogActions>
          </Dialog>
          <DropzoneDialog
            open={openUpload}
            fullWidth
            showAlerts={false}
            showFileNamesInPreview={false}
            submitButtonText="Done"
            onChange={async (f) => {
              if (f.length > 0) {
                setFiles([...files, ...f]);
              }
            }}
            onSave={() => {
              setPicsState();
              setOpenUpload(false);
              setPicsDialog(true);
            }}
            acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
            showPreviews={true}
            maxFileSize={5000000}
            onClose={() => setOpenUpload(false)}
          />
          <Grid container spacing={4}>
            <Grid item xs={12} md={9} container spacing={4}>
              <Grid item>
                <Paper style={{ padding: "1rem" }}>
                  <Grid item container spacing={2}>
                    <Grid item xs={6} sm={4} md={3}>
                      <Input
                        validate={required}
                        variant="outlined"
                        label="FIRST NAME"
                        name="firstname"
                        placeholder="NAME OF PERSON"
                        fullWidth
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Input
                        validate={required}
                        variant="outlined"
                        label="MIDDLE NAME"
                        name="middlename"
                        placeholder="NAME OF PERSON"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Input
                        validate={required}
                        variant="outlined"
                        label="LAST NAME"
                        name="lastname"
                        placeholder="NAME OF PERSON"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Input
                        validate={required}
                        variant="outlined"
                        label="SSN"
                        name="ssn"
                        placeholder="Social security number"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Input
                        validate={required}
                        variant="outlined"
                        label="Driver's license"
                        name="driver_license"
                        placeholder="Driver's license"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Input
                        validate={required}
                        variant="outlined"
                        label="State ID"
                        name="state"
                        placeholder="State  ID"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Input
                        validate={required}
                        variant="outlined"
                        label="A.K.A"
                        name="nickname"
                        placeholder="A.K.A"
                        fullWidth
                      />
                    </Grid>
                    {/* <Grid item xs={6} sm={4} md={3}>
                      <DateInput
                      validate={required}
                      variant="outlined"
                      label="DOB"
                      name="dob_date"
                      fullWidth
                    />
                    </Grid> */}
                    <Grid item xs={6} sm={4} md={3}>
                      <Input
                        validate={required}
                        variant="outlined"
                        label="AGE / AGE RANGE"
                        name="age"
                        helperText="Use '-' as a seperator"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Select
                        name="sex"
                        label="GENDER"
                        minWidth="10rem"
                        options={["Male", "Female", "Others"].map((state) => ({
                          name: state,
                          key: state,
                          value: state,
                        }))}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Select
                        name="race"
                        label="RACE"
                        minWidth="10rem"
                        options={["Human", "Alien", "Unknown"].map((state) => ({
                          name: state,
                          key: state,
                          value: state,
                        }))}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Select
                        name="ethnicity"
                        label="ETHNICITY"
                        minWidth="10rem"
                        options={["Indian", "British"].map((state) => ({
                          name: state,
                          key: state,
                          value: state,
                        }))}
                      />
                    </Grid>
                  </Grid>
                </Paper>
                <Paper style={{ padding: "1rem", marginTop: "1rem" }}>
                  <Typography variant="caption">
                    PHYSICAL DESCRIPTION
                  </Typography>
                  <Grid
                    item
                    container
                    spacing={2}
                    style={{ marginTop: "0.5rem" }}
                  >
                    <Grid item xs={6} sm={4} md={3}>
                      <Input
                        variant="outlined"
                        label="HEIGHT VALUE/RANGE"
                        name="height"
                        helperText="Use '-' as a seperator"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Input
                        variant="outlined"
                        label="WEIGHT VALUE/RANGE"
                        name="weight"
                        helperText="Use '-' as a seperator"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Select
                        name="eye_color"
                        label="EYE COLOR"
                        minWidth="10rem"
                        options={["Brown", "Black", "Blue"].map((state) => ({
                          name: state,
                          key: state,
                          value: state,
                        }))}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Select
                        label="HAIR COLOR"
                        name="hair_color"
                        minWidth="10rem"
                        options={[
                          "Brown",
                          "Black",
                          "White",
                          "Golden",
                          "Red",
                        ].map((state) => ({
                          name: state,
                          key: state,
                          value: state,
                        }))}
                      />
                    </Grid>
                    {/* <Grid item xs={6} sm={4} md={3}>
                    <Select
                      label="FACIAL HAIR"
                      name="facial_hair"
                      minWidth="10rem"
                      options={[
                        "Goatie",
                        "Moustache",
                        "Stubble",
                        "Frech Cut",
                        "Mutton Chops",
                      ].map((state) => ({
                        name: state,
                        key: state,
                        value: state,
                      }))}
                    />
                  </Grid> */}
                    <Grid item xs={6} sm={4} md={3}>
                      <Select
                        label="BUILD"
                        name="build"
                        minWidth="10rem"
                        options={["Athletic", "Slim", "Fat"].map((state) => ({
                          name: state,
                          key: state,
                          value: state,
                        }))}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Select
                        label="HAIR COLOR"
                        name="hair_color"
                        minWidth="10rem"
                        options={["Brown", "Black", "White"].map((state) => ({
                          name: state,
                          key: state,
                          value: state,
                        }))}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Select
                        label="FACIAL COLOR"
                        name="facial_color"
                        minWidth="10rem"
                        options={["Brown", "Black", "White"].map((state) => ({
                          name: state,
                          key: state,
                          value: state,
                        }))}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item sm={12} md={6}>
                      <Input
                        variant="outlined"
                        label="TATTOO DESCRIPTION"
                        name="tatoos"
                        fullWidth
                      />
                    </Grid>
                    <Grid item sm={12} md={6}>
                      <Input
                        variant="outlined"
                        label="MARKS & SCARS"
                        name="scars"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={12}>
                      <Input
                        multiline
                        variant="outlined"
                        label="NOTES"
                        name="notes"
                        fullWidth
                        rows={4}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing={2} xs={12} md={3} item direction="column">
              <Grid item>
                <Button onClick={() => setOpenUpload(true)}>Add images</Button>
              </Grid>

              {pics.length > 0 && (
                <GridList
                  style={{
                    padding: "1rem",
                    flexWrap: "nowrap",
                    transform: "translateZ(0)",
                  }}
                  cols={4}
                  cellHeight={64}
                >
                  {pics.map(({ data }, index) => (
                    <img key={index} src={data} />
                  ))}
                </GridList>
              )}

              {pics.length > 0 && (
                <Grid item>
                  <Button
                    onClick={() => setPicsDialog(true)}
                    fullWidth
                    color="primary"
                  >
                    Manage Photos
                  </Button>
                </Grid>
              )}

              <Grid item>
                <Paper style={{ padding: "1rem" }}>
                  <Typography variant="caption">
                    SOCIAL MEDIA PRESENCE
                  </Typography>
                  <Grid container direction="column">
                    <Typography variant="body1">/username</Typography>
                    <Typography variant="body1">/username</Typography>
                    <Typography variant="body1">/username</Typography>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item style={{ flexGrow: 1 }}></Grid>
            <Grid item>
              <Button variant="contained" style={{ marginRight: "1rem" }}>
                CANCEL
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                disabled={submitting}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
}

export default mobxify("authStore", "snackStore")(Personal);
