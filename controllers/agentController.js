const db = require('../db');
const sequelize = require('../db');
const { Op,QueryTypes,Sequelize,literal } = require('sequelize');

const Agents = require('../models/Agent')(db);

//Update AdminId 
const updateAgentId = async (req,res) =>{
    const { clientId, adminId }= req.params;
    

  try {
    const Agent = await Agents.findByPk(clientId);
    if (!Agent) {
      return res.status(404).json({ message: 'Aggent not found' });
    }
    Agent.AdminId= adminId;
    await Agent.save();
    return res.status(200).json({ message: 'Agent  updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating client ' });
  }
    
};
module.exports = {updateAgentId};