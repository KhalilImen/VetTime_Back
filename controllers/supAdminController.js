const db = require('../db');
const Users = require('../models/user')(db);
const Admins = require('../models/Admin')(db);
const supAdmins = require('../models/SupAdmin')(db);
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const addSupAdmin = async(req,res)=>{
  
   try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name, role ,phoneNumber} = req.body;
    const profilePhoto = req.file ? req.file.path : null; // Get the file path of the uploaded profile photo

    // Read the image file as binary data
    let imageBinaryData = null;
    if (profilePhoto) {
      imageBinaryData = fs.readFileSync(profilePhoto);
    }

    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use.' });
    }

    // Create a new user and store the binary data of the image in the database
    const newUser = await Users.create({ email, password, name, role,phoneNumber, Pic: imageBinaryData });

    if (role === 'supAdmin') {
      const newsupAdmin = await supAdmins.create({ userId: newUser.id });
    }

    const token = jwt.sign({ userId: newUser.id }, 'your-secret-key', { expiresIn: '1h' });
    return res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error('Error in signup:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }

};

const addAdmin = async  (req, res) => {
  try {
    const role ="Admin" ;
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, name ,SupAdminId,phoneNumber} = req.body;
    console.log('the phone number is ',phoneNumber);
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use.' });
    }
    //create a new user and a new client
    const newUser = await Users.create({ email, password, name ,role, phoneNumber});
    const newAdmin = await Admins.create({ userId: newUser.id ,SupAdminId: SupAdminId});
    const token = jwt.sign({ userId: newUser.id }, 'your-secret-key', { expiresIn: '1h' });
    return res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error('Error in signup:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }

};


const deleteAdmin = async (req, res) => {
  console.log('Received DELETE request with params:', req.params);
  const adminId = req.params.id;
  console.log('Received DELETE request for admin ID:', adminId);

  // Create a transaction
  const transaction = await db.transaction();

  try {
    // Find the admin
    const admin = await Admins.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Delete admin from both tables within the same transaction
    await admin.destroy({ transaction }); // Delete from Admin table

    const user = await Users.findByPk(admin.userId);
    if (user) {
      await user.destroy({ transaction }); // Delete from User table
    }

    await transaction.commit();

    return res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
   
    await transaction.rollback();

    console.error(error);
    return res.status(500).json({ message: 'Error deleting admin' });
  }
};
const desactivate_Admin= async (req, res) => {
  const adminId = req.params.id;

  try {
    const admin = await Admins.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

     await Users.update({ active: 0 }, { where: { id: admin.userId } });
    return res.status(200).json({ message: 'Admin desactivated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error desactivating admin' });
  }
};
const activate_Admin= async (req, res) => {
  const adminId = req.params.id;

  try {
    const admin = await Admins.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

     await Users.update({ active: 1 }, { where: { id: admin.userId } });
    return res.status(200).json({ message: 'Admin activated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error desactivating admin' });
  }
};

const updateAdmin=  async (req, res) => {
  

  const { email, password,name,phoneNumber,id} = req.body;
  console.log(email)
  console.log(id)
  console.log(name)
  console.log(phoneNumber)
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Update email 
    if (name) {
      user.name = name;
    }
    //update phone
        if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    // Update email 
    if (email) {
      user.email = email;
    }
    // Update password 
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    // Save the updated user
    await user.save();
    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating user' });
  }
};
//Update own Profile
const updateSupAdmin=  async (req, res) => {
  const supAdminId = req.params.id;
  const supAdmin = await supAdmins.findByPk(supAdminId );
  const { email, password,name } = req.body;
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use.' });
    }
  try {
    const user = await Users.findByPk(supAdminId .userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Update email 
    if (name) {
      user.name = name;
    }
    // Update email 
    if (email) {
      user.email = email;
    }

    // Update password 
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating user' });
  }
};



module.exports = { addAdmin ,deleteAdmin,desactivate_Admin,activate_Admin,updateAdmin,addSupAdmin};



