import { useState } from 'react';
import axios from 'axios';

const useProductAction = () => {
  const [notification, setNotification] = useState(null);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      setNotification({ message: 'Produit supprimé avec succès', severity: 'success' });
      return true;
    } catch (error) {
      setNotification({ message: 'Erreur lors de la suppression', severity: 'error' });
      return false;
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/products/${updatedProduct._id}`, updatedProduct);
      setNotification({ message: 'Produit modifié avec succès', severity: 'success' });
      return response.data.result;
    } catch (error) {
      setNotification({ message: 'Erreur lors de la modification', severity: 'error' });
      return null;
    }
  };

  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post('http://localhost:5000/api/products', newProduct);
      setNotification({ message: 'Produit ajouté avec succès', severity: 'success' });
      return response.data.result;
    } catch (error) {
      setNotification({ message: 'Erreur lors de l\'ajout du produit', severity: 'error' });
      return null;
    }
  };

  return { deleteProduct, updateProduct, addProduct, notification, setNotification };
};

export default useProductAction;
