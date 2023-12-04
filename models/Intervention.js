const { DataTypes } = require('sequelize');

const Intervention = (sequelize) => {
  const  InterventionModel = sequelize.define('Intervention', {
    lieu:{
        type:DataTypes.STRING,
        allowNull:false,

    },

  type: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  refAnimal: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
    rapport: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  quantityOfAnimals: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
      AgentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Agents', 
        key: 'id', 
      },
    },
      VisitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    
    },
            Done: {
      type: DataTypes.INTEGER,
      defaultValue: 0 },
    
   
  });
  

  return InterventionModel;
};

module.exports = Intervention;
