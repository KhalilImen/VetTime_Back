const { DataTypes } = require('sequelize');

const SupAdmin = (sequelize) => {
  const SupAdminModel = sequelize.define('SupAdmin', {
   
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'id', 
      },
    },
    
   
  });


  SupAdminModel.belongsTo(sequelize.models.user, {
    foreignKey: 'userId', 
    as: 'user',
  });

  return SupAdminModel;
};

module.exports = SupAdmin;
