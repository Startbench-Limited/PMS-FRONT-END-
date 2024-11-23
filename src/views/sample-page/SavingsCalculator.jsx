import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Box, Paper } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

const SavingsCalculatorPage = () => {
  const [initialAmount, setInitialAmount] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [annualInterestRate, setAnnualInterestRate] = useState('');
  const [years, setYears] = useState('');
  const [totalSavings, setTotalSavings] = useState(null);

  const calculateSavings = () => {
    const principal = parseFloat(initialAmount) || 0;
    const contribution = parseFloat(monthlyContribution) || 0;
    const interestRate = parseFloat(annualInterestRate) / 100 / 12 || 0;
    const totalMonths = (parseInt(years) || 0) * 12;

    let futureValue = principal * Math.pow(1 + interestRate, totalMonths);

    for (let i = 1; i <= totalMonths; i++) {
      futureValue += contribution * Math.pow(1 + interestRate, totalMonths - i);
    }

    setTotalSavings(futureValue.toFixed(2));
  };

  return (
    <MainCard>
      <Typography variant="h4" align="center" style={{ fontWeight: 'bold', margin: '20px 0' }}>
        Savings Calculator
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item md={6}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6">Enter your details:</Typography>
            <TextField
              fullWidth
              label="Initial Amount"
              variant="outlined"
              margin="normal"
              value={initialAmount}
              onChange={(e) => setInitialAmount(e.target.value)}
              type="number"
            />
            <TextField
              fullWidth
              label="Monthly Contribution"
              variant="outlined"
              margin="normal"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              type="number"
            />
            <TextField
              fullWidth
              label="Annual Interest Rate (%)"
              variant="outlined"
              margin="normal"
              value={annualInterestRate}
              onChange={(e) => setAnnualInterestRate(e.target.value)}
              type="number"
            />
            <TextField
              fullWidth
              label="Number of Years"
              variant="outlined"
              margin="normal"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              type="number"
            />

            <Box display="flex" justifyContent="center" marginTop={2}>
              <Button variant="contained" color="primary" onClick={calculateSavings}>
                Calculate Savings
              </Button>
            </Box>

            {totalSavings !== null && (
              <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>
                Total Savings: ${totalSavings}
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default SavingsCalculatorPage;
