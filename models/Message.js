const { DataTypes } = require('sequelize');
const Client = require('./Client');
const Message = (sequelize) => {
  const messageModel = sequelize.define('Message', {

    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recieverId: {
      type: DataTypes.INTEGER,
    },
        message:{
      type: DataTypes.STRING,
      allowNull: false,
    },
        time:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  });



  return messageModel;
};


module.exports = Message;