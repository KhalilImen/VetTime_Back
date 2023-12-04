// models/User.js
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');



const User = (sequelize) => {
  const UserModel = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    active: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
        phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true ,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'Client',
    },
    Pic: {
    type: DataTypes.BLOB,
   allowNull: true,
    }
  });
  UserModel.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

  return UserModel;
};

module.exports = User;
