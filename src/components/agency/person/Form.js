import React, { useState, useEffect } from "react";
import { Typography, Box, Tabs, Tab, withStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";

import { Navbar, mobxify } from "../../general";
import { agencyApi } from "../../../utils";
import Personal from "./Personal";
import Validations from "./Validations";
import Vehicles from "./Vehicles";
import Associates from "./Associates";
import Narratives from "./Narratives";
import Attachments from "./Attachments";
import Address from "./Address";

const AntTabs = withStyles({
  root: {
    marginTop: "2rem",
  },
  indicator: {
    display: "none",
  },
})(Tabs);

const AntTab = withStyles({
  root: {
    minWidth: 100,
    color: "#4C4C4C",
    marginRight: 10,
    "&:hover": {
      backgroundColor: "#fff",
      borderRadius: "2rem",
    },
    "&$selected": {
      color: "#475A96",
      backgroundColor: "#fff",
      borderRadius: "2rem",
    },
  },
  selected: {},
})((props) => <Tab {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function Form({ authStore, snackStore }) {
  const [value, setValue] = useState(0);
  const [fetching, setFetching] = useState(false);

  function handleChange(_event, newValue) {
    setValue(newValue);
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const { id } = useParams();
  const [editMode, setEditMode] = useState(Boolean(id));
  const [person, setPerson] = useState({
    firstname: ".",
    middlename: ".",
    lastname: ".",
  });

  useEffect(() => {
    async function getPerson() {
      try {
        setFetching(true);
        const response = await agencyApi({
          path: `agencies/${authStore.agencyInfo.agency_id}/persons/${id}`,
          method: "GET",
        });
        setPerson(response);
        setFetching(false);
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

  return (
    <Navbar>
      <Typography variant="h3" style={{ marginTop: "50px" }}>
        {editMode
          ? `Editing ${person.firstname} ${person.middlename} ${person.lastname}`
          : 'Adding a new "Person"'}
      </Typography>
      <AntTabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <AntTab disabled={!editMode} label="PERSONAL" {...a11yProps(0)} />
        <AntTab disabled={!editMode} label="ASSOCIATES" {...a11yProps(1)} />
        <AntTab disabled={!editMode} label="ADDRESSES" {...a11yProps(2)} />
        <AntTab disabled={!editMode} label="VEHICLES" {...a11yProps(3)} />
        <AntTab
          disabled={!editMode}
          label="VALIDATION INFO"
          {...a11yProps(4)}
        />
        <AntTab disabled={!editMode} label="NARRATIVES" {...a11yProps(5)} />
        <AntTab disabled={!editMode} label="ATTACHMENTS" {...a11yProps(6)} />
      </AntTabs>
      <TabPanel value={value} index={0}>
        <Personal />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Associates />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Address />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Vehicles />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Validations />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Narratives />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Attachments />
      </TabPanel>
    </Navbar>
  );
}

export default mobxify("authStore", "snackStore")(Form);
