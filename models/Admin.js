const { DataTypes } = require('sequelize');
const sequelize = require('sequelize');
const supAdmin =require('./SupAdmin');
const Admin = (sequelize) => {
  
  const AdminModel = sequelize.define('Admin', {
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
      nbClient: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
        SupAdminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
  
    },
            location: {
      type: DataTypes.GEOMETRY('POINT'), 
      allowNull: true, 
    },

  });
      AdminModel.belongsTo(sequelize.models.user, {
    as: 'user',
    foreignKey: 'userId',
  });
  return AdminModel;
};
module.exports = Admin;
