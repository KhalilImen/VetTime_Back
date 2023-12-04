const { DataTypes } = require('sequelize');
const sequelize = require('sequelize');
const Admin = require('./Admin');
const Client = (sequelize) => {
  const ClientModel = sequelize.define('Client', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'id', 
      },
    },
            location: {
      type: DataTypes.GEOMETRY('POINT'), 
      allowNull: true, 
    },
        AdminId: {
      type: DataTypes.INTEGER,
      
      references: {
        model: 'Admins', 
        key: 'id', 
        allowNull: true,
      },
    },

  });

  //  association with User 
  ClientModel.belongsTo(sequelize.models.user, {
    as: 'user',
    foreignKey: 'userId',
  });
    ClientModel.belongsTo(sequelize.models.Admin, {
    as: 'Admin',
    foreignKey: 'AdminId',
  });
  

  
  return ClientModel;
};
module.exports = Client;
