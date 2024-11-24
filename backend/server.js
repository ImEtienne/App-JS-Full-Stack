const express = require('express');
const cors = require('cors');
const products_routes = require('./routes/productRoutes');
const connectDB = require('./config/db'); 
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');  
  res.setHeader('Cache-Control', 'no-cache');  
  next();
});

// Connexion à MongoDB
connectDB();

// Routes
app.use('/api/products', products_routes);
app.use('/api/auth', authRoutes);


app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
