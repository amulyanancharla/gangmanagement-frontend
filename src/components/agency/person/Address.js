import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Paper,
  Button,
  Dialog,
  DialogContent,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { Form } from "react-final-form";
import { useParams } from "react-router-dom";
import { Select, Input, mobxify } from "../../general";
import { agencyApi } from "../../../utils";

import MapRoundIcon from "../../../styles/media/map_round.png";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

function Address({ authStore, snackStore }) {
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { id } = useParams();

  async function getAddresses() {
    try {
      setFetching(true);
      const response = await agencyApi({
        path: `agencies/${authStore.agencyInfo.agency_id}/persons/${id}/addresses`,
        method: "GET",
      });
      setAddresses(response);
      setFetching(false);
    } catch (error) {
      setFetching(false);
      snackStore.show({
        message: "Unable to fetch addresses",
        severity: "error",
      });
    }
  }

  async function submit(values) {
    try {
      setIsSuccess(false);
      await agencyApi({
        path: `agencies/${authStore.agencyInfo.agency_id}/persons/${id}/addresses`,
        body: values,
      });
      snackStore.show({
        message: "Successfully added address",
        severity: "success",
      });
      setIsSuccess(true);
      getAddresses();
    } catch (error) {
      snackStore.show({
        message: "Unable to add address",
        severity: "error",
      });
    }
  }

  async function deleteAddress(address_id) {
    try {
      await agencyApi({
        path: `agencies/${authStore.agencyInfo.agency_id}/persons/${id}/addresses/${address_id}`,
        method: "DELETE",
      });
      snackStore.show({
        message: "Successfully deleted address",
        severity: "success",
      });
      getAddresses();
    } catch (error) {
      snackStore.show({
        message: "Unable to delete address",
        severity: "error",
      });
    }
  }

  useEffect(() => {
    getAddresses();
  }, [id]);

  if (fetching) {
    return (
      <Grid container alignContent="center" justify="center">
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: "1rem" }}>
          <Typography variant="caption">ADDRESSES</Typography>
          <Grid container direction="column" style={{ marginTop: "1rem" }}>
            <Grid item>
              {addresses.map(
                ({
                  address_id,
                  address_line_1,
                  address_line_2,
                  address_type,
                  state,
                  zipcode,
                  country,
                  county,
                }) => (
                  <Grid
                    container
                    key={address_id}
                    spacing={2}
                    alignItems="center"
                  >
                    <Grid item>
                      <TextField
                        label="TYPE"
                        name="address_type"
                        disabled
                        value={address_type}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="ADDRESS"
                        name="address"
                        fullWidth
                        disabled
                        multiline
                        rows={2}
                        value={`${address_line_1} ${address_line_2} ${county} ${state} ${zipcode} ${country}`}
                      />
                    </Grid>
                    <Grid item>
                      <img src={MapRoundIcon} alt="map" />
                    </Grid>
                    <Grid
                      item
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteAddress(address_id)}
                    >
                      <DeleteForeverIcon />
                    </Grid>
                  </Grid>
                )
              )}
            </Grid>
            <Grid item>
              <Button onClick={() => setOpen(true)}>+ ADD ADDRESS</Button>
              <Dialog open={open} onClose={() => setOpen(false)}>
                <Form onSubmit={submit}>
                  {({ form, handleSubmit, submitting, pristine, invalid }) => (
                    <form onSubmit={handleSubmit}>
                      <DialogContent>
                        <Grid container>
                          <Grid item md={6}>
                            <Typography variant="caption">
                              Add Address
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={2} style={{ padding: "1rem" }}>
                          <Grid item xs={4}>
                            <Select
                              label="TYPE"
                              name="address_type"
                              minWidth="10rem"
                              options={["HOME", "FRIEND", "OTHERS"].map(
                                (state) => ({
                                  name: state,
                                  key: state,
                                  value: state,
                                })
                              )}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Input
                              label="Address_line_1"
                              name="address_line_1"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Input
                              label="Address_line_2"
                              name="address_line_2"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Input label="CITY" name="city" fullWidth />
                          </Grid>
                          <Grid item xs={4}>
                            <Input label="COUNTY" name="county" fullWidth />
                          </Grid>
                          <Grid item xs={4}>
                            <Input label="COUNTRY" name="country" fullWidth />
                          </Grid>
                          <Grid item xs={4}>
                            <Input label="ZIP CODE" name="zipcode" fullWidth />
                          </Grid>
                          <Grid item xs={4}>
                            <Input label="STATE" name="state" fullWidth />
                          </Grid>
                          <Grid item xs={4}>
                            <Input label="PSA" name="psa" fullWidth />
                          </Grid>
                          <Grid item xs={4}>
                            <Input
                              label="JURISDICTION"
                              name="jurisdiction"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Input
                              label="LATITUDE"
                              name="latitiude"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Input
                              label="LONGITUDE"
                              name="longitude"
                              fullWidth
                            />
                          </Grid>
                          <Grid container alignItems="center">
                            <Grid item style={{ flexGrow: 1 }}></Grid>
                            <Grid item>
                              <Button
                                variant="contained"
                                style={{ marginRight: "1rem" }}
                                onClick={() => {
                                  form.reset();
                                  setOpen(false);
                                }}
                              >
                                CANCEL
                              </Button>
                              <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                disabled={submitting || pristine || invalid}
                              >
                                Save
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </DialogContent>
                    </form>
                  )}
                </Form>
              </Dialog>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default mobxify("authStore", "snackStore")(Address);
