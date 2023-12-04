const { DataTypes } = require('sequelize');
const Like = (sequelize) => {
  const likeModel = sequelize.define('Like', {
    clientId:{
      type: DataTypes.INTEGER,
      allowNull: false,
     
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },


    
    liked: {
      type: DataTypes.INTEGER,
    },
  });



  return likeModel;
};


module.exports = Like;