import React from 'react';
import { Container, Typography } from '@mui/material';

function GroupCode() {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the GroupCode Page
      </Typography>
      <Typography variant="body1">
        This is where users will enter their group code.
      </Typography>
    </Container>
  );
}

export default GroupCode;
