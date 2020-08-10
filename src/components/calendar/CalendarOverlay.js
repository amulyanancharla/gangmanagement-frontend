import React from "react";
import { Typography, Grid, Paper, TextField } from "@material-ui/core";

function CalendarOverlay() {
  return (
    <Grid item sm={6} xs={10} md={4}>
      <Paper>
        <div style={{ padding: "15px" }}>
          <Typography variant="body1">ADD CALENDAR EVENT</Typography>
        </div>
        <Grid container spacing={6} direction="column">
          <Grid item>
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
          <Grid container spacing={1} direction="row">
            <Grid item>
              <TextField
                id="outlined-basic"
                label="DATE"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"

              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-basic"
                label="START TIME"
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-basic"
                label="END TIME"
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>

  );
}
export default CalendarOverlay;
