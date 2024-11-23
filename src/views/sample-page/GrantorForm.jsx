import { Check } from '@mui/icons-material';
import { FormControl, InputLabel, OutlinedInput, Grid, Button, Select, MenuItem, Typography } from '@mui/material';
import { FormGroup, Input, Label } from 'reactstrap';
import MainCard from 'ui-component/cards/MainCard';
import { useState } from 'react';

const GrantorMedicalFormUpload = () => {
  const [selectedPilgrim, setSelectedPilgrim] = useState('');
  const [file, setFile] = useState(null);

  // Example existing pilgrims data
  const existingPilgrims = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
    // Add more existing pilgrims here
  ];

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <MainCard>
      <Typography variant="h4" align="center" style={{ fontWeight: 'bold', margin: '20px 0' }}>
        Grantor & Medical Form Upload
      </Typography>

      <Grid container spacing={2}>
        {/* Select Existing Pilgrim */}
        <Grid item md={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="select-pilgrim-label">Select Existing Pilgrim</InputLabel>
            <Select
              labelId="select-pilgrim-label"
              value={selectedPilgrim}
              onChange={(e) => setSelectedPilgrim(e.target.value)}
              label="Select Existing Pilgrim"
            >
              {existingPilgrims.map((pilgrim) => (
                <MenuItem key={pilgrim.id} value={pilgrim.id}>
                  {pilgrim.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Guarantor Information Section */}
        <Grid item md={12}>
          <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '20px' }}>
            Guarantor Information
          </Typography>
        </Grid>

        {[
          { label: 'First Name', id: 'guarantor-first-name' },
          { label: 'Middle Name', id: 'guarantor-middle-name' },
          { label: 'Surname', id: 'guarantor-surname' },
          { label: 'Relationship to Pilgrim', id: 'relationship' },
          { label: 'Contact Phone', id: 'guarantor-phone' },
          { label: 'Email Address', id: 'guarantor-email' },
          { label: 'Address', id: 'guarantor-address' }
        ].map(({ label, id }, index) => (
          <Grid item md={4} key={index}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor={id}>{label}</InputLabel>
              <OutlinedInput id={id} />
            </FormControl>
          </Grid>
        ))}

        {/* Medical Information Section */}
        <Grid item md={12}>
          <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '20px' }}>
            Medical Information
          </Typography>
        </Grid>

        {[
          { label: 'Medical History', id: 'medical-history', multiline: true, rows: 3 },
          { label: 'Allergies', id: 'allergies' },
          { label: 'Current Medications', id: 'current-medications' },
          { label: 'Vaccination Information', id: 'vaccination-info' }
        ].map(({ label, id, multiline, rows }, index) => (
          <Grid item md={4} key={index}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor={id}>{label}</InputLabel>
              <OutlinedInput id={id} multiline={multiline} rows={rows} />
            </FormControl>
          </Grid>
        ))}

        {/* File Upload Section */}
        <Grid item md={12}>
          <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '20px' }}>
            Upload Documents
          </Typography>
          <FormControl fullWidth>
            {/* <InputLabel htmlFor="file-upload">Choose file</InputLabel> */}
            <Input id="file-upload" type="file" onChange={handleFileChange} />
          </FormControl>
        </Grid>

        <Grid item md={12}>
          <FormGroup check>
            <Input type="checkbox" id="consent" />
            <Label check for="consent">
              I consent to the treatment.
            </Label>
          </FormGroup>
        </Grid>
      </Grid>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="contained" color="primary" className="mt-3 px-5">
          <Check /> Save
        </Button>
      </div>
    </MainCard>
  );
};

export default GrantorMedicalFormUpload;
