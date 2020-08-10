import React from "react";
import { Navbar } from "../general";
import InviteUserModal from "../auth/InviteUserModal";
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
  Link,
} from "@material-ui/core";

function AgencyUsers() {
  return (
    <Navbar>
      <Typography variant="h4" style={{ marginTop: "50px" }}>
        Users
      </Typography>
      <div style={{ margin: "20px 0px" }}>
        <div style={{ float: "right" }}>
          <InviteUserModal>
            <Link style={{ marginLeft: "2rem" }}>AUDIT LOG</Link>
          </InviteUserModal>
        </div>
        <div>
          <Typography variant="caption">
            VIEWING{" "}
            <Chip
              variant="outlined"
              size="small"
              label="Police Officer"
              avatar={<VisibilityIcon />}
            />
            <Chip
              variant="outlined"
              size="small"
              label="Sergeant"
              avatar={<VisibilityIcon />}
            />
          </Typography>
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
              <TableCell>Role</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Jurisdiction</TableCell>
              <TableCell>Last Log</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell style={{ color: "#4C4C4C" }}>
                Ravi Teja Varma
              </TableCell>
              <TableCell>
                <Chip label="Police Officer" variant="outlined" />
              </TableCell>
              <TableCell style={{ color: "#4C4C4C" }}>
                raviteja8126@gmail.com
              </TableCell>
              <TableCell style={{ color: "#4C4C4C" }}>Invited</TableCell>
              <TableCell style={{ color: "#4C4C4C" }}>J2</TableCell>
              <TableCell style={{ color: "#4C4C4C" }}>
                Invited for activation
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Navbar>
  );
}

export default AgencyUsers;
