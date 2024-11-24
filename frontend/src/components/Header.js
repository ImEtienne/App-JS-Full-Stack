import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import LoginModal from './LoginModal'; 

const Header = ({ onLoginSuccess }) => {
  const [open, setOpen] = useState(false); 

  const handleLoginSuccess = (userData) => {
    onLoginSuccess(userData); 
    setOpen(false); 
  };

  return (
    <AppBar position="static" color="primary" style={{ marginBottom: '20px' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          Gestion Product
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpen(true)}
          style={{ fontWeight: 'bold' }}
        >
          Connexion
        </Button>
        <LoginModal open={open} onClose={() => setOpen(false)} onLoginSuccess={handleLoginSuccess} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
