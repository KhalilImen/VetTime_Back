const { DataTypes } = require('sequelize');
const Client = require('./Client');
const Visit = (sequelize) => {
  const visitModel = sequelize.define('Visit', {
    name:{
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    AdminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Admins', 
        key: 'id', 
      },
    },
        Done: {
      type: DataTypes.INTEGER,
      defaultValue: 0 },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    
    ClientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clients', // Again, make sure the table name is 'Client'
        key: 'id', // Assuming 'id' is the primary key in the 'Client' table
        allowNull: true,
      },
    },
  });

  visitModel.belongsTo(sequelize.models.Client, {
    as: 'Client',
    foreignKey: 'ClientId',
  });

  return visitModel;
};


module.exports = Visit;
