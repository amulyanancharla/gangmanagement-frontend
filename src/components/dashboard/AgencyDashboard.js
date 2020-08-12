import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  SvgIcon,
  Divider,
  List,
  ListItem,
  Table,
  Chip,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Link,
} from "@material-ui/core";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {
  ArrowDropDown,
  ArrowDropUp,
  SupervisedUserCircle,
  ShowChart,
  AddCircleOutline,
  DateRangeOutlined,
} from "@material-ui/icons";
import InviteUserModal from "../auth/InviteUserModal";
import { Navbar, mobxify } from "../general";
import { agencyApi } from "../../utils";

const columns = [
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    align: "left",
  },
  {
    id: "firstname",
    label: "Full Name",
    minWidth: 100,
  },
  {
    id: "created_time",
    label: "Created On",
    minWidth: 100,
    align: "right",
    format: (value) => (value ? new Date(value).toDateString() : "--"),
  },
  {
    id: "role",
    label: "Role",
    minWidth: 100,
    align: "right",
    format: (value) => <Chip label="Officer" variant="outlined" />,
  },
  {
    id: "agency_user_status",
    label: "Status",
    minWidth: 100,
    align: "right",
    format: (value) => <Chip label={value} variant="outlined" />,
  },
];

function AgencyDashboard({ authStore, snackStore }) {
  const [open, setOpen] = useState(false);
  const [openfullcalendar, setFullCalendarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    async function getUsers() {
      try {
        setFetching(true);
        const response = await agencyApi({
          path: `agencies/${authStore.agencyInfo.agency_id}/users?page=1&page_size=10`,
          method: "GET",
        });
        setUsers(response);
        setFetching(false);
      } catch (error) {
        setFetching(false);
        snackStore.show({
          message: "Unable to fetch users",
          severity: "error",
        });
      }
    }

    getUsers();
  }, [snackStore, authStore]);

  return (
    <Navbar>
      <Grid
        container
        spacing={5}
        style={{ marginTop: "50px" }}
        justify="center"
      >
        <Grid item md={4} sm={6} xs={9}>
          <Paper style={{ padding: "1.5rem" }}>
            <Grid container>
              <Grid item style={{ flexGrow: 1 }}>
                <Typography variant="caption">USERS</Typography>
                <Typography variant="h5">345</Typography>
              </Grid>
              <Grid
                item
                container
                alignItems="center"
                justify="center"
                style={{
                  backgroundColor: "#B22234",
                  width: "3.5rem",
                  borderRadius: "50%",
                }}
              >
                <SvgIcon htmlColor="#fff">
                  <SupervisedUserCircle />
                </SvgIcon>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={3}
              alignItems="center"
              style={{ margin: "30px 0px 10px 0px" }}
            >
              <ArrowDropDown />
              <Typography variant="caption">12% Since last month</Typography>
            </Grid>
          </Paper>
        </Grid>
        <Grid item md={4} sm={6} xs={9}>
          <Paper style={{ padding: "1.5rem" }}>
            <Grid container>
              <Grid item style={{ flexGrow: 1 }}>
                <Typography variant="caption">ROLES</Typography>
                <Typography variant="h5" noWrap>
                  8
                </Typography>
              </Grid>
              <Grid
                item
                container
                alignItems="center"
                justify="center"
                style={{
                  backgroundColor: "#88BA71",
                  width: "3.5rem",
                  borderRadius: "50%",
                }}
              >
                <SvgIcon htmlColor="#fff">
                  <ShowChart />
                </SvgIcon>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={3}
              alignItems="center"
              style={{ margin: "30px 0px 10px 0px" }}
            >
              <ArrowDropDown />
              <Typography variant="caption">4% Since 2 weeks</Typography>
            </Grid>
          </Paper>
        </Grid>
        <Grid item md={4} sm={6} xs={9}>
          <Paper style={{ padding: "1.5rem" }}>
            <Grid container>
              <Grid item style={{ flexGrow: 1 }}>
                <Typography variant="caption">VALIDATIONS</Typography>
                <Typography variant="h5" noWrap>
                  64 New Validations
                </Typography>
              </Grid>
              <Grid
                item
                container
                alignItems="center"
                justify="center"
                style={{
                  backgroundColor: "#88BA71",
                  width: "3.5rem",
                  borderRadius: "50%",
                }}
              >
                <SvgIcon htmlColor="#fff">
                  <ShowChart />
                </SvgIcon>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={3}
              alignItems="center"
              style={{ margin: "30px 0px 10px 0px" }}
            >
              <ArrowDropUp />
              <Typography variant="caption">10% Since 3 weeks</Typography>
            </Grid>
          </Paper>
        </Grid>
        <Grid item sm={6} xs={10} md={4}>
          <Paper>
            <div style={{ padding: "15px" }}>
              <Typography variant="caption" style={{ float: "right" }}>
                <Button onClick={() => setOpen(true)}>
                  <AddCircleOutline />
                </Button>
                <Dialog open={open} onClose={() => setOpen(false)}>
                  <DialogContent>
                  <Grid container spacing={3}>

                      <Grid item xs={12}>
                        <Typography variant="body1">ADD CALENDAR EVENT</Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          id="outlined-full-width"
                          label="EVENT NAME"
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <TextField
                              id="outlined-basic"
                              label="DATE"
                              fullWidth
                              type="date"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              id="outlined-basic"
                              label="START TIME"
                              fullWidth
                              type="time"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              id="outlined-basic"
                              label="END TIME"
                              fullWidth
                              type="time"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="outlined-multiline-static"
                          label="DESCRIPTION"
                          fullWidth
                          multiline
                          rows={2}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} container spacing={2} justify="flex-end">
                        <Grid item>
                          <Button
                            variant="contained"
                          >
                            Cancel
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="primary"
                          >
                            Add Event
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </DialogContent>
                </Dialog>
              </Typography>
              <Typography variant="body1">CALENDAR</Typography>
            </div>
            <Divider />
            <List>
              <ListItem>
                <Typography
                  variant="body1"
                  style={{ marginRight: "20px", alignSelf: "flex-start" }}
                >
                  06:11
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    float: "left",
                    background: "rgba(71, 90, 150, 0.75)",
                    padding: "5px",
                    color: "#fff",
                    borderRadius: "5px",
                  }}
                >
                  Calendar invite to include quite a few details of the top most
                  agenda scheduled for today
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant="body1"
                  style={{ marginRight: "20px", alignSelf: "flex-start" }}
                >
                  06:11
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    float: "left",
                    background: "rgba(71, 90, 150, 0.75)",
                    padding: "5px",
                    color: "#fff",
                    borderRadius: "5px",
                  }}
                >
                  Calendar invite to include quite a few details of the top most
                  agenda scheduled for today
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant="body1"
                  style={{ marginRight: "20px", alignSelf: "flex-start" }}
                >
                  06:11
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    float: "left",
                    background: "rgba(71, 90, 150, 0.75)",
                    padding: "5px",
                    color: "#fff",
                    borderRadius: "5px",
                  }}
                >
                  Calendar invite to include quite a few details of the top most
                  agenda scheduled for today
                </Typography>
              </ListItem>
            </List>
            <Grid container justify="flex-end">
              <Grid item style={{padding:"0.5rem"}}>
                <Button onClick={() => setFullCalendarOpen(true)}>
                  view all
                </Button>
                <Dialog open={openfullcalendar} onClose={() => setFullCalendarOpen(false)}>
                  <DialogContent>
                    <FullCalendar
                      plugins={[ dayGridPlugin ]}
                      initialView="dayGridMonth"
                    />
                  </DialogContent>
                </Dialog>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item md={8} sm={12} xs={12}>
          <Paper>
            <div style={{ padding: "15px" }}>
              <div style={{ float: "right" }}>
                <InviteUserModal />
              </div>
              <Typography variant="body1">
                USERS
                <span
                  style={{
                    marginLeft: "30px",
                    fontSize: "12px",
                    color: "#9EA0A5",
                  }}
                >
                  182 total
                </span>
              </Typography>
            </div>
            {/* <Table aria-label="users table">
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Created on</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Last Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell style={{ color: "#4C4C4C" }}>ravi.docs</TableCell>
                  <TableCell style={{ color: "#4C4C4C" }}>
                    Ravi Teja Varma
                  </TableCell>
                  <TableCell style={{ color: "#4C4C4C" }}>04/08/2019</TableCell>
                  <TableCell>
                    <Chip label="Police Officer" variant="outlined" />
                  </TableCell>
                  <TableCell style={{ color: "#4C4C4C" }}>
                    Validated Gand Information
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table> */}

            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.email}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Navbar>
  );
}

export default mobxify("snackStore", "authStore")(AgencyDashboard);
