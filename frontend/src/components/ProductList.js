import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import EditProductModal from './EditProductModal';
import AddProductForm from './AddProductForm';
import useProductAction from './useProductActions';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { deleteProduct, updateProduct, addProduct } = useProductAction();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/products');
      if (response.data && Array.isArray(response.data.result)) {
        setProducts(response.data.result);
      } else {
        throw new Error('Erreur lors de la récupération des produits');
      }
    } catch (err) {
      console.error('Erreur lors du chargement des produits:', err);
      setError('Impossible de charger les produits');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (product) => {
    try {
      const newProduct = await addProduct(product);
      if (newProduct) {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        setNotification({ severity: 'success', message: 'Produit ajouté avec succès' });
        setOpenAddProduct(false);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit:', error);
      setNotification({ severity: 'error', message: 'Erreur lors de l\'ajout du produit' });
    }
  };

  const handleEdit = async (updatedProduct) => {
    try {
      const editedProduct = await updateProduct(updatedProduct);
      if (editedProduct) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === editedProduct._id ? editedProduct : product
          )
        );
        setNotification({ severity: 'success', message: 'Produit modifié avec succès' });
        setOpenEdit(false);
      }
    } catch (error) {
      console.error('Erreur lors de la modification du produit:', error);
      setNotification({ severity: 'error', message: 'Erreur lors de la modification du produit' });
    }
  };

  const handleDelete = async (product) => {
    try {
      const success = await deleteProduct(product._id);
      if (success) {
        setProducts((prevProducts) => prevProducts.filter((p) => p._id !== product._id));
        setNotification({ severity: 'success', message: 'Produit supprimé avec succès' });
        setOpenDelete(false);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
      setNotification({ severity: 'error', message: 'Erreur lors de la suppression du produit' });
    }
  };

  if (loading) {
    return <Typography>Chargement des produits...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <div
        style={{
          width: '900px',
          borderRadius: '10px',
          backgroundColor: '#fff',
          padding: '20px',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAddProduct(true)}
          style={{ marginBottom: '20px' }}
        >
          Ajouter un produit
        </Button>

        <TableContainer component={Paper} style={{ borderRadius: '8px', overflow: 'hidden' , cursor: 'pointer'}}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#1976d2' }}>
                <TableCell style={{ color: '#fff' }}>#</TableCell>
                <TableCell style={{ color: '#fff' }}>Nom</TableCell>
                <TableCell style={{ color: '#fff' }}>Type</TableCell>
                <TableCell style={{ color: '#fff' }}>Prix</TableCell>
                <TableCell style={{ color: '#fff' }}>Note</TableCell>
                <TableCell style={{ color: '#fff' }}>Garantie</TableCell>
                <TableCell style={{ color: '#fff' }}>Disponible</TableCell>
                <TableCell style={{ color: '#fff' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product._id}
                  style={{
                    backgroundColor: product._id % 2 === 0 ? '#f5f5f5' : '#fff',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      product._id % 2 === 0 ? '#f5f5f5' : '#fff')
                  }
                >
                  <TableCell>{product._id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.type}</TableCell>
                  <TableCell>{product.price}€</TableCell>
                  <TableCell>{product.rating}</TableCell>
                  <TableCell>{product.warranty_years} ans</TableCell>
                  <TableCell>{product.available ? 'Oui' : 'Non'}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setSelectedProduct(product);
                        setOpenEdit(true);
                      }}
                      variant="contained"
                      color="primary"
                      style={{ marginRight: 10 }}
                    >
                      Modifier
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedProduct(product);
                        setOpenDelete(true);
                      }}
                      variant="contained"
                      color="error"
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedProduct && (
          <>
            <DeleteConfirmationDialog
              open={openDelete}
              onClose={() => setOpenDelete(false)}
              product={selectedProduct}
              onDelete={handleDelete}
            />
            <EditProductModal
              open={openEdit}
              onClose={() => setOpenEdit(false)}
              product={selectedProduct}
              onEdit={handleEdit}
            />
          </>
        )}

        {openAddProduct && (
          <AddProductForm
            open={openAddProduct}
            onClose={() => setOpenAddProduct(false)}
            onAddProduct={handleAddProduct}
          />
        )}

        {notification && (
          <Snackbar
            open={Boolean(notification)}
            autoHideDuration={3000}
            onClose={() => setNotification(null)}
          >
            <Alert
              onClose={() => setNotification(null)}
              severity={notification.severity}
              sx={{ width: '100%' }}
            >
              {notification.message}
            </Alert>
          </Snackbar>
        )}
      </div>
    </div>
  );
};

export default ProductList;
