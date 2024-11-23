import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Checkbox,
  FormControlLabel,
  Card
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { IconKey } from '@tabler/icons-react';

// Sample pages array to get permissions
const pages = [
  {
    id: 'authentication',
    title: 'Pilgrim Management',
    children: [
      { id: 'Pilgrim List', title: 'Pilgrim List' },
      { id: 'Enrollment Form', title: 'Enrollment Form' },
      { id: 'Grantor and Medical Form', title: 'Grantor and Medical Form' }
    ]
  },
  {
    id: 'financial-management',
    title: 'Financial Management',
    children: [
      { id: 'Transactions', title: 'Transactions' },
      { id: 'Savings Calculator', title: 'Savings Calculator' },
      { id: 'Reports', title: 'Reports' }
    ]
  },
  {
    id: 'admin-panel',
    title: 'Admin Panel',
    children: [
      { id: 'Roles Permission', title: 'Roles Permission' },
      { id: 'Settings', title: 'Settings' }
    ]
  }
];

const RolesAndPermissionsPage = () => {
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    phone: '',
    permissions: []
  });
  const [users, setUsers] = useState([]);

  const handlePermissionChange = (permission) => {
    setNewUser((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const addUser = () => {
    if (newUser.username && newUser.email && newUser.phone) {
      setUsers([...users, newUser]);
      setNewUser({ username: '', email: '', phone: '', permissions: [] });
    }
  };

  return (
    <MainCard>
      <Typography variant="h4" align="center" style={{ fontWeight: 'bold', margin: '20px 0' }}>
        <IconKey style={{ verticalAlign: 'middle', marginRight: '8px' }} />
        Roles and Permissions
      </Typography>

      <Typography variant="h5" align="center" style={{ margin: '30px 0' }}>
        Create New User
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item md={4}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            fullWidth
            label="Phone"
            variant="outlined"
            margin="normal"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" align="center" style={{ margin: '20px 0' }}>
        Assign Permissions
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Card style={{ padding: '16px' }}>
            <Grid container spacing={2}>
              {pages.map((group) => (
                <Grid item xs={12} key={group.id}>
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                    {group.title}
                  </Typography>
                  <Grid container spacing={1}>
                    {group.children.map((permission) => (
                      <Grid item xs={6} sm={4} md={3} key={permission.id}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={newUser.permissions.includes(permission.title)}
                              onChange={() => handlePermissionChange(permission.title)}
                            />
                          }
                          label={permission.title}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <Box mt={2} textAlign="center">
        <Button variant="contained" color="primary" onClick={addUser}>
          Create User
        </Button>
      </Box>

      <Typography variant="h6" align="center" style={{ margin: '30px 0' }}>
        Existing Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Permissions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.permissions.join(', ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

export default RolesAndPermissionsPage;
