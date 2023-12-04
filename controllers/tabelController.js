const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op,QueryTypes,Sequelize,literal } = require('sequelize');
const { validationResult } = require('express-validator');
const Users = require('../models/user')(db);
const Admins = require('../models/Admin')(db);
const Agents = require('../models/Agent')(db);
const Clients = require('../models/Client')(db);
const Interventions = require('../models/Intervention')(db);
const Recettes = require('../models/recette')(db);
const Visits = require('../models/Visit')(db);
//const Interventions = require('../models/Intervention')(db);
const moment = require('moment');

/**************** Admin table  *****************/

const showAllAdmins  =async(req,res )=>{
    try {
    const admins = await Admins.findAll({
      include: {
        model: Users, 
        as: 'user', 
      },
    });

    return res.json({ admins });   } catch (error) {
    console.error('Error in searching admins:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}; 
//Show admin rating 
const showAdminRating = async (req,res)=> {
try{
    const ratingAdmin= await Admins.findAll();
        return res.json({ ratingAdmin });
}catch(error){
    console.error('Error in searching rating:', error);
    return res.status(500).json({ message: 'Internal server error.' });
}
};

//Sort Admin By rating
const SortAdminByRating = async (req, res) => {
  try {
    const sortedAdmins = await Admins.findAll({
      order: [['rating', 'DESC']],
      include: [
        {
          model: Users,
          as: 'user',
        
        },
      ],
    });
    if (sortedAdmins.length === 0) {
      return res.status(404).json({ message: 'No admins found' });
    }
    return res.status(200).json(sortedAdmins);
  } catch (error) {
    console.error('Error in searching rating:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


//Sort Admin by it's number of clients
const SortByNbClient =  async(req,res )=>{
  try {
    const sortedAdmins = await Admins.findAll({
      order: [['nbClient', 'DESC']],
      include: [
        {
          model: Users,
          as: 'user',
        },
      ],
    });
    if (sortedAdmins.length === 0) {
      return res.status(404).json({ message: 'No admins found' });
    }
    return res.status(200).json(sortedAdmins);
  } catch (error) {
    console.error('Error in searching number of client:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

//Search Admin By Name 
const SearchAdminByName =async(req,res )=>{
    try {
    const { name } = req.body; 

    const users = await Users.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
        role: 'Admin',
      },
    });

    return res.json({ users });
  } catch (error) {
    console.error('Error in searching admins:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
//sort admin by alphabitic order

const sortAdminsByAlphabiticOrder = async (req, res) => {
  try {
    const admins = await Admins.findAll({
      include: [{ model: Users, as: 'user' }],
      order: [[{ model: Users, as: 'user' }, 'name', 'ASC']], 
    });

    const sortedAdmins = admins.map(admin => ({
      id: admin.id,
      rating: admin.rating,
      nbClient: admin.nbClient,
      userId: admin.userId,
      SupAdminId: admin.SupAdminId,
      location: admin.location,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
      user: {
        id: admin.user.id,
        name: admin.user.name,
        email: admin.user.email,
        password: admin.user.password,
        active: admin.user.active,
        phoneNumber: admin.user.phoneNumber,
        role: admin.user.role,
        Pic: admin.user.Pic,
        createdAt: admin.user.createdAt,
        updatedAt: admin.user.updatedAt,
      },
    }));

    return res.status(200).json({ admins: sortedAdmins });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching and sorting admins' });
  }
};

/**************** Agent table  *****************/


//show all Agents
const showAllAgents = async (req, res) => {
  try {
    const { adminId } = req.query; // Access the query parameter 'adminId'
    console.log("Received adminId:", adminId);
    let whereCondition = {};

    if (adminId) {
      whereCondition = { '$Agent.AdminId$': adminId }; // Condition to show clients with a specific AdminId
    }

    const Agent = await Agents.findAll({
      where: whereCondition,
      include: [
        {
          model: Users,
          as: 'user',
        },
      ],
    });

    return res.json({ Agent });
  } catch (error) {
    console.error('Error in showing Client:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


/**************** Client table  *****************/


//show all clients
const showAllClients = async (req, res) => {
  try {
    const { adminId } = req.query; // Access the query parameter 'adminId'
    console.log("Received adminId:", adminId);
    let whereCondition = {};

    if (adminId) {
      whereCondition = { '$Client.AdminId$': adminId }; // Condition to show clients with a specific AdminId
    }

    const clients = await Clients.findAll({
      where: whereCondition,
      include: [
        {
          model: Users,
          as: 'user',
        },
      ],
    });

    return res.json({ clients });
  } catch (error) {
    console.error('Error in showing Client:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


//search By name 
const SearchClientByName = async (req, res) => {
  try {
    const { name } = req.body;
    const { adminId } = req.query;

    let whereCondition = {
      name: {
        [Op.like]: `%${name}%`,
      },
      role: 'Client',
    }; // Default condition to show clients with matching name and role 'Client'

    if (adminId) {
      whereCondition['$Admin.id$'] = adminId; // Condition to show clients with a specific AdminId
    }

    const users = await Users.findAll({
      where: whereCondition,
      include: [
        {
          model: Clients,
          as: 'Client',
          include: [
            {
              model: Admins,
              as: 'Admin',
            },
          ],
        },
      ],
    });

    return res.json({ users });
  } catch (error) {
    console.error('Error in searching clients:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


//Show the clients that will have Visit this week 
const ThisWeekClient = async (req, res) => {
  try {
    const { adminId } = req.query;
    const startOfWeek = moment().startOf('week').toDate();
    const endOfWeek = moment().endOf('week').toDate();

    let whereCondition = {
      date: {
        [Op.between]: [startOfWeek, endOfWeek],
      },
    };

    if (adminId) {
      whereCondition['$Client.AdminId$'] = adminId; 
    }

    const visitsThisWeek = await Visits.findAll({
      where: whereCondition,
      include: [
        {
          model: Clients,
          as: 'Client',
          include: [
            {
              model: Users,
              as: 'user',
              attributes: ['id', 'name', 'email', 'password', 'phoneNumber', 'active', 'role', 'Pic', 'createdAt', 'updatedAt'],
            },
          ],
        },
      ],
    });

    if (visitsThisWeek.length === 0) {
      return res.status(404).json({ clients: [] });
    }

    // Modify the mapping to format the response as desired
    const formattedResponse = visitsThisWeek.map((visit) => ({
      id: visit.id,
      userId: visit.Client.user.id,
      location: visit.location,
      AdminId: visit.AdminId,
      createdAt: visit.createdAt,
      updatedAt: visit.updatedAt,
      user: {
        id: visit.Client.user.id,
        name: visit.Client.user.name,
        email: visit.Client.user.email,
        password: visit.Client.user.password,
        active: visit.Client.user.active,
        phoneNumber: visit.Client.user.phoneNumber,
        role: visit.Client.user.role,
        Pic: visit.Client.user.Pic,
        createdAt: visit.Client.user.createdAt,
        updatedAt: visit.Client.user.updatedAt,
      },
    }));

    return res.status(200).json({ clients: formattedResponse });
  } catch (error) {
    console.error('Error in fetching clients visited this week:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};



//sort client by alphabitic order 
const sortClientsByAlphabiticOrder= async (req, res) => {
  try {
    const clients = await Clients.findAll({
      include: [{ model: Users, as: 'user' }],
      order: [[{ model: Users, as: 'user' }, 'name', 'ASC']], 
    });

    const sortedAdmins = clients.map(admin => ({
      id: admin.id,
      rating: admin.rating,
      nbClient: admin.nbClient,
      userId: admin.userId,
      SupAdminId: admin.SupAdminId,
      location: admin.location,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
      user: {
        id: admin.user.id,
        name: admin.user.name,
        email: admin.user.email,
        password: admin.user.password,
        active: admin.user.active,
        phoneNumber: admin.user.phoneNumber,
        role: admin.user.role,
        Pic: admin.user.Pic,
        createdAt: admin.user.createdAt,
        updatedAt: admin.user.updatedAt,
      },
    }));

    return res.status(200).json({ admins: sortedAdmins });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching and sorting admins' });
  }
};

/**************** Visit table  *****************/
 //show all visits

const showAllVisits = async (req, res) => {
  try {
    const { adminId } = req.query; 

    let whereCondition = {};

    if (adminId) {
      whereCondition = { '$Visit.AdminId$': adminId }; 
    }

    const allVisits = await Visits.findAll({
      where: whereCondition 
    });

    return res.json({ allVisits });
  } catch (error) {
    console.error('Error in showing Client:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
//show all visits for a specific client 

const showClientVisits = async (req, res) => {
  try {
    const { AdminId , ClientId } = req.query;
    const user = await Users.findByPk(ClientId);
    const client = await Clients.findOne({ UserId: ClientId }); 
    let whereCondition = {};
    if (AdminId) {
      whereCondition = { '$Visit.AdminId$': AdminId, '$Visit.ClientId$': client.id };
    }

    const allVisits = await Visits.findAll({
      where: whereCondition 
    });



    console.log(allVisits)

    return res.json({ allVisits });
    
  } catch (error) {
    console.error('Error in showing Client:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

//Show the clients that will have Visit this week 
const ThisWeekClientVisit = async (req, res) =>  {
  try {
    const { adminId,clientId } = req.query;
    const startOfWeek =moment().isoWeekday(1).startOf('day').toDate();
    const endOfWeek = moment().isoWeekday(7).endOf('day').toDate();
    const client = await Clients.findOne({ UserId: clientId });
    let whereCondition = {};
   
      whereCondition = { '$Visit.AdminId$': adminId, '$Visit.ClientId$': client.id,'$Visit.date$': {[Op.between]: [startOfWeek, endOfWeek]}};
  

   
    const allVisits = await Visits.findAll({
      where: whereCondition 
    });
    console.log(allVisits)
    return res.json({ allVisits });
  } catch (error) {
    console.error('Error in fetching clients visited this week:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
//Show the clients that will have Visit this month 
const ThisMonthClientVisit = async (req, res) => {
  try {
    const { adminId,clientId } = req.query;
    const startOfWeek = moment().startOf('month').toDate();
    const endOfWeek = moment().endOf('month').toDate();
    const client = await Clients.findOne({ UserId: clientId });
    let whereCondition = {};
   
      whereCondition = { '$Visit.AdminId$': adminId, '$Visit.ClientId$': client.id,'$Visit.date$': {[Op.between]: [startOfWeek, endOfWeek]}};
  

   
    const allVisits = await Visits.findAll({
      where: whereCondition 
    });
    console.log(allVisits)
    return res.json({ allVisits });
  } catch (error) {
    console.error('Error in fetching clients visited this week:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
//Show the clients that will have Visit this month 
const ThisYearClientVisit = async (req, res) => {
  try {
    const { adminId,clientId } = req.query;
    const startOfWeek = moment().startOf('year').toDate();
    const endOfWeek = moment().endOf('year').toDate();
    const client = await Clients.findOne({ UserId: clientId });
    let whereCondition = {};
   
      whereCondition = { '$Visit.AdminId$': adminId, '$Visit.ClientId$': client.id,'$Visit.date$': {[Op.between]: [startOfWeek, endOfWeek]}};
  

   
    const allVisits = await Visits.findAll({
      where: whereCondition 
    });
    console.log(allVisits)
    return res.json({ allVisits });
  } catch (error) {
    console.error('Error in fetching clients visited this week:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
//This week visits
const ThisWeekVisit = async (req, res) => {
  try {
    const { adminId } = req.query;
    const startOfWeek = moment().startOf('week').toDate();
    const endOfWeek = moment().endOf('week').toDate();

    let whereCondition = {
      date: {
        [Op.between]: [startOfWeek, endOfWeek],
      },
    };

    if (adminId) {
      whereCondition['$Visit.AdminId$'] = adminId; // Condition to show clients with a specific AdminId
    }

    const visitsThisWeek = await Visits.findAll({
      where: whereCondition,
      include: [
        {
          model: Clients,
          as: 'Client',
          attributes: ['userId'],
          include: [
            {
              model: Users,
              as: 'user',
              attributes: ['name', 'email'],
            },
            {
              model: Admins,
              as: 'Admin',
            },
          ],
        },
      ],
    });

    if (visitsThisWeek.length === 0) {
      return res.status(404).json({ message: 'No clients visited this week' });
    }

    const VisitDetails = visitsThisWeek.map((visit) => ({
    client: {
        name: visit.Client.user.name,
        email: visit.Client.user.email,
      },
      visit: {
        id: visit.id,
        date: visit.date,
        
      },

    }));

    return res.status(200).json(VisitDetails);
  } catch (error) {
    console.error('Error in fetching clients visited this week:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

//this month visits

const ThismonthVisit = async (req, res) => {
  try {
    const { adminId } = req.query;
    const startOfWeek = moment().startOf('month').toDate();
    const endOfWeek = moment().endOf('month').toDate();

    let whereCondition = {
      date: {
        [Op.between]: [startOfWeek, endOfWeek],
      },
    };

    if (adminId) {
      whereCondition['$Visit.AdminId$'] = adminId; // Condition to show clients with a specific AdminId
    }

    const visitsThisWeek = await Visits.findAll({
      where: whereCondition,
      include: [
        {
          model: Clients,
          as: 'Client',
          attributes: ['userId'],
          include: [
            {
              model: Users,
              as: 'user',
              attributes: ['name', 'email'],
            },
            {
              model: Admins,
              as: 'Admin',
            },
          ],
        },
      ],
    });

    if (visitsThisWeek.length === 0) {
      return res.status(404).json({ message: 'No clients visited this week' });
    }

    const VisitDetails = visitsThisWeek.map((visit) => ({
    client: {
        name: visit.Client.user.name,
        email: visit.Client.user.email,
      },
      visit: {
        id: visit.id,
        date: visit.date,
        
      },

    }));

    return res.status(200).json(VisitDetails);
  } catch (error) {
    console.error('Error in fetching clients visited this week:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

//this year visits

const ThisyearVisit = async (req, res) => {
  try {
    const { adminId } = req.query;
    const startOfWeek = moment().startOf('year').toDate();
    const endOfWeek = moment().endOf('year').toDate();

    let whereCondition = {
      date: {
        [Op.between]: [startOfWeek, endOfWeek],
      },
    };

    if (adminId) {
      whereCondition['$Visit.AdminId$'] = adminId; // Condition to show clients with a specific AdminId
    }

    const visitsThisWeek = await Visits.findAll({
      where: whereCondition,
      include: [
        {
          model: Clients,
          as: 'Client',
          attributes: ['userId'],
          include: [
            {
              model: Users,
              as: 'user',
              attributes: ['name', 'email'],
            },
            {
              model: Admins,
              as: 'Admin',
            },
          ],
        },
      ],
    });

    if (visitsThisWeek.length === 0) {
      return res.status(404).json({ message: 'No clients visited this week' });
    }

    const VisitDetails = visitsThisWeek.map((visit) => ({
    client: {
        name: visit.Client.user.name,
        email: visit.Client.user.email,
      },
      visit: {
        id: visit.id,
        date: visit.date,
        
      },

    }));

    return res.status(200).json(VisitDetails);
  } catch (error) {
    console.error('Error in fetching clients visited this week:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


const showAllInterventions = async (req, res) => {
  try {
    const { visitId } = req.query; 

    let whereCondition = {};

    if (visitId) {
      whereCondition = { '$intervention.VisitId$': visitId }; 
    }

    const allIntervention= await Interventions.findAll({
      where: whereCondition 
    });

    return res.json({ allIntervention });
  } catch (error) {
    console.error('Error in showing interventions:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

//today intervention 

const ThisDayIntervention = async (req, res) => {
  try {
    const { agentId } = req.query;
    const startOfDay = moment().startOf('day').toDate();
    const endOfDay = moment().endOf('day').toDate();

    // Find visits for today
    const whereVisitCondition = {
      date: {
        [Op.between]: [startOfDay, endOfDay],
      },
    };

    const visits = await Visits.findAll({
      where: whereVisitCondition,
      attributes: ['id', 'date'],
    });

    if (!visits || visits.length === 0) {
      return res.json({ allIntervention: [] });
    }

    // Extract visit IDs for interventions
    const visitIds = visits.map((visit) => visit.id);

    // Find interventions associated with the visits
    const whereInterventionCondition = {
      VisitId: {
        [Op.in]: visitIds,
      },
    };

    if (agentId) {
      whereInterventionCondition.AgentId = agentId;
    }

    const interventions = await Interventions.findAll({
      where: whereInterventionCondition,
    });

    if (!interventions || interventions.length === 0) {
      return res.json({ allIntervention: [] });
    }

    // Create a response object
    const allIntervention = interventions.map((intervention) => {
      const visit = visits.find((v) => v.id === intervention.VisitId);
      return {
        id: intervention.id,
        lieu: intervention.lieu,
        type: intervention.type,
        refAnimal: intervention.refAnimal,
        rapport: intervention.rapport,
        quantityOfAnimals: intervention.quantityOfAnimals,
        AgentId: intervention.AgentId,
        VisitId: intervention.VisitId,
        visitDate: visit ? visit.date : null,
        createdAt: intervention.createdAt,
        updatedAt: intervention.updatedAt,
      };
    });

    return res.json({ allIntervention });
  } catch (error) {
    console.error('Error in fetching interventions for today:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
const showAll_Agent_Interventions = async (req, res) => {
  try {
    const { agentId } = req.query; 

    let whereCondition = {};

    if (agentId) {
      whereCondition = { '$intervention.AgentId$':  agentId }; 
    }

     // Fetch interventions based on the where condition
    const interventions = await Interventions.findAll({
      where: whereCondition,
    });

    // Extract the VisitIds from the interventions
    const visitIds = interventions.map((intervention) => intervention.VisitId);

    // Fetch visits based on the VisitIds
    const visits = await Visits.findAll({
      where: {
        id: visitIds,
      },
      attributes: ['id', 'date'],
    });

    // Merge interventions with their corresponding visit dates
    const allIntervention = interventions.map((intervention) => {
      const visit = visits.find((v) => v.id === intervention.VisitId);
      return {
        id: intervention.id,
        lieu: intervention.lieu,
        type: intervention.type,
        refAnimal: intervention.refAnimal,
        rapport: intervention.rapport,
        quantityOfAnimals: intervention.quantityOfAnimals,
        AgentId: intervention.AgentId,
        VisitId: intervention.VisitId,
        visitDate: visit ? visit.date: null, // Include visit date or null if not found
        createdAt: intervention.createdAt,
        updatedAt: intervention.updatedAt,
      };
    });

    return res.json({ allIntervention });
  } catch (error) {
    console.error('Error in showing interventions:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

//This week Intervention
const ThisWeekIntervention = async (req, res) => {
 try {
    const { agentId } = req.query;
    const startOfWeek = moment().startOf('week').toDate();
    const endOfWeek = moment().endOf('week').toDate();

    // Find visits for this week
    const whereVisitCondition = {
      date: {
        [Op.between]: [startOfWeek, endOfWeek],
      },
    };

    const visits = await Visits.findAll({
      where: whereVisitCondition,
      attributes: ['id', 'date'],
    });

    if (!visits || visits.length === 0) {
      return res.json({ allIntervention: [] });
    }

    // Extract visit IDs for interventions
    const visitIds = visits.map((visit) => visit.id);

    // Find interventions associated with the visits
    const whereInterventionCondition = {
      VisitId: {
        [Op.in]: visitIds,
      },
    };

    if (agentId) {
      whereInterventionCondition.AgentId = agentId;
    }

    const interventions = await Interventions.findAll({
      where: whereInterventionCondition,
    });

    if (!interventions || interventions.length === 0) {
     return res.json({ allIntervention: [] });
    }

    // Create a response object
    const allIntervention = interventions.map((intervention) => {
      const visit = visits.find((v) => v.id === intervention.VisitId);
      return {
        id: intervention.id,
        lieu: intervention.lieu,
        type: intervention.type,
        refAnimal: intervention.refAnimal,
        rapport: intervention.rapport,
        quantityOfAnimals: intervention.quantityOfAnimals,
        AgentId: intervention.AgentId,
        VisitId: intervention.VisitId,
        visitDate: visit ? visit.date : null,
        createdAt: intervention.createdAt,
        updatedAt: intervention.updatedAt,
      };
    });

    return res.json({ allIntervention });
  } catch (error) {
    console.error('Error in fetching clients visited this week:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

//this month intervention
const ThismonthIntervention  =async (req, res) => {
 try {
    const { agentId } = req.query;
    const startOfWeek = moment().startOf('month').toDate();
    const endOfWeek = moment().endOf('month').toDate();

    // Find visits for this week
    const whereVisitCondition = {
      date: {
        [Op.between]: [startOfWeek, endOfWeek],
      },
    };

    const visits = await Visits.findAll({
      where: whereVisitCondition,
      attributes: ['id', 'date'],
    });

    if (!visits || visits.length === 0) {
     return res.json({ allIntervention: [] });
    }

    // Extract visit IDs for interventions
    const visitIds = visits.map((visit) => visit.id);

    // Find interventions associated with the visits
    const whereInterventionCondition = {
      VisitId: {
        [Op.in]: visitIds,
      },
    };

    if (agentId) {
      whereInterventionCondition.AgentId = agentId;
    }

    const interventions = await Interventions.findAll({
      where: whereInterventionCondition,
    });

    if (!interventions || interventions.length === 0) {
      return res.json({ allIntervention: [] });
    }

    // Create a response object
    const allIntervention = interventions.map((intervention) => {
      const visit = visits.find((v) => v.id === intervention.VisitId);
      return {
        id: intervention.id,
        lieu: intervention.lieu,
        type: intervention.type,
        refAnimal: intervention.refAnimal,
        rapport: intervention.rapport,
        quantityOfAnimals: intervention.quantityOfAnimals,
        AgentId: intervention.AgentId,
        VisitId: intervention.VisitId,
        visitDate: visit ? visit.date : null,
        createdAt: intervention.createdAt,
        updatedAt: intervention.updatedAt,
      };
    });

    return res.json({ allIntervention });
  } catch (error) {
    console.error('Error in fetching clients visited this week:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

//this year visits
const ThisyearInterventions = async (req, res) => {
 try {
    const { agentId } = req.query;
    const startOfWeek = moment().startOf('year').toDate();
    const endOfWeek = moment().endOf('year').toDate();

    // Find visits for this week
    const whereVisitCondition = {
      date: {
        [Op.between]: [startOfWeek, endOfWeek],
      },
    };

    const visits = await Visits.findAll({
      where: whereVisitCondition,
      attributes: ['id', 'date'],
    });

    if (!visits || visits.length === 0) {
      return res.json({ allIntervention: [] });
    }

    // Extract visit IDs for interventions
    const visitIds = visits.map((visit) => visit.id);

    // Find interventions associated with the visits
    const whereInterventionCondition = {
      VisitId: {
        [Op.in]: visitIds,
      },
    };

    if (agentId) {
      whereInterventionCondition.AgentId = agentId;
    }

    const interventions = await Interventions.findAll({
      where: whereInterventionCondition,
    });

    if (!interventions || interventions.length === 0) {
     return res.json({ allIntervention: [] });
    }

    // Create a response object
    const allIntervention = interventions.map((intervention) => {
      const visit = visits.find((v) => v.id === intervention.VisitId);
      return {
        id: intervention.id,
        lieu: intervention.lieu,
        type: intervention.type,
        refAnimal: intervention.refAnimal,
        rapport: intervention.rapport,
        quantityOfAnimals: intervention.quantityOfAnimals,
        AgentId: intervention.AgentId,
        VisitId: intervention.VisitId,
        visitDate: visit ? visit.date : null,
        createdAt: intervention.createdAt,
        updatedAt: intervention.updatedAt,
      };
    });

    return res.json({ allIntervention });
  } catch (error) {
    console.error('Error in fetching clients visited this week:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
module.exports ={showAllAdmins,showAdminRating,SortAdminByRating,SortByNbClient, SearchAdminByName,sortAdminsByAlphabiticOrder,
  showAllAgents,
  showAllClients,SearchClientByName,ThisWeekClient,sortClientsByAlphabiticOrder
  ,showAllVisits,ThisWeekVisit,ThismonthVisit,ThisyearVisit,showClientVisits,ThisWeekClientVisit,ThisMonthClientVisit,ThisYearClientVisit,
  showAllInterventions,showAll_Agent_Interventions,ThisyearInterventions,ThismonthIntervention,ThisWeekIntervention,ThisDayIntervention

}