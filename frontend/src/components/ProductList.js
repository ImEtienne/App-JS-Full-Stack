import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid2 } from '@mui/material';

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
      if (Array.isArray(response.data)) {  // Vérifie si les données sont un tableau
        setProducts(response.data);
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
    <Grid2 container spacing={2}>
      {products.length > 0 ? (
        products.map((product) => (
          <Grid2 item xs={12} sm={6} md={4} key={product._id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography>Type: {product.type}</Typography>
                <Typography>Prix: {product.price} €</Typography>
                <Typography>Note: {product.rating}</Typography>
                <Typography>Garantie: {product.warranty_years} an(s)</Typography>
                <Typography>Disponible: {product.available ? 'Oui' : 'Non'}</Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))
      ) : (
        <Typography>Aucun produit disponible.</Typography>  
      )}
    </Grid2>
  );
};

export default ProductList;
