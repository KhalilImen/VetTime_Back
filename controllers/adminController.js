const db = require('../db');
const Users = require('../models/user')(db);
const Admins = require('../models/Admin')(db);
const Agents = require('../models/Agent')(db);
const Clients = require('../models/Client')(db);
const Interventions = require('../models/Intervention')(db);
const Recettes = require('../models/recette')(db);
const Visits = require('../models/Visit')(db);
const Messages = require('../models/Message');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const {Sequelize} =require('sequelize');

const bcrypt = require('bcrypt');
const recette = require('../models/recette');
const userSockets = new Map();
//Add Agent 
const addAgent = async  (req, res) => {
  
  try {
    const role ="Agent" ;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, name , AdminId,phoneNumber} = req.body;
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use.' });
    }
    const newUser = await Users.create({ email, password, name ,role,phoneNumber});
    const newAgent = await Agents.create({ userId: newUser.id ,AdminId: AdminId});
    const token = jwt.sign({ userId: newUser.id }, 'your-secret-key', { expiresIn: '1h' });
    return res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error('Error in signup:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }

};
///delete Agent
const deleteAgent = async (req, res) => {
  const agentId = req.params.id;
  const transaction = await db.transaction();
  try {
    const agent = await Agents.findByPk(agentId);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    await agent.destroy({ transaction }); 
    const user = await Users.findByPk(agent.userId);
    if (user) {
      await user.destroy({ transaction });
    }
    await transaction.commit();
    return res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res.status(500).json({ message: 'Error deleting agent' });
  }
};

//desactivate agent
const desactivate_Agent= async (req, res) => {
  const agentId = req.params.id;

  try {
    const agent = await Agents.findByPk(agentId);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

     await Users.update({ active: 0 }, { where: { id: agent.userId } });
    return res.status(200).json({ message: 'Agent desactivated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error desactivating agent' });
  }
};

//Activate agent
const activate_Agent= async (req, res) => {
  const agentId = req.params.id;

  try {
    const agent = await Agents.findByPk(agentId);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

     await Users.update({ active: 1 }, { where: { id: agent.userId } });
    return res.status(200).json({ message: 'Agent activated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error desactivating agent' });
  }
};

//Update agent
const updateAgent=  async (req, res) => {
  const { email, password,name,phoneNumber,id} = req.body;
  console.log(email)
  console.log(id)
  console.log(name)
  console.log(phoneNumber)
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Update email 
    if (name) {
      user.name = name;
    }
    //update phone
        if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    // Update email 
    if (email) {
      user.email = email;
    }
    // Update password 
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    // Save the updated user
    await user.save();
    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating user' });
  }
};

//add number of client 



//create a visit 
const CreateVisit =  async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { AdminId , ClientId ,Date,Name} = req.body;
    if(Date ===''){
       return res.status(400).json({ errorMessage: "Enter Date!" });
    }
        const user = await Users.findByPk(ClientId); // Access the query parameter 'id'
        const client = await Clients.findOne({ UserId: ClientId }); 
        console.log(client)

    if (!client) {
      return res.status(404).json({ message: 'Client not found or does not match the user.' });
    }
    const newVisit = await Visits.create({ AdminId: AdminId, ClientId:client.id ,date: Date ,name:Name});
    return res.status(201).json({ message: 'Visit created successfully.', visit: newVisit ,client:user });
  } catch (error) {
    console.error('Error in creating visit:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
//Delete visit 
const deleteVisit = async (req, res) => {
  console.log('Received DELETE request with params:', req.params);
  const VisitId = req.params.id;
  console.log('Received DELETE request for visit ID:', VisitId);

  try {
    // Find the visit
    const visit = await Visits.findByPk(VisitId);
    if (!visit) {
      return res.status(404).json({ message: 'Visit not found' });
    }

    // Find the associated intervention
    const intervention = await Interventions.findOne({ where: { VisitId:VisitId } });

    if (intervention) {
      // Delete the intervention first
      await intervention.destroy();
    }

    // Delete the visit
    await visit.destroy();

    return res.status(204).json();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting Visit' });
  }
};

//Edit visit
const updateVisit=  async (req, res) => {
  
  const { name,date,id} = req.body;
  console.log(id)

  try {
    const visit = await Visits.findByPk(id);
    if (!visit) {
      return res.status(404).json({ message: 'Visit not found' });
    }
    // Update email 
    if (name) {
      visit.name = name;
    }
    //update phone
        if (date) {
      visit.date = date;
    }

    // Save the updated visit
    await visit.save();
    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating user' });
  }
};
const DoneVisit= async (req, res) => {
  const id= req.params.id;

  try {
    const visit = await Visits.findByPk(id);
    if (!visit) {
      return res.status(404).json({ message: 'Admin not found' });
    }

     await Visits.update({ Done: 0 }, { where: { id: visit.id } });
    return res.status(200).json({ message: 'visit done' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error visit done' });
  }
};
const UnDonevisit= async (req, res) => {
  const id= req.params.id;
  try {
    const visit = await Visits.findByPk(id);
    if (!visit) {
      return res.status(404).json({ message: 'Admin not found' });
    }

     await Visits.update({ Done: 1}, { where: { id: visit.id } });
    return res.status(200).json({ message: 'visit done' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error visit done' });
  }
};
//Create intervention 
const CreateIntervention = async(req,res )=>{
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { lieu, type, refAnimal, quantityOfAnimals ,rapport,AgentId, VisitId} = req.body;

    const existingVisit = await Visits.findByPk(VisitId);
    if (!existingVisit) {
      return res.status(404).json({ message: 'Visit not found.' });
    }
        const existingAgent = await Agents.findByPk(AgentId);
    if (!existingAgent) {
      return res.status(404).json({ message: 'Agent not found.' });
    }

    // Create the intervention
    const newIntervention = await Interventions.create({
      lieu,
      type,
      refAnimal,
      quantityOfAnimals,
      rapport,
      AgentId,
      VisitId,
    });

    return res.status(201).json({ message: 'Intervention created successfully.', intervention: newIntervention });
  } catch (error) {
    console.error('Error in creating intervention:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

//create recette 
const CreateRecette = async (req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const {depense, revenu , avance ,interId}= req.body;


    const newRecette = await Recettes.create({
      depense,
      revenu,
       avance,
      interId,
    });
        if(depense ==='' || revenu ==='' || avance ===''){
       return res.status(400).json({ errorMessage: "Enter All Fields!" });
    }
    return res.status(201).json({ message: 'recette created successfully.', newRecette });

}catch (error) {
    console.error('Error in creating recette:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
//Update recette 
const updateRecette=  async (req, res) => {
  
  const {depense, revenu , avance ,interId}= req.body;
  try {
    const visit = await Recettes.findByPk(interId);
    if (!visit) {
      return res.status(404).json({ message: 'Visit not found' });
    }
    // Update email 
    if (depense) {
      visit.depense = depense;
    }
    //update phone
        if (revenu) {
      visit.revenu = revenu;
    }
      if (avance) {
      visit.avance = avance;
    }

    // Save the updated visit
    await visit.save();
    return res.status(200).json({ message: 'Recette updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating Recette' });
  }
};
//existence of  recette 
const ExistRecette=  async (req, res) => {
  
  const interId= req.params.interId;
  try {
    const visit = await Recettes.findByPk(interId);
    if (!visit) {
      return res.status(200).json({ });
    }else {return res.status(200).json({ visit });}
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating user' });
  }
};

//Message sender
const handleSocketConnection = (socket) => {
  socket.on('login', (userId) => {
    // Store the user's socket ID based on their user ID
    userSockets.set(userId, socket.id);
  });

  socket.on('disconnect', () => {
    // Remove the user's socket ID from the data structure on disconnection
    for (const [userId, socketId] of userSockets.entries()) {
      if (socketId === socket.id) {
        userSockets.delete(userId);
        break;
      }
    }
  });

  socket.on('send-message', (data) => {
    const { recipientAgentId, message } = data;

    // Get the recipient agent's socket ID from the data structure
    const agentSocketId = userSockets.get(recipientAgentId);

    if (agentSocketId) {
      // Send the message to the specific agent
      io.to(agentSocketId).emit('new-message', { sender: 'Admin', message });
    } else {
      // Handle the case when the agent is not online or does not exist
      console.log(`Agent with ID ${recipientAgentId} is not online.`);
    }
  });
};


//Define location admin
const updateLocation = async (req, res) => {
  
  const { id,latitude, longitude } = req.body;
  console.log("THIS IS THE ID IN UPDATE LOCATION !!!",id)
  console.log("THIS IS THE ID IN UPDATE LOCATION !!!",latitude)
  console.log("THIS IS THE ID IN UPDATE LOCATION !!!",longitude)

  try {
    // Find the agent based on the provided agentId
    const admin = await Admins.findByPk(id);
    if (!admin) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    // Update the agent's location in the database
    const locationPoint = Sequelize.literal(`ST_GeomFromText('POINT(${longitude} ${latitude})')`);

    // Update the client's location attribute
    await admin.update({
      location: locationPoint,
    });

    return res.status(200).json({ message: 'Admin location updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating agent location' });
  }
};




//Define location admin 
const updateLocationAdmin = async (req, res) => {
  const adminId = req.params.adminId;
  const { latitude, longitude } = req.body;

  try {
    // Find the admin based on the provided adminId
    const admin = await Admins.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const locationPoint = Sequelize.literal(`ST_GeomFromText('POINT(${longitude} ${latitude})')`);

    // Update the admin's location attribute
    await admin.update({
      location: locationPoint,
    });

    return res.status(200).json({ message: 'Admin location updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating admin location' });
  }
};

//delete Client
const deleteClient = async (req, res) => {
  console.log('Received DELETE request with params:', req.params);
  const clientId = req.params.id;
  console.log('Received DELETE request for client ID:', clientId);

  // Create a transaction
  const transaction = await db.transaction();

  try {
    // Find the client
    const client = await Clients.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Delete client from both tables within the same transaction
    await client.destroy({ transaction }); // Delete from Admin table

    const user = await Users.findByPk(client.userId);
    if (user) {
      await user.destroy({ transaction }); // Delete from User table
    }

    await transaction.commit();

    return res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
   

    await transaction.rollback();

    console.error(error);
    return res.status(500).json({ message: 'Error deleting Client' });
  }
};

//Edit client 
const updateClient=  async (req, res) => {
  
  const { email, password,name,phoneNumber,id} = req.body;
  console.log(email)
  console.log(id)
  console.log(name)
  console.log(phoneNumber)
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Update email 
    if (name) {
      user.name = name;
    }
    //update phone
        if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    // Update email 
    if (email) {
      user.email = email;
    }
    // Update password 
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    // Save the updated user
    await user.save();
    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating user' });
  }
};
const addNbClient = async (req, res) => {
  const AdminId = req.params.AdminId;

  try {   
    const Admin = await Admins.findByPk(AdminId);
    if (!Admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
     const updateNbClient = Admin.nbClient + 1;
    // Update the client's location attribute
    await Admin .update({
      nbClient: updateNbClient ,
    });
    return res.status(200).json({ message: 'number of Clients updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating number of Clients' });
  }
};
//add Client
const addClient = async  (req, res) => {
  try {
    const role ="Client" ;
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, name ,SupAdminId,phoneNumber} = req.body;
    console.log('the phone number is ',phoneNumber);
    console.log('the phone number is ',SupAdminId);
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use.' });
    }
    //create a new user and a new client
    const newUser = await Users.create({ email, password, name ,role, phoneNumber});
    const newAdmin = await Clients.create({ userId: newUser.id ,AdminId: SupAdminId});

        const Admin = await Admins.findByPk(SupAdminId);
    if (!Admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
     const updateNbClient = Admin.nbClient + 1;
    await Admin.update({
      nbClient: updateNbClient ,
    });
    const token = jwt.sign({ userId: newUser.id }, 'your-secret-key', { expiresIn: '1h' });
    return res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error('Error in signup:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }

};


//add messsage
const addMessage = async  (req, res) => {
  try {
    const { senderId,recieverId,message, time} = req.body;
    const newMessage = await Messages.create({
      senderId,
      recieverId,
      message,
      time,
    });

    return res.status(201).json(newMessage);
 

  } catch (error) {
    console.error('Error in add message:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }

};
module.exports = { addAgent, deleteAgent,desactivate_Agent,activate_Agent,updateAgent,
  CreateVisit,CreateIntervention,CreateRecette,deleteVisit,updateVisit,DoneVisit,UnDonevisit,updateRecette,ExistRecette,
  handleSocketConnection,updateLocation,updateLocationAdmin,
  addNbClient,deleteClient,updateClient,addClient,addMessage};

