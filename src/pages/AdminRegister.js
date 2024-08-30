import React, { useState } from 'react';
import { TextField, Container, Typography, IconButton } from '@mui/material';
import { Send as SendIcon, Lock as LockIcon, LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { auth, firestore } from '../firebase-config';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './AdminRegister.css';

function AdminRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
  };

  const nextStep = () => {
    if (step === 1 && email) {
      setStep(2);
    } else if (step === 2 && password) {
      setStep(3);
    } else if (step === 3 && repeatPassword === password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // Store admin data in Firestore
          setDoc(doc(firestore, 'admins', user.uid), {
            email: user.email,
            role: 'admin',
            status: 'pending', // Initially set status to pending
          }).then(() => {
            sendEmailVerification(auth.currentUser).then(() => {
              alert("Registration successful! Please verify your email.");
              navigate('/login');  // Redirect to admin login
            });
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
        Admin Register
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
      {step === 3 && (
        <div className="repeat-password-section">
          <TextField
            label="Repeat Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
            required
            className={repeatPassword ? "active" : ""}
          />
          <IconButton onClick={nextStep} className="next-button repeat-password">
            <LockOutlinedIcon className={repeatPassword ? "icon-repeat-lock next" : "icon-repeat-lock"} />
          </IconButton>
        </div>
      )}
    </Container>
  );
}

export default AdminRegister;
