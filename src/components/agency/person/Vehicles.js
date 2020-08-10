import React, { useState, useEffect } from "react";

import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  GridList,
  TextField,
  Popover,
  CircularProgress,
} from "@material-ui/core";
import { Form } from "react-final-form";
import { useParams } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { DropzoneDialog } from "material-ui-dropzone";

import { Input, Select, mobxify } from "../../general";
import { agencyApi, states, fileToBase64 } from "../../../utils";
import api from "../../../utils/api";

const colors = [
  "Aluminum",
  "Beige",
  "Black",
  "Blue",
  "Brown",
  "Bronze",
  "Claret",
  "Copper",
  "Cream",
  "Gold",
  "Gray",
  "Green",
  "Maroon",
  "Metallic",
  "Navy",
  "Orange",
  "Pink",
  "Purple",
  "Red",
  "Rose",
  "Rust",
  "Silver",
  "Tan",
  "Turquoise",
  "White",
  "Yellow",
];

function Vehicles({ snackStore, authStore }) {
  const { id } = useParams();
  const [vehicles, setVehicles] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [pics, setPics] = useState([]);
  const [files, setFiles] = useState([]);
  const [make, setMake] = useState("");
  const [makes, setMakes] = useState([]);
  const [model, setModel] = useState("");
  const [models, setModels] = useState([]);
  const [fetchingMakes, setFetchingMakes] = useState(false);
  const [fetchingModels, setFetchingModels] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPopOver, setCurrentPopOver] = useState("");

  function handleClick(event, vehicle_id) {
    setAnchorEl(event.currentTarget);
    setCurrentPopOver(vehicle_id);
  }

  function handleClose() {
    setAnchorEl(null);
    setCurrentPopOver("");
  }
  const popID = "simple-popover";

  async function getVehicles() {
    try {
      setFetching(true);
      const vehiclesResponse = await agencyApi({
        path: `agencies/${authStore.agencyInfo.agency_id}/persons/${id}/vehicles`,
        method: "GET",
      });
      setVehicles(vehiclesResponse);
      setFetching(false);
    } catch (error) {
      setFetching(false);
      snackStore.show({
        message: "Unable to fetch vechicle details",
        severity: "error",
      });
    }
  }

  useEffect(() => {
    async function getMakes() {
      try {
        setFetchingMakes(true);
        const response = await api({
          path:
            "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json",
          method: "GET",
          thirdPartyApi: true,
          contentType: null,
        });
        setMakes(response.Results);
        setFetchingMakes(false);
      } catch (error) {
        setFetchingMakes(false);
        snackStore.show({
          message: "Unable to fetch vechicle makes",
          severity: "error",
        });
      }
    }

    getVehicles();
    getMakes();
  }, [id, authStore.agencyInfo.agency_id, snackStore]);

  async function getModels(makeId) {
    try {
      setFetchingModels(true);
      const response = await api({
        path: `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/${makeId}?format=json`,
        method: "GET",
        thirdPartyApi: true,
        contentType: null,
      });
      setModels(response.Results);
      setFetchingModels(false);
    } catch (error) {
      setFetchingModels(false);
      snackStore.show({
        message: "Unable to fetch vechicle makes",
        severity: "error",
      });
    }
  }

  async function setPicsState() {
    const ps = [];

    for (let i = 0; i < files.length; i++) {
      let p = await fileToBase64(files[i]);
      ps.push({ data: p });
    }

    setPics(ps);
  }

  async function submit(values) {
    try {
      const { vehicle_id } = await agencyApi({
        path: `agencies/${authStore.agencyInfo.agency_id}/vehicles`,
        body: { ...values, make, model, photos: pics },
      });

      await agencyApi({
        path: `agencies/${authStore.agencyInfo.agency_id}/persons/${id}/vehicles`,
        body: { vehicles: [vehicle_id] },
      });

      snackStore.show({
        message: "Successfully added vehicle",
        severity: "success",
      });
      getVehicles();
    } catch (error) {
      snackStore.show({ message: error.message, severity: "error" });
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
        <form onSubmit={handleSubmit}>
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
            }}
            acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
            showPreviews={true}
            maxFileSize={5000000}
            onClose={() => setOpenUpload(false)}
          />
          <Grid container>
            <Grid container>
              <Paper style={{ padding: "1rem" }}>
                <Grid item xs={12}>
                  <Typography variant="caption">VEHICLES ASSOCIATED</Typography>
                </Grid>
                <Grid item container spacing={2}>
                  {vehicles.map((vehicle) => (
                    <Grid item key={vehicle.vehicle_id}>
                      <Box
                        style={{
                          backgroundColor: "#EEF1FA",
                          border: "2px solid #F68E5F",
                          padding: "1rem",
                          borderRadius: "1rem",
                        }}
                      >
                        <Grid
                          container
                          spacing={2}
                          direction="column"
                          style={{ textAlign: "center" }}
                          onClick={(e) => handleClick(e, vehicle.vehicle_id)}
                        >
                          <Typography variant="caption">
                            {vehicle.state}
                          </Typography>
                          <Typography variant="h5">{vehicle.plate}</Typography>
                          <Typography variant="body2">
                            {vehicle.vin_number}
                          </Typography>
                        </Grid>
                      </Box>
                      <Popover
                        id={popID}
                        open={currentPopOver === vehicle.vehicle_id}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <Paper style={{ padding: "1rem", width: 600 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={8}>
                              <Typography variant="h4">
                                {vehicle.year}
                              </Typography>
                              <Typography variant="h4">
                                {vehicle.make + " " + vehicle.model}
                              </Typography>
                              <Typography variant="h4">
                                {vehicle.primary_color}
                              </Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Box
                                style={{
                                  backgroundColor: "#EEF1FA",
                                  border: "2px solid #F68E5F",
                                  padding: "1rem",
                                  borderRadius: "1rem",
                                }}
                              >
                                <Grid
                                  container
                                  spacing={2}
                                  direction="column"
                                  style={{ textAlign: "center" }}
                                >
                                  <Typography variant="caption">
                                    {vehicle.state}
                                  </Typography>
                                  <Typography variant="h5">
                                    {vehicle.plate}
                                  </Typography>
                                  <Typography variant="body2">
                                    {vehicle.vin_number}
                                  </Typography>
                                </Grid>
                              </Box>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid container spacing={2} justify="center">
                                {vehicle.photos.map((photo) => (
                                  <img
                                    src={photo.photo_s3_url}
                                    alt={vehicle.make}
                                    style={{
                                      maxHeight: "128px",
                                      maxWidth: "128px",
                                    }}
                                  />
                                ))}
                              </Grid>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography
                                variant="h6"
                                style={{ color: "#5E5E5E" }}
                              >
                                DESCRIPTION
                              </Typography>
                              <Typography variant="body1">
                                {vehicle.description}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Popover>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper style={{ padding: "1rem", marginTop: "1rem" }}>
                <Grid item>
                  <Typography variant="caption">ADD VEHICLE</Typography>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={3} container spacing={4} direction="column">
                    <Grid item>
                      <Box
                        style={{
                          backgroundColor: "#EEF1FA",
                          padding: "1rem",
                          borderRadius: "1rem",
                        }}
                      >
                        <Grid
                          container
                          spacing={2}
                          direction="column"
                          style={{ textAlign: "center" }}
                        >
                          <Typography variant="caption">STATE NAME</Typography>
                          <Typography variant="h5">PLATE NUMBER</Typography>
                          <Typography variant="body2">VIN#</Typography>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={() => setOpenUpload(true)}
                        size="large"
                        style={{ borRadius: "50%" }}
                      >
                        UPLOAD PHOTOS
                      </Button>
                      {pics.length > 0 && (
                        <GridList
                          style={{
                            padding: "1rem",
                            flexWrap: "nowrap",
                            transform: "translateZ(0)",
                          }}
                          cols={2}
                          cellHeight={64}
                        >
                          {pics.map(({ data }, index) => (
                            <img key={index} src={data} />
                          ))}
                        </GridList>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={9} container spacing={1}>
                    <Grid item md={4} xs={6}>
                      <Select
                        name="body_type"
                        label="BODY"
                        minWidth="100%"
                        options={["SUV", "Sedan", "Hatchback"].map((state) => ({
                          name: state,
                          key: state,
                          value: state,
                        }))}
                      />
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Autocomplete
                        name="make"
                        label="MAKE"
                        options={makes}
                        getOptionLabel={(option) => option.Make_Name}
                        onChange={(e, value) => {
                          setMake(value.Make_Name);
                          getModels(value.Make_ID);
                        }}
                        disableClearable
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Make"
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Autocomplete
                        name="model"
                        options={models}
                        disableClearable
                        getOptionLabel={(option) => option.Model_Name}
                        onChange={(e, value) => {
                          setModel(value.Model_Name);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Model"
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Select
                        name="primary_color"
                        label="COLOR"
                        minWidth="100%"
                        options={colors.map((state) => ({
                          name: state,
                          key: state,
                          value: state,
                        }))}
                      />
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <Select
                        name="secondary_color"
                        label="2nd COLOR"
                        minWidth="100%"
                        options={colors.map((state) => ({
                          name: state,
                          key: state,
                          value: state,
                        }))}
                      />
                    </Grid>
                    <Grid item container spacing={1} xs={12}>
                      <Grid item xs={12} md={4}>
                        <Input
                          variant="outlined"
                          label="YEAR"
                          name="year"
                          type="number"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Input
                          variant="outlined"
                          label="PLATE NUMBER"
                          name="plate"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Input
                          variant="outlined"
                          label="VIN Number"
                          name="vin_number"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Select
                          name="state"
                          label="STATE"
                          minWidth="100%"
                          options={states}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <Input
                          variant="outlined"
                          label="OWNER NAME"
                          name="owner"
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
                    <Grid container alignItems="center">
                      <Grid item style={{ flexGrow: 1 }}></Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          disabled={(submitting, pristine, invalid)}
                        >
                          Save
                        </Button>
                      </Grid>
                    </Grid>
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

export default mobxify("snackStore", "authStore")(Vehicles);
