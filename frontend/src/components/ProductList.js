import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Typography } from '@mui/material';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // État de chargement
  const [error, setError] = useState(null);      // État d'erreur

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        if (Array.isArray(response.data.result)) {
          setProducts(response.data.result);
          console.log(response.data.result);  
        } else {
          throw new Error("Les données reçues ne sont pas un tableau");
        }
      } catch (error) {
        console.error('Erreur lors du chargement des produits', error);
        setError('Erreur lors du chargement des produits');
      } finally {
        setLoading(false);  // Désactive l'état de chargement
      }
  };


  // Gestion de l'affichage en cas de chargement ou d'erreur
  if (loading) {
    return <Typography>Chargement des produits...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell> {/* Nouvelle colonne pour l'ID */}
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Warranty</TableCell>
            <TableCell>Available</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product._id}</TableCell> {/* Affiche l'ID du produit */}
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell>{product.price} €</TableCell>
              <TableCell>{product.rating}</TableCell>
              <TableCell>{product.warranty_years} years</TableCell>
              <TableCell>{product.available ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" style={{ marginRight: 10 }}>
                  Modifier
                </Button>
                <Button variant="contained" color="error"> {/* Couleur rouge pour le bouton supprimer */}
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductList;
