const products = require('../models/Product');
const Counter = require('../models/counter'); 

// Récupérer tous les produits
const getProducts = (req, res) => {
    products.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => {
            console.error('Erreur lors de la récupération des produits:', error);
            res.status(500).json({ msg: 'Erreur interne', error: error.message });
        });
};

// Récupérer un produit par ID
const getProduct = (req, res) => {
    products.findOne({ _id: req.params.productID })
        .then(result => {
            if (!result) {
                return res.status(404).json({ msg: 'Produit non trouvé' });
            }
            res.status(200).json({ result });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération du produit:', error);
            res.status(500).json({ msg: 'Erreur interne', error: error.message });
        });
};

// Créer un nouveau produit avec ID auto-incrémenté
const createProduct = async (req, res) => {
    try {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'productId' }, 
            { $inc: { seq: 1 } }, 
            { new: true, upsert: true } 
        );

        if (!counter) {
            return res.status(500).json({ msg: 'Erreur lors de la génération de l\'ID du produit' });
        }

        const newProduct = new products({
            _id: counter.seq, 
            ...req.body       
        });

        const result = await newProduct.save();
        res.status(201).json({ result });
    } catch (error) {
        console.error('Erreur lors de la création du produit:', error);
        res.status(500).json({ msg: 'Erreur interne', error: error.message });
    }
};

// Mettre à jour un produit
const updateProduct = async (req, res) => {
    try {
        const updated = await products.findOneAndUpdate({ _id: req.params.productID }, req.body, {
        new: true,
        runValidators: true,
        });
        
        if (!updated) {
        return res.status(404).json({ msg: 'Produit non trouvé' });
        }
        
        res.status(200).json({ result: updated });
    } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
        res.status(500).json({ msg: 'Erreur interne', error: error.message });
    }
};


// Supprimer un produit
const deleteProduct = async (req, res) => {
    try {
        const result = await products.findOneAndDelete({ _id: req.params.productID });
        if (!result) {
            return res.status(404).json({ msg: 'Produit non trouvé' });
        }

        res.status(200).json({ msg: 'Produit supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        res.status(500).json({ msg: 'Erreur interne', error: error.message });
    }
};


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
