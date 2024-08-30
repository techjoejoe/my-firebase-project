import React from 'react';
import { Container, Typography } from '@mui/material';

function AdminDashboard() {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Admin Dashboard
      </Typography>
      <Typography variant="body1">
        This is where the admin can manage the application.
      </Typography>
    </Container>
  );
}

export default AdminDashboard;
