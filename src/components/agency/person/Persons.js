import React, { useEffect, useState } from "react";
import { Navbar } from "../../general";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  Typography,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Chip,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { mobxify } from "../../general";
import { agencyApi } from "../../../utils";

function Persons({ authStore, snackStore }) {
  const [persons, setPersons] = useState([]);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    async function getPersons() {
      try {
        setFetching(true);
        const response = await agencyApi({
          path: `agencies/${authStore.agencyInfo.agency_id}/persons`,
          method: "GET",
        });
        setPersons(response);
        setFetching(false);
      } catch (error) {
        setFetching(false);
        snackStore.show({
          message: "Unable to fetch persons",
          severity: "error",
        });
      }
    }

    getPersons();
  }, [snackStore, authStore]);

  return (
    <Navbar>
      <Typography variant="h4" style={{ marginTop: "50px" }}>
        Persons
      </Typography>
      <div style={{ margin: "20px 10px" }}>
        <div style={{ float: "right" }}>
          <Link href="/agency/persons/new" style={{ marginLeft: "2rem" }}>
            + ADD PERSON
          </Link>
        </div>
        <div>
          {/* <Typography variant="caption">
            VIEWING{" "}
            <Chip
              variant="outlined"
              size="small"
              label="Valid (11)"
              avatar={<VisibilityIcon />}
            />
            <Chip
              variant="outlined"
              size="small"
              label="Drafts(5)"
              avatar={<VisibilityIcon />}
            />
          </Typography> */}
        </div>
      </div>
      <Paper>
        <div style={{ padding: "15px" }}>
          <Typography variant="body1">
            <span style={{ fontSize: "12px", color: "#9EA0A5" }}>
              182 total
            </span>
          </Typography>
        </div>
        <Table aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Gang(s) Associated</TableCell>
              <TableCell>State ID</TableCell>
              <TableCell>Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {persons.map(
              ({ person_id, firstname, middlename, lastname, state }) => (
                <TableRow>
                  <TableCell style={{ color: "#4C4C4C" }}>
                    <Link to={`/agency/persons/${person_id}/edit`}>
                      {`${firstname} ${middlename} ${lastname}`}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Chip label="VALID" color="primary" />
                  </TableCell>
                  <TableCell style={{ color: "#4C4C4C" }}>
                    GypSy Joker, M16
                  </TableCell>
                  <TableCell style={{ color: "#4C4C4C" }}>{state}</TableCell>
                  <TableCell style={{ color: "#4C4C4C" }}>
                    Invited for activation
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </Paper>
    </Navbar>
  );
}

export default mobxify("authStore", "snackStore")(Persons);
