const db = require('./db');
const User = require('./models/user')(db);
const SupAdmin = require('./models/SupAdmin')(db);
const Admin = require('./models/Admin')(db);
const Agent = require('./models/Agent')(db);
const Client = require('./models/Client')(db);
const Visit = require('./models/Visit')(db);
const Intervention = require('./models/Intervention')(db);
const recette = require('./models/recette')(db);
const Message = require('./models/Message')(db);
const Like = require('./models/Like')(db);


const express = require('express');
// const socketIO = require('socket.io');
const bodyParser= require('body-parser');
const cookieParser = require("cookie-parser");
var cors = require('cors');
const http = require('http');
const app = express();
const server = http.createServer(app);
// const io = socketIO(server);

const socketIO = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});


const users=[]


 socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
      socket.disconnect()
      console.log('🔥: A user disconnected');
    });

   
    socket.on("user_id",(data)=>{
      console.log("data from socket : ", data)
      users.push({userIdFromBD:data, userSocket: socket.id})
      console.log("users: ", users)
    })

    socket.on("private_message", ({ to, message }) => {
    // Check if the recipient is connected
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 first message : ", message)
    const recipientSocket = users.filter(user=>{
      return user.userIdFromBD == to
    })[0]?.userSocket;

    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 first message : ", users.filter(user=>{
      return user.userIdFromBD == to
    })[0]?.userSocket)
      

    if (recipientSocket) {
      // Send the private message to the recipient
      console.log("first message from if state: ", recipientSocket)
      socket.to(recipientSocket).emit('private_message', { message });
      
    } else {
      // Handle the case where the recipient is not connected
      console.log(`User ${to} is not connected.`);
    }
  });


    socket.on('sendmsg', (data) => {
      console.log(data)
    })
});


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());






//Declare routers
const supAdminRouter = require('./routes/supAdminRoute');
const adminRouter = require('./routes/adminRoute');
const clientRouter = require('./routes/clientRoutes');
const tableRouter = require('./routes/tabelsRoute');
const userRouter = require('./routes/userRouter');
const guestRouter = require('./routes/guestRouter');

const guestController = require('./controllers/guestController');
const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');
const clientController = require('./controllers/clientController');






//define relations between tabels
SupAdmin.hasMany(Admin);
Visit.hasMany(Intervention);
Admin.hasMany(Visit);


/***Call Routers***/
    //supAdmin
app.use('/',supAdminRouter);
    //Admin
app.use('/',adminRouter);
    //Client
app.use('/',clientRouter);  
    //Tabels
app.use('/',tableRouter);  
    //user
app.use('/',userRouter); 
    //guest 
app.use('/',guestRouter); 







   
     
//create tabels and relations
async function createTable() {
  try {
    await db.sync({ force: true });
    console.log(' tables created successfully.');
  } catch (error) {
    console.error('Error creating  tables:', error);
  }
}
createTable();


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
module.exports = {User, Agent,Client,Admin,SupAdmin};
