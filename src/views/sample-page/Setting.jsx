import React, { useState } from 'react';
import { Typography, Grid, TextField, Button, Card, CardContent, FormControlLabel, Checkbox, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    emailUpdates: true
  });

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setSettings((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    // Logic to save settings can be implemented here
    console.log('Settings saved:', settings);
  };

  return (
    <MainCard>
      <Typography variant="h4" align="center" style={{ fontWeight: 'bold', margin: '20px 0' }}>
        Settings
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Settings
              </Typography>
              <TextField fullWidth label="Username" variant="outlined" margin="normal" />
              <TextField fullWidth label="Email" variant="outlined" margin="normal" />
              <TextField fullWidth label="Phone Number" variant="outlined" margin="normal" />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Notification Settings
              </Typography>
              <FormControlLabel
                control={<Checkbox checked={settings.notifications} onChange={handleChange} name="notifications" />}
                label="Enable Notifications"
              />
              <FormControlLabel
                control={<Checkbox checked={settings.emailUpdates} onChange={handleChange} name="emailUpdates" />}
                label="Receive Email Updates"
              />
              <FormControlLabel
                control={<Checkbox checked={settings.darkMode} onChange={handleChange} name="darkMode" />}
                label="Enable Dark Mode"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Box>
    </MainCard>
  );
};

export default SettingsPage;
