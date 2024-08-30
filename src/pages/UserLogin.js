import React, { useState } from 'react';
import { TextField, Container, Typography, IconButton, Link } from '@mui/material';
import { Send as SendIcon, Lock as LockIcon } from '@mui/icons-material';
import { auth, firestore } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './AdminRegister.css';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const nextStep = () => {
    if (step === 1 && email) {
      setStep(2);
    } else if (step === 2 && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // Check if the user is a regular user
          const docRef = doc(firestore, 'users', user.uid);
          getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
              navigate('/group-code');  // Redirect to GroupCode page
            } else {
              alert("You are not authorized as a user.");
            }
          });
        })
        .catch((error) => {
          alert("Error: " + error.message);
        });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        User Login
      </Typography>
      {step === 1 && (
        <div className="email-section">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            required
            className={email ? "active" : ""}
          />
          <IconButton onClick={nextStep} className="next-button email">
            <SendIcon className={email ? "icon-paper-plane next" : "icon-paper-plane"} />
          </IconButton>
        </div>
      )}
      {step === 2 && (
        <div className="password-section">
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className={password ? "active" : ""}
          />
          <IconButton onClick={nextStep} className="next-button password">
            <LockIcon className={password ? "icon-lock next" : "icon-lock"} />
          </IconButton>
        </div>
      )}
      <Typography variant="body2" align="center" marginTop={2}>
        Don't have an account?{' '}
        <Link href="/user-register">
          Register here
        </Link>
      </Typography>
    </Container>
  );
}

export default UserLogin;
