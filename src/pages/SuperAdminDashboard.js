// SuperAdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebase-config';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { Button, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

function SuperAdminDashboard() {
  const [user] = useAuthState(auth);  // Get the currently authenticated user
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if the user is not the super admin
    if (user?.email !== 'joe_o@mac.com') {
      navigate('/');  // Redirect to the homepage if not the super admin
    } else {
      const fetchPendingAdmins = async () => {
        const querySnapshot = await getDocs(collection(firestore, 'admins'));
        const pendingList = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().status === 'pending') {
            pendingList.push({ id: doc.id, ...doc.data() });
          }
        });
        setPendingAdmins(pendingList);
      };

      fetchPendingAdmins();
    }
  }, [user, navigate]);

  const handleApprove = async (adminId) => {
    const adminRef = doc(firestore, 'admins', adminId);
    await updateDoc(adminRef, { status: 'approved' });
    setPendingAdmins(pendingAdmins.filter((admin) => admin.id !== adminId));
  };

  const handleDeny = async (adminId) => {
    const adminRef = doc(firestore, 'admins', adminId);
    await updateDoc(adminRef, { status: 'denied' });
    setPendingAdmins(pendingAdmins.filter((admin) => admin.id !== adminId));
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Super Admin Dashboard
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingAdmins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.status}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleApprove(admin.id)}>Approve</Button>
                  <Button color="secondary" onClick={() => handleDeny(admin.id)}>Deny</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default SuperAdminDashboard;
