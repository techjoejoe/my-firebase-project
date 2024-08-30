import React from 'react';
import { Container, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate('/user-login');  // Navigate to the User Login page
  };

  const handleAdminClick = () => {
    navigate('/login');  // Navigate to the Admin Login page
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Portal
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleUserClick} 
        style={{ margin: '20px' }}
      >
        I am a User
      </Button>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleAdminClick} 
        style={{ margin: '20px' }}
      >
        I am an Admin
      </Button>
    </Container>
  );
}

export default LandingPage;
