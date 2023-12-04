const { DataTypes } = require('sequelize');

const recette = (sequelize) => {
  const  recetteModel = sequelize.define('recette', {
    depense : {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  
  revenu: {
    type: DataTypes.FLOAT, 
    allowNull: false,
  },
  avance: {
    type: DataTypes.FLOAT, 
    allowNull: true,
  },
  interId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'interventions', 
        key: 'id', 
      },
    },
  });

  recetteModel.belongsTo(sequelize.models.Intervention, {
    as: 'Intervention',
    foreignKey: 'interId',
  });

  return recetteModel;
};

module.exports = recette;
