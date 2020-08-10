import React, { useState, useEffect } from "react";

import {
  Avatar,
  Typography,
  Grid,
  Button,
  Paper,
  Chip,
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { useParams } from "react-router-dom";

import { mobxify } from "../../general";
import { agencyApi, debounceEventHandler } from "../../../utils";

import logoImage from "../../../styles/media/user_prof.png";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  hover: {
    cursor: "pointer",
  },
}));

function Associates({ snackStore, authStore }) {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [fetchingAssociates, setFetchingAssociates] = useState(false);
  const [selectedAssociates, setSelectedAssociates] = useState([]);
  const [associates, setAssociates] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const classes = useStyles();
  const { id } = useParams();

  async function getAssociates() {
    try {
      setFetchingAssociates(true);
      const response = await agencyApi({
        path: `agencies/${authStore.agencyInfo.agency_id}/persons/${id}/known_associates`,
        method: "GET",
      });
      setAssociates(response);
      setFetchingAssociates(false);
    } catch (error) {
      setFetchingAssociates(false);
      snackStore.show({
        message: "Unable to fetch associates",
        severity: "error",
      });
    }
  }

  useEffect(() => {
    getAssociates();
  }, [id]);

  async function submit() {
    try {
      setSubmitting(true);
      await agencyApi({
        path: `agencies/${authStore.agencyInfo.agency_id}/persons/${id}/known_associates`,
        body: JSON.stringify(
          selectedAssociates.map((person_id) => ({
            person_associate_id: person_id,
          }))
        ),
        stringify: false,
      });
      snackStore.show({
        message: "Successfully added associates",
        severity: "success",
      });
      setSubmitting(false);
      getAssociates();
    } catch (error) {
      setSubmitting(false);
      snackStore.show({
        message: "Unable to add associates",
        severity: "error",
      });
    }
    setSelectedAssociates([]);
    setResults([]);
    setOpen(false);
  }

  async function search(e) {
    try {
      setFetching(true);
      const response = await agencyApi({
        path: `agencies/${authStore.agencyInfo.agency_id}/persons/search?search_string=${e.target.value}`,
        method: "GET",
      });
      setResults(response);
      setFetching(false);
    } catch (error) {
      setFetching(false);
      snackStore.show({
        message: "Unable to search",
        severity: "error",
      });
    }
  }

  function AssociateCard({ name, nickname, notes, photos, ssn }) {
    return (
      <Grid item md={4} xs={6}>
        <Paper style={{ padding: "1.5rem", border: "3px solid #66A6FF" }}>
          <Grid item container>
            <Grid item sm={8} xs={12}>
              <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
              >
                <Grid item>
                  <Avatar
                    className={classes.large}
                    src={photos.length > 0 ? photos[0]["photo_s3_url"] : null}
                    alt={name}
                  />
                </Grid>
                <Grid item>
                  {nickname && (
                    <Chip
                      label={nickname}
                      color="primary"
                      style={{ marginTop: "-1rem", backgroundColor: "#66A6FF" }}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item container direction="column" sm={4} xs={12}>
              <Grid item style={{ flexGrow: 1 }}>
                <Typography variant="h5">{name}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">Gangs Associated</Typography>
                <Typography variant="h6">Razor Justice</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            spacing={1}
            style={{ marginTop: "0.5rem" }}
          >
            <Typography variant="caption">State ID</Typography>
            <Typography variant="subtitle2">
              <strong>{ssn}</strong>
            </Typography>
            <Typography variant="body2">Notes</Typography>
            <Typography variant="body1">{notes}</Typography>
          </Grid>
        </Paper>
      </Grid>
    );
  }

  if (fetchingAssociates) {
    return (
      <Grid container alignContent="center" justify="center">
        <CircularProgress />
      </Grid>
    );
  } else {
    return (
      <>
        <Button onClick={() => setOpen(true)} style={{ float: "right" }}>
          + ADD ASSOCIATE
        </Button>
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
            setResults([]);
          }}
          fullWidth
        >
          <DialogContent>
            <Grid container alignItems="center" justify="center">
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="SEARCH AND ADD ASSOCIATE"
                    onChange={debounceEventHandler(search, 500)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {fetching ? (
                  <Grid container alignContent="center" justify="center">
                    <CircularProgress />
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell>Full Name</TableCell>
                          <TableCell>State ID</TableCell>
                          <TableCell>Description</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {results.map(
                          ({
                            person_id,
                            firstname,
                            middlename,
                            lastname,
                            ssn,
                            notes,
                          }) => {
                            return (
                              <TableRow
                                className={classes.hover}
                                onClick={() =>
                                  setSelectedAssociates([
                                    ...new Set([
                                      ...selectedAssociates,
                                      person_id,
                                    ]),
                                  ])
                                }
                              >
                                <TableCell>
                                  {selectedAssociates.includes(person_id) && (
                                    <BookmarkIcon
                                      style={{ color: "#3C3B6E" }}
                                    />
                                  )}
                                </TableCell>
                                <TableCell>{`${firstname} ${middlename} ${lastname}`}</TableCell>
                                <TableCell>{ssn}</TableCell>
                                <TableCell>{notes}</TableCell>
                              </TableRow>
                            );
                          }
                        )}
                      </TableBody>
                    </Table>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid container alignItems="center" style={{ marginTop: "3rem" }}>
              <Grid item style={{ flexGrow: 1 }}></Grid>
              <Grid item>
                <Button
                  color="primary"
                  onClick={() => {
                    setOpen(false);
                    setResults([]);
                  }}
                  style={{ marginRight: "1rem" }}
                >
                  Cancel
                </Button>
                {selectedAssociates.length > 0 && (
                  <Button
                    type="submit"
                    onClick={submit}
                    disabled={submitting}
                    variant="contained"
                    color="primary"
                  >
                    {`ADD (${selectedAssociates.length}) SELECTED`}
                  </Button>
                )}
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
        <Grid container spacing={2}>
          {associates.map(
            ({
              person: {
                person_id,
                ssn,
                firstname,
                middlename,
                lastname,
                nickname,
                notes,
                photos,
              },
            }) => (
              <AssociateCard
                name={`${firstname} ${middlename} ${lastname}`}
                key={person_id}
                ssn={ssn}
                notes={notes}
                photos={photos}
                nickname={nickname}
              />
            )
          )}
        </Grid>
      </>
    );
  }
}

export default mobxify("authStore", "snackStore")(Associates);
