import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import useProductActions from './useProductActions';

const DeleteConfirmationDialog = ({ open, onClose, product }) => {
  const { deleteProduct } = useProductActions();

  const handleDelete = async () => {
    try {
      if (product && product._id) {
        const success = await deleteProduct(product._id);
        if (success) {
          onClose(); // Ferme la fenêtre seulement si la suppression réussit
        } else {
          alert('Erreur lors de la suppression du produit.'); // Vous pouvez remplacer par un Snackbar
        }
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Une erreur s\'est produite. Veuillez réessayer.'); // Vous pouvez remplacer par un Snackbar
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-confirmation-dialog-title"
      aria-describedby="delete-confirmation-dialog-description"
    >
      <DialogTitle id="delete-confirmation-dialog-title">Confirmer la suppression</DialogTitle>
      <DialogContent id="delete-confirmation-dialog-description">
        {product ? (
          `Êtes-vous sûr de vouloir supprimer le produit "${product.name}" ?`
        ) : (
          'Aucun produit sélectionné.'
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Annuler
        </Button>
        <Button
          onClick={handleDelete}
          color="error"
          disabled={!product || !product._id} // Désactive le bouton si aucun produit n'est sélectionné
        >
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
