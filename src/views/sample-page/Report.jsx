import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

const ReportPage = () => {
  const [reportType, setReportType] = useState('savings');
  const [dateRange, setDateRange] = useState('current-month');
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch or generate reports for the current month when the component mounts
    generateReport();
  }, []);

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  const generateReport = () => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    // Mock data for the current month
    const mockReports = [
      { id: 1, date: `${currentMonth} 01`, type: 'Savings', amount: 1000 },
      { id: 2, date: `${currentMonth} 15`, type: 'Deposit', amount: 500 },
      { id: 3, date: `${currentMonth} 20`, type: 'Withdrawal', amount: 300 }
    ];

    setReports(mockReports);
  };

  return (
    <MainCard>
      <Typography variant="h4" align="center" style={{ fontWeight: 'bold', margin: '20px 0' }}>
        Reports
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item md={6}>
          <TextField
            fullWidth
            select
            label="Report Type"
            value={reportType}
            onChange={handleReportTypeChange}
            variant="outlined"
            margin="normal"
          >
            <MenuItem value="savings">Savings Report</MenuItem>
            <MenuItem value="transactions">Transaction History</MenuItem>
            <MenuItem value="withdrawals">Withdrawals</MenuItem>
          </TextField>
        </Grid>

        <Grid item md={6}>
          <TextField
            fullWidth
            select
            label="Date Range"
            value={dateRange}
            onChange={handleDateRangeChange}
            variant="outlined"
            margin="normal"
          >
            <MenuItem value="current-month">Current Month</MenuItem>
            <MenuItem value="last-month">Last Month</MenuItem>
            <MenuItem value="last-3-months">Last 3 Months</MenuItem>
            <MenuItem value="last-6-months">Last 6 Months</MenuItem>
            <MenuItem value="custom">Custom Range</MenuItem>
          </TextField>
        </Grid>

        <Grid item md={12}>
          <Button variant="contained" color="primary" onClick={generateReport}>
            Generate Report
          </Button>
        </Grid>

        {reports.length > 0 && (
          <Grid item md={12}>
            <Typography variant="h6" align="center" style={{ margin: '20px 0', fontWeight: 'bold' }}>
              Report Results for {dateRange === 'current-month' ? 'Current Month' : dateRange}
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>${report.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </Grid>

      <Box mt={4} style={{ textAlign: 'center' }}>
        <Button variant="contained" color="secondary" style={{ marginRight: '10px' }}>
          Export as CSV
        </Button>
        <Button variant="contained" color="secondary">
          Export as PDF
        </Button>
      </Box>
    </MainCard>
  );
};

export default ReportPage;
