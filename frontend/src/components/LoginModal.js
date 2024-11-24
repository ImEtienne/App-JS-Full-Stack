import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { login } from '../services/authService';

const LoginModal = ({ open, onClose, onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await login(credentials.username, credentials.password);
      localStorage.setItem('user', JSON.stringify(response.data));
      onLoginSuccess();
      onClose();
    } catch (err) {
      setError('Identifiants invalides');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Connexion</DialogTitle>
      <DialogContent>
        <TextField
          label="Nom d'utilisateur"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Mot de passe"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Annuler
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Connexion
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
