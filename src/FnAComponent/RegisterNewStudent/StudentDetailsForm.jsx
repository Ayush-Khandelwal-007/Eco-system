import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Checkbox} from "@material-ui/core";

export default function StudentDetailsForm({ studentInfo, setStudentInfo }) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Student Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            value={studentInfo ? studentInfo.firstName : ''}
            onChange={(e) => setStudentInfo({ ...studentInfo, firstName: e.target.value })}
            fullWidth
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            value={studentInfo ? studentInfo.lastName : ''}
            onChange={(e) => setStudentInfo({ ...studentInfo, lastName: e.target.value })}
            fullWidth
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="enrollment"
            name="enrollment"
            label="Enrollment Number"
            value={studentInfo ? studentInfo.roll : ''}
            onChange={(e) => setStudentInfo({ ...studentInfo, roll: e.target.value })}
            fullWidth
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            value={studentInfo ? studentInfo.address : ''}
            onChange={(e) => setStudentInfo({ ...studentInfo, address: e.target.value })}
            fullWidth
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            value={studentInfo ? studentInfo.city : ''}
            onChange={(e) => setStudentInfo({ ...studentInfo, city: e.target.value })}
            label="City"
            fullWidth
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            value={studentInfo ? studentInfo.state : ''}
            onChange={(e) => setStudentInfo({ ...studentInfo, state: e.target.value })}
            label="State/Province/Region"
            fullWidth
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            value={studentInfo ? studentInfo.zip : ''}
            onChange={(e) => setStudentInfo({ ...studentInfo, zip: e.target.value })}
            label="Zip / Postal code"
            fullWidth
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            value={studentInfo ? studentInfo.country : ''}
            onChange={(e) => setStudentInfo({ ...studentInfo, country: e.target.value })}
            fullWidth
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="date"
            label="Birthday"
            type="date"
            value={studentInfo ? studentInfo.dob : ''}
            onChange={(e) => setStudentInfo({ ...studentInfo, dob: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel onChange={(e) => setStudentInfo({ ...studentInfo, feesPaid: !studentInfo.feesPaid })} value={studentInfo.feesPaid} control={<Checkbox />} label="Fees Paid" />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
