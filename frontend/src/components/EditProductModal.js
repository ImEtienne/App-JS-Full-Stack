import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import useProductActions from './useProductActions';

const EditProductModal = ({ open, onClose, product }) => {
  const { updateProduct } = useProductActions();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    type: '',
    rating: '',
    warranty_years: '',
    available: true,
  });

  // Synchronise les données du produit sélectionné avec le formulaire lorsque le modal s'ouvre
  useEffect(() => {
    if (product) {
      setFormData({ ...product });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleUpdate = async () => {
    try {
      const success = await updateProduct(formData);
      if (success) {
        onClose(); // Ferme le dialog après mise à jour réussie
      } else {
        alert('Erreur lors de la mise à jour du produit.'); // Vous pouvez remplacer par un composant Snackbar
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit:', error);
      alert('Une erreur s\'est produite. Veuillez réessayer.'); // Vous pouvez remplacer par un composant Snackbar
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="edit-product-dialog-title"
      aria-describedby="edit-product-dialog-description"
    >
      <DialogTitle id="edit-product-dialog-title">Modifier le produit</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Nom"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />
        <TextField
          name="price"
          label="Prix"
          type="number"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />
        <TextField
          name="type"
          label="Type"
          value={formData.type}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="rating"
          label="Note"
          type="number"
          value={formData.rating}
          onChange={handleChange}
          fullWidth
          margin="dense"
          inputProps={{ min: 1, max: 5 }}
        />
        <TextField
          name="warranty_years"
          label="Années de garantie"
          type="number"
          value={formData.warranty_years}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Annuler
        </Button>
        <Button onClick={handleUpdate} color="primary" disabled={!formData.name || !formData.price}>
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductModal;
