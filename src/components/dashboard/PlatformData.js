import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Paper,
  Box,
  Tabs,
  Tab,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";

import { Input, Navbar, mobxify } from "../general";
import { agencyApi } from "../../utils";

function TabPanel(props) {
  const { value, children, index, label, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Grid container spacing={2}>
            {children}
          </Grid>
        </Box>
      )}
    </div>
  );
}

function PlatformData({ snackStore, authStore }) {
  async function submitLabels({ labels }) {
    try {
      await agencyApi({
        path: `default/labels`,
        body: JSON.stringify(labels),
        stringify: false,
      });
      snackStore.show({ message: "Updated!", severity: "success" });
    } catch (error) {
      snackStore.show({ message: error.message, severity: "error" });
    }
  }

  async function submitValues({ values }) {
    try {
      await agencyApi({
        path: `default/label_list_values`,
        body: JSON.stringify(values),
        stringify: false,
      });
      snackStore.show({ message: "Updated!", severity: "success" });
    } catch (error) {
      snackStore.show({ message: error.message, severity: "error" });
    }
  }

  const [personTab, setPersonTab] = useState(0);
  const [gangTab, setGangTab] = useState(0);
  const [addressTab, setAddressTab] = useState(0);
  const [IntelligenceTab, setIntelligenceTab] = useState(0);

  function PersonCard(props) {
    function a11yProps(index) {
      return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
      };
    }

    const handleChange = (_event, newValue) => {
      setPersonTab(newValue);
    };

    return (
      <Grid item xs={12} sm={6} md={4}>
        <Paper style={{ padding: "20px" }}>
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            {props.title}
          </Typography>
          <Tabs
            value={personTab}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Labels" {...a11yProps(0)} />
            <Tab label="Values" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={personTab} index={0} label="label">
            <Form
              mutators={{
                ...arrayMutators,
              }}
              onSubmit={submitLabels}
              initialValues={{ labels: personLabels }}
            >
              {({ handleSubmit, submitting, pristine, invalid }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <FieldArray name="labels">
                      {({ fields }) =>
                        fields.map((name, index) => (
                          <Grid item>
                            <Input
                              name={`${name}.default_lable_name`}
                              label={fields.value[index]["label_key"]}
                              fullWidth
                              {...props}
                            />
                          </Grid>
                        ))
                      }
                    </FieldArray>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={submitting || pristine || invalid}
                      >
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Form>
          </TabPanel>
          <TabPanel value={personTab} index={1} label="value">
            <Form
              mutators={{
                ...arrayMutators,
              }}
              onSubmit={submitValues}
              initialValues={{ values: personValues }}
            >
              {({ handleSubmit, submitting, pristine, invalid }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <FieldArray name="values">
                      {({ fields }) =>
                        fields.map((name, index) => (
                          <Grid item>
                            <Input
                              name={`${name}.label_list_values`}
                              label={fields.value[index]["label_key"]}
                              fullWidth
                              {...props}
                            />
                          </Grid>
                        ))
                      }
                    </FieldArray>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={submitting || pristine || invalid}
                      >
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Form>
          </TabPanel>
        </Paper>
      </Grid>
    );
  }

  function GangCard(props) {
    function a11yProps(index) {
      return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
      };
    }

    const handleChange = (_event, newValue) => {
      setGangTab(newValue);
    };

    return (
      <Grid item xs={12} sm={6} md={4}>
        <Paper style={{ padding: "20px" }}>
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            {props.title}
          </Typography>
          <Tabs
            value={gangTab}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Labels" {...a11yProps(0)} />
            <Tab label="Values" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={gangTab} index={0} label="label">
            <Form
              mutators={{
                ...arrayMutators,
              }}
              onSubmit={submitLabels}
              initialValues={{ labels: gangLabels }}
            >
              {({ handleSubmit, submitting, pristine, invalid }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <FieldArray name="labels">
                      {({ fields }) =>
                        fields.map((name, index) => (
                          <Grid item>
                            <Input
                              name={`${name}.default_lable_name`}
                              label={fields.value[index]["label_key"]}
                              fullWidth
                              {...props}
                            />
                          </Grid>
                        ))
                      }
                    </FieldArray>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={submitting || pristine || invalid}
                      >
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Form>
          </TabPanel>
          <TabPanel value={gangTab} index={1} label="value">
            <Form
              mutators={{
                ...arrayMutators,
              }}
              onSubmit={submitValues}
              initialValues={{ values: gangValues }}
            >
              {({ handleSubmit, submitting, pristine, invalid }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <FieldArray name="values">
                      {({ fields }) =>
                        fields.map((name, index) => (
                          <Grid item>
                            <Input
                              name={`${name}.label_list_values`}
                              label={fields.value[index]["label_key"]}
                              fullWidth
                              {...props}
                            />
                          </Grid>
                        ))
                      }
                    </FieldArray>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={submitting || pristine || invalid}
                      >
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Form>
          </TabPanel>
        </Paper>
      </Grid>
    );
  }

  function IntelligenceCard(props) {
    function a11yProps(index) {
      return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
      };
    }

    const handleChange = (_event, newValue) => {
      setIntelligenceTab(newValue);
    };

    return (
      <Grid item xs={12} sm={6} md={4}>
        <Paper style={{ padding: "20px" }}>
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            {props.title}
          </Typography>
          <Tabs
            value={IntelligenceTab}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Labels" {...a11yProps(0)} />
            <Tab label="Values" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={IntelligenceTab} index={0} label="label">
            <Form
              mutators={{
                ...arrayMutators,
              }}
              onSubmit={submitLabels}
              initialValues={{ labels: addressLabels }}
            >
              {({ handleSubmit, submitting, pristine, invalid }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <FieldArray name="labels">
                      {({ fields }) =>
                        fields.map((name, index) => (
                          <Grid item>
                            <Input
                              name={`${name}.default_lable_name`}
                              label={fields.value[index]["label_key"]}
                              fullWidth
                              {...props}
                            />
                          </Grid>
                        ))
                      }
                    </FieldArray>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={submitting || pristine || invalid}
                      >
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Form>
          </TabPanel>
          <TabPanel value={IntelligenceTab} index={1} label="value">
            <Form
              mutators={{
                ...arrayMutators,
              }}
              onSubmit={submitValues}
              initialValues={{ values: intelligenceValues }}
            >
              {({ handleSubmit, submitting, pristine, invalid }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <FieldArray name="values">
                      {({ fields }) =>
                        fields.map((name, index) => (
                          <Grid item>
                            <Input
                              name={`${name}.label_list_values`}
                              label={fields.value[index]["label_key"]}
                              fullWidth
                              {...props}
                            />
                          </Grid>
                        ))
                      }
                    </FieldArray>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={submitting || pristine || invalid}
                      >
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Form>
          </TabPanel>
        </Paper>
      </Grid>
    );
  }

  function AddressCard(props) {
    function a11yProps(index) {
      return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
      };
    }

    const handleChange = (_event, newValue) => {
      setAddressTab(newValue);
    };

    return (
      <Grid item xs={12} sm={6} md={4}>
        <Paper style={{ padding: "20px" }}>
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            {props.title}
          </Typography>
          <Tabs
            value={addressTab}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Labels" {...a11yProps(0)} />
            <Tab label="Values" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={addressTab} index={0} label="label">
            <Form
              mutators={{
                ...arrayMutators,
              }}
              onSubmit={submitLabels}
              initialValues={{ labels: intelligenceLabels }}
            >
              {({ handleSubmit, submitting, pristine, invalid }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <FieldArray name="labels">
                      {({ fields }) =>
                        fields.map((name, index) => (
                          <Grid item>
                            <Input
                              name={`${name}.default_lable_name`}
                              label={fields.value[index]["label_key"]}
                              fullWidth
                              {...props}
                            />
                          </Grid>
                        ))
                      }
                    </FieldArray>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={submitting || pristine || invalid}
                      >
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Form>
          </TabPanel>
          <TabPanel value={addressTab} index={1} label="value">
            <Form
              mutators={{
                ...arrayMutators,
              }}
              onSubmit={submitValues}
              initialValues={{ values: addressValues }}
            >
              {({ handleSubmit, submitting, pristine, invalid }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <FieldArray name="values">
                      {({ fields }) =>
                        fields.map((name, index) => (
                          <Grid item>
                            <Input
                              name={`${name}.label_list_values`}
                              label={fields.value[index]["label_key"]}
                              fullWidth
                              {...props}
                            />
                          </Grid>
                        ))
                      }
                    </FieldArray>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={submitting || pristine || invalid}
                      >
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Form>
          </TabPanel>
        </Paper>
      </Grid>
    );
  }

  const [personLabels, setPersonLabels] = useState([]);
  const [gangLabels, setGangLabels] = useState([]);
  const [addressLabels, setAddressLabels] = useState([]);
  const [intelligenceLabels, setIntelligenceLabels] = useState([]);

  const [personValues, setPersonValues] = useState([]);
  const [gangValues, setGangValues] = useState([]);
  const [addressValues, setAddressValues] = useState([]);
  const [intelligenceValues, setIntelligenceValues] = useState([]);
  const [fetchingLabels, setFetchingLabels] = useState(true);
  const [fetchingValues, setFetchingValues] = useState(true);

  useEffect(() => {
    async function getLabels() {
      setFetchingLabels(true);
      try {
        const response = await agencyApi({
          path: "default/labels",
          method: "GET",
        });
        setPersonLabels(
          response.filter(({ label_category }) => label_category === "PERSON")
        );
        setGangLabels(
          response.filter(({ label_category }) => label_category === "GANG")
        );
        setAddressLabels(
          response.filter(({ label_category }) => label_category === "ADDRESS")
        );
        setIntelligenceLabels(
          response.filter(
            ({ label_category }) => label_category === "INTELLIGENCE"
          )
        );
        setFetchingLabels(false);
      } catch (error) {
        setFetchingLabels(false);
        snackStore.show({ message: error.message, severity: "error" });
      }
    }

    async function getValues() {
      setFetchingValues(true);
      try {
        const response = await agencyApi({
          path: "default/label_list_values",
          method: "GET",
        });
        setPersonValues(
          response.filter(({ label_category }) => label_category === "PERSON")
        );
        setGangValues(
          response.filter(({ label_category }) => label_category === "GANG")
        );
        setAddressValues(
          response.filter(({ label_category }) => label_category === "ADDRESS")
        );
        setIntelligenceValues(
          response.filter(
            ({ label_category }) => label_category === "INTELLIGENCE"
          )
        );
        setFetchingValues(false);
      } catch (error) {
        setFetchingValues(false);
        snackStore.show({ message: error.message, severity: "error" });
      }
    }

    getLabels();
    getValues();
  }, [snackStore]);

  return (
    <Navbar>
      <Typography variant="h4" style={{ marginTop: "50px" }}>
        Data
      </Typography>
      <Typography variant="caption">
        CUSTOMIZE FIELD LABELS AND TYPES FOR FORMS
      </Typography>
      <Grid container spacing={4} style={{ marginTop: "30px" }}>
        {(fetchingLabels || fetchingValues) && (
          <Grid container alignContent="center" justify="center">
            <CircularProgress />
          </Grid>
        )}
        {!(fetchingLabels || fetchingValues) && (
          <>
            <PersonCard title="PERSON" />
            <GangCard title="GANG" />
            <AddressCard title="ADDRESS" />
            <IntelligenceCard title="INTELLIGENCE" />
          </>
        )}
      </Grid>
    </Navbar>
  );
}

export default mobxify("authStore", "snackStore")(PlatformData);
