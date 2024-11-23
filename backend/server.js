const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const products_routes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connectée')) // .then((result) => app.listen(5000))
  .catch(err => console.error(err));

// Routes
app.use('/api/products', products_routes);

app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
