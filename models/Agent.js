const { DataTypes } = require('sequelize');

const Agent = (sequelize) => {
  const AgentModel = sequelize.define('Agent', {
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },

        userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'id', 
      },
    },
            AdminId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
        location: {
      type: DataTypes.GEOMETRY('POINT'), 
      allowNull: true, 
    },

  });

    AgentModel.belongsTo(sequelize.models.user, {
    as: 'user',
    foreignKey: 'userId',
  });
     AgentModel.belongsTo(sequelize.models.Admin, {
    as: 'Admin',
    foreignKey: 'AdminId',
  });

  return AgentModel;
};

module.exports = Agent;
