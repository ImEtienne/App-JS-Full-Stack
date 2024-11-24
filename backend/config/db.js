const mongoose = require('mongoose');
const Counter = require('../models/counter');
const User = require('../models/User'); 

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connectée');

    await initializeCounter();
    await initializeAdminUser(); 
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    process.exit(1);
  }
};

const initializeCounter = async () => {
  try {
    const existingCounter = await Counter.findById('productId');
    if (!existingCounter) {
      await Counter.create({ _id: 'productId', seq: 0 });
      console.log('Compteur initialisé avec succès.');
    } else {
      console.log('Le compteur existe déjà.');
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du compteur:', error);
  }
};

// Initialiser un utilisateur admin
const initializeAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ username: 'admin' });

    if (adminExists) {
      console.log('L\'utilisateur admin existe déjà.');
      return; 
    }

    const hashedPassword = await bcrypt.hash('admin123', 10); 
    const adminUser = new User({
      username: 'admin',
      password: hashedPassword,
    });

    await adminUser.save();
    console.log('Utilisateur admin initialisé avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de l\'utilisateur admin:', error);
  }
};

module.exports = connectDB;
