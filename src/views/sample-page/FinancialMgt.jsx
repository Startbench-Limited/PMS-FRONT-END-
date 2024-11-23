import React, { useState } from 'react';
import { Grid, Typography, Button, Tab, Tabs, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Import necessary components
import MainCard from 'ui-component/cards/MainCard';

// Register components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FinancialManagementPage = () => {
  const [value, setValue] = useState(0);
  const [dateFilter, setDateFilter] = useState('');
  const [transactionType, setTransactionType] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDateChange = (event) => {
    setDateFilter(event.target.value);
  };

  const handleTransactionTypeChange = (event) => {
    setTransactionType(event.target.value);
  };

  // Sample data for charts
  const data = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Savings',
        data: [12, 19, 3, 5],
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      },
      {
        label: 'Deposits',
        data: [2, 3, 20, 15],
        backgroundColor: 'rgba(255, 99, 132, 0.6)'
      }
    ]
  };

  return (
    <MainCard>
      <Typography variant="h4" align="center" style={{ fontWeight: 'bold', margin: '20px 0' }}>
        Financial Management Section
      </Typography>

      <Grid container spacing={3}>
        <Grid item md={6}>
          <FormControl fullWidth>
            <InputLabel id="date-filter-label">Filter by Date</InputLabel>
            <Select labelId="date-filter-label" value={dateFilter} onChange={handleDateChange}>
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="last-month">Last Month</MenuItem>
              <MenuItem value="last-3-months">Last 3 Months</MenuItem>
              <MenuItem value="last-6-months">Last 6 Months</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={6}>
          <FormControl fullWidth>
            <InputLabel id="transaction-type-label">Transaction Type</InputLabel>
            <Select labelId="transaction-type-label" value={transactionType} onChange={handleTransactionTypeChange}>
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="savings">Savings</MenuItem>
              <MenuItem value="deposits">Deposits</MenuItem>
              <MenuItem value="withdrawals">Withdrawals</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={12}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label="Automated Transactions" />
            <Tab label="Manual Transactions" />
          </Tabs>
        </Grid>

        <Grid item md={12}>
          <Box hidden={value !== 0}>
            <Typography variant="h6">Automated Transactions</Typography>
            {/* Placeholder for automated transaction table */}
            <div>Automated Transactions Table Here</div>
          </Box>
          <Box hidden={value !== 1}>
            <Typography variant="h6">Manual Transactions</Typography>
            {/* Placeholder for manual transaction table */}
            <div>Manual Transactions Table Here</div>
          </Box>
        </Grid>

        <Grid item md={12}>
          <Typography variant="h6">Savings and Deposits Chart</Typography>
          <Bar data={data} />
        </Grid>

        <Grid item md={12} style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button variant="contained" color="primary">
            Export as Excel
          </Button>
          <Button variant="contained" color="primary" style={{ marginLeft: '10px' }}>
            Export as CSV
          </Button>
          <Button variant="contained" color="primary" style={{ marginLeft: '10px' }}>
            Export as PDF
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default FinancialManagementPage;
