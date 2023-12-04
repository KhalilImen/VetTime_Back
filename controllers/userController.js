const db = require('../db');
const Admins = require('../models/Admin')(db);
const Clients = require('../models/Client')(db);
const Agents = require('../models/Agent')(db);
const supAdmins = require('../models/SupAdmin')(db);
const Users = require('../models/user')(db);
const bcrypt = require('bcrypt');
const secretKey = 'your-secret-key';
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const User = require('../models/user')(db);


// Login function
const login = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    

    const { email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return res.status(400).json({ errorMessage: "User Doesn't Exist" });

    }

    const dbPassword = existingUser.password;
    const match = await bcrypt.compare(password, dbPassword);

    if (!match) {
      return res.status(400).json({ errorMessage: "Wrong Username/Email and Password Combination!" });
    }


    // Check the user's role and get the corresponding ID from the appropriate table
    let id; 
    if (existingUser.role === 'Admin') {
      const admin = await Admins.findOne({ where: { userId: existingUser.id } });
      id = admin ? admin.id : null;
    } else if (existingUser.role === 'Client') {
      const client = await Clients.findOne({ where: { userId: existingUser.id } });
      id = client ? client.id : null;
      } else if (existingUser.role === 'supAdmin') {
      const supAdmin = await supAdmins.findOne({ where: { userId: existingUser.id } });
      id = supAdmin ? supAdmin.id : null;
    } else if (existingUser.role === 'Agent') {
      const agent = await Agents.findOne({ where: { userId: existingUser.id } });
      id = agent ? agent.id : null;
    } else {
      return res.status(400).json({ error: "Invalid Role" });
    }
    const token = jwt.sign({ userId: existingUser.id, role: existingUser.role }, secretKey, { expiresIn: '1h' });
    const userWithId = { ...existingUser.dataValues, specificId: id };
    return res.json({ token, user: userWithId });
  } catch (errorMessage) {
    console.error('Error in login:', errorMessage);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
//Compare Pswd 
const comparePswd = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id, password } = req.body;
    const existingUser = await Users.findByPk(id);

    if (!existingUser) {
      return res.status(400).json({ errorMessage: "Wrong Old Password !" });

    }

    const dbPassword = existingUser.password;
    const match = await bcrypt.compare(password, dbPassword);

    if (!match) {
      return res.status(400).json({ errorMessage: "Wrong Username/Email and Password Combination!" });
    }}catch (errorMessage) {
    console.error('Error in login:', errorMessage);
    return res.status(500).json({ message: 'Internal server error.' });}}

//Reset Password 
const ResetPswd = async (req, res) => {
  const userId = req.body.id;
  const newPassword = req.body.password;
  const OldPswd = req.body.OldPassword;
  console.log('User ID:', userId);
  console.log('New Password:', newPassword); // New password provided by the user
  const user = await Users.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
    const dbPassword = user.password;
    const match = await bcrypt.compare(OldPswd, dbPassword);
    if (!match) {
      return res.status(400).json({ errorMessage: "Wrong Old Password !" });
    }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  return res.json({ message: 'Password reset successful' });}




const ResetPswd2 = async (req, res) => {
  const useremail = req.body.email;
  const newPassword = req.body.password;
  console.log('User ID:', email);
  console.log('New Password:', newPassword);
  const user =  await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  return res.json({ message: 'Password reset successful' });}

//Forgot Password and send email 

const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: 'khalilimen2001@gmail.com', 
    pass: 'AZEEZAazeeza10121998',
  },
});

function generateRandomPassword() {
  const randomPassword = randomstring.generate({
    length: 10, 
    charset: 'alphanumeric', 
  });

  return randomPassword;
}

const ForgotPswd = async (req, res) => {
  try {
    const {email} = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }
      const user = await User.findOne({ where: { email } });
      
    // Generate a new password
    const newPassword = generateRandomPassword();

    const mailOptions = {
      from: 'khalilimen2001@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Your new password: ${newPassword}`,
    };

    await transporter.sendMail(mailOptions);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const resetResult = await ResetPswd2(email, hashedPassword);

    console.log(resetResult.message);

    console.log('Password reset email sent successfully');  
    return res.status(200).json({ message: 'Password reset email sent successfully.' });
  } catch (error) {
    console.error('Error in password reset:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};



module.exports = {login,ResetPswd,comparePswd,ForgotPswd};
