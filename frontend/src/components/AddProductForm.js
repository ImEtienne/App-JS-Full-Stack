import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox, FormControlLabel } from '@mui/material';

const AddProductForm = ({ open, onClose, onAddProduct }) => {
  const [product, setProduct] = useState({
    name: '',
    type: '',
    price: '',
    rating: '',
    warranty_years: '',
    available: true, 
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    if (!product.name) return 'Le nom est requis.';
    if (!product.type) return 'Le type est requis.';
    if (!product.price || isNaN(product.price) || product.price <= 0) return 'Le prix doit être un nombre positif.';
    if (product.rating && (isNaN(product.rating) || product.rating < 1 || product.rating > 5))
      return 'La note doit être un nombre entre 1 et 5.';
    if (!product.warranty_years || isNaN(product.warranty_years) || product.warranty_years < 0)
      return 'Les années de garantie doivent être un entier positif.';
    return '';
  };

  const handleSubmit = () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Add product via parent handler
    onAddProduct(product);

    // Reset the form
    setProduct({
      name: '',
      type: '',
      price: '',
      rating: '',
      warranty_years: '',
      available: true,
    });
    setError('');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="add-product-dialog-title"
      aria-describedby="add-product-dialog-description"
    >
      <DialogTitle id="add-product-dialog-title">Ajouter un produit</DialogTitle>
      <DialogContent>
        <TextField
          label="Nom"
          name="name"
          fullWidth
          value={product.name}
          onChange={handleChange}
          margin="dense"
          required
          error={!!error && error.includes('nom')}
          helperText={error.includes('nom') ? error : ''}
        />
        <TextField
          label="Type"
          name="type"
          fullWidth
          value={product.type}
          onChange={handleChange}
          margin="dense"
          required
          error={!!error && error.includes('type')}
          helperText={error.includes('type') ? error : ''}
        />
        <TextField
          label="Prix"
          name="price"
          fullWidth
          value={product.price}
          onChange={handleChange}
          type="number"
          margin="dense"
          required
          error={!!error && error.includes('prix')}
          helperText={error.includes('prix') ? error : ''}
        />
        <TextField
          label="Note"
          name="rating"
          fullWidth
          value={product.rating}
          onChange={handleChange}
          type="number"
          inputProps={{ min: 1, max: 5 }}
          margin="dense"
          error={!!error && error.includes('note')}
          helperText={error.includes('note') ? error : ''}
        />
        <TextField
          label="Années de garantie"
          name="warranty_years"
          fullWidth
          value={product.warranty_years}
          onChange={handleChange}
          type="number"
          margin="dense"
          required
          error={!!error && error.includes('garantie')}
          helperText={error.includes('garantie') ? error : ''}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={product.available}
              onChange={handleChange}
              name="available"
              color="primary"
            />
          }
          label="Disponible"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Annuler
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductForm;
