const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user')(db);
const Client = require('../models/Client')(db);
const multer = require('multer');
const fs = require('fs');

// Set up Multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Create an 'uploads' folder in your project directory to store images
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file (you can use UUID or a timestamp)
    const uniqueFileName = Date.now() + '-' + file.originalname;
    cb(null, uniqueFileName);
  }
});

const upload = multer({ storage: storage });

// Signup function with image upload and storing binary data in the database
exports.signup = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name, role,phoneNumber} = req.body;
    const profilePhoto = req.file ? req.file.path : null; // Get the file path of the uploaded profile photo

    // Read the image file as binary data
    let imageBinaryData = null;
    if (profilePhoto) {
      imageBinaryData = fs.readFileSync(profilePhoto);
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ errorMessage: 'Email already in use.' });
    }

    // Create a new user and store the binary data of the image in the database
    const newUser = await User.create({ email, password, name, role,phoneNumber, Pic: imageBinaryData });
    await Client.create({ userId: newUser.id });


    const token = jwt.sign({ userId: newUser.id }, 'your-secret-key', { expiresIn: '1h' });
    return res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error('Error in signup:', error);
    return res.status(500).json({ errorMessage: 'Internal server error.' });
  }
};
