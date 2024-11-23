const products = require('../models/Product');

const getProducts = ((req, res) => {
    //res.json(products)
    products.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getProduct = ((req, res) => {
    /*const id = Number(req.params.productID)
    const product = products.find(product => product.id === id)

        if (!product) {
        return res.status(404).send('Product not found')
    }
    res.json(product)*/
    products.findOne({ _id: req.params.productID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Product not found'}))
    
})

const createProduct = ((req, res) => {
    /*const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        type: req.body.string,
        price: req.body.price,
        rating: req.body.rating,
        warranty_years: req.body.rating,
        available: req.body.available
    }
    products.push(newProduct)
    res.status(201).json(newProduct)*/
    products.create(req.body)
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({msg:  error }))
})

const updateProduct = ((req, res) => {
    /*const id = Number(req.params.productID)
    const index = products.findIndex(product => product.id === id)
    const updatedProduct = {
        id: products[index].id,
        name: req.body.name,
        type: req.body.string,
        price: req.body.price,
        rating: req.body.rating,
        warranty_years: req.body.rating,
        available: req.body.available
    }

    products[index] = updatedProduct
    res.status(200).json('Product updated')*/
    products.findOneAndDelete({ _id: req.params.productID })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Product not found' }))
})

const deleteProduct = ((req, res) => {
    /*const id = Number(req.params.productID)
    const index = products.findIndex(product => product.id === id)
    products.splice(index,1)
    res.status(200).json('Product deleted')*/
    products.findOneAndDelete({ _id: req.params.productID })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Product not found' }))
})

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}

