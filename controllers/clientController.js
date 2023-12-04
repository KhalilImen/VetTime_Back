const db = require('../db');
const sequelize = require('../db');
const { Op,QueryTypes,Sequelize,literal } = require('sequelize');
const Admins = require('../models/Admin')(db);
const Clients = require('../models/Client')(db);
const Users = require('../models/user')(db);
const Like = require('../models/Like')(db);
const userSockets = new Map();
//Update AdminId 
const updateAdminId = async (req,res) =>{
    const { clientId, adminId }= req.params;
    

  try {
    const client = await Clients.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    client.AdminId= adminId;
    await client.save();
    return res.status(200).json({ message: 'Client  updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating client ' });
  }
    
};

//update Client Location 
const updateLocationClient = async (req, res) => {
  const clientId = req.params.clientId;
  const { latitude, longitude } = req.body;

  console.log('Latitude:', latitude);
  console.log('Longitude:', longitude);
  try {
    
    const client = await Clients.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

     const locationPoint = Sequelize.literal(`ST_GeomFromText('POINT(${longitude} ${latitude})')`);

    // Update the client's location attribute
    await client.update({
      location: locationPoint,
    });

    return res.status(200).json({ message: 'Client location updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating client location' });
  }
};
// Helper function to calculate the Haversine distance
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}
const searchNearest = async (req, res) => {
  try {
    const { latitude, longitude } = req.query; // Get latitude and longitude from query parameters
    const Latitude = parseFloat(latitude);
    const Longitude = parseFloat(longitude);
    console.log("THIS IS LATITUDE ",Latitude);
    console.log("THIS IS LONGITUDE ",Latitude);
    console.log('TYPE OF REQ.QUERY ',typeof Latitude)
    // Validate latitude and longitude values
    if (typeof Latitude !== 'number' || typeof Longitude !== 'number') {
      return res.status(400).json({ message: 'Invalid latitude or longitude values' });
    }

    // Construct the query to find the 10 nearest admins to the specified client's location
    const nearestAdmins = await sequelize.query(
      `
      SELECT 
        a.id AS adminId,
        a.rating,
        ST_X(a.location) AS adminLatitude,
        ST_Y(a.location) AS adminLongitude,
        u.name,
        u.phoneNumber,
        u.active AS active
      FROM 
        Admins AS a
      JOIN
        Users AS u
      ON
        a.userId = u.id
      WHERE 
        a.location IS NOT NULL
      `,
      {
        type: QueryTypes.SELECT,
      }
    );

    // Calculate the distances using the haversineDistance function
    nearestAdmins.forEach((admin) => {
      admin.distance = haversineDistance(Latitude, Longitude, admin.adminLatitude, admin.adminLongitude);
    });

    // Sort the admins by distance (nearest first)
    nearestAdmins.sort((a, b) => a.distance - b.distance);

    // Return the 10 nearest admins
    const nearestAdminsLimited = nearestAdmins.slice(0, 4);

    return res.json({ nearestAdmins: nearestAdminsLimited });
  } catch (error) {
    console.error('Error in getting nearest admins:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
//add rating 
const AddRating = async (req, res) => {

  const {rating ,AdminId}= req.body;
  try {   
    const Admin = await Admins.findByPk(AdminId);
    if (!Admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
     const updatedRating = Admin.rating + rating;
    // Update the client's location attribute
    await Admin .update({
      rating: updatedRating ,
    });
    return res.status(200).json({ message: 'admin rating updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating admin rating ' });
  }
};
//add like
const AddLike = async (req, res) => {
 const { clientId, adminId } = req.body;


  try {
    
    const existingLike = await Like.findOne({
      where: {
        clientId,
        adminId,
      },
    });

    if (!existingLike) {
      // If no row exists, create a new one with liked set to 0
      await Like.create({
        clientId,
        adminId,
        liked: 1,
      });
      return res.status(201).json({ message: 'Like added with liked set to 0' });
    } else {
       const updatedLikedValue = existingLike.liked === 0 ? 1 : 0;
       const ratingChange = updatedLikedValue === 1 ? 1 : -1;
      await existingLike.update({
       liked: updatedLikedValue,
      });
          const Admin = await Admins.findByPk(adminId);
          const updatedRating = Admin.rating + ratingChange;
          if(updatedRating>=0){
          await Admin .update({
          rating: updatedRating ,
          });
          } else {          await Admin .update({
                            rating: Admin.rating,
          });}

      return res.status(200).json({ message: 'Like updated' });
    }
  } catch (error) {
    
    console.error(error);
    return res.status(500).json({ message: 'Error updating like' });
  }
};

//likeValue
const likeValue = async (req, res) => {
  const { clientId, adminId } = req.query;

   console.log("THIS IS THE  CLIENTID §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§",clientId);
 console.log("THIS IS THE  ADMINID!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",adminId);

  try {
    // Check if a row with the given clientId and adminId exists
    const existingLike = await Like.findOne({
      where: {
        clientId,
        adminId,
      },
    });
    console.log("THIS IS THE  existingLike!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",existingLike);

    if (!existingLike) {
      // If no row exists, return 0
      return res.status(200).json({ likeValue: 0 });
    } else {
      // If a row exists, return the value of 'liked'
      return res.status(200).json({ likeValue: existingLike.liked });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error checking like value' });
  }
};
//Search By Name 
const SearchByName =async(req,res )=>{
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


module.exports = {searchNearest,SearchByName,updateAdminId,updateLocationClient,AddRating,AddLike,likeValue};