const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const User = require('./models/User')
const cookieParser = require('cookie-parser');

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';   //random string

app.use(cors({credentials:true,origin:'http://localhost:3001'}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb+srv://dchitransh:jT2268ABDS6FbxgJ@cluster0.sud2ts9.mongodb.net/?retryWrites=true&w=majority');

app.post('/signup',async (req,res) =>{
    const {username,password,email} = req.body;

    try{
        const userDoc = await User.create({ 
            username,
            password:bcrypt.hashSync(password,salt),
            email});
        res.json(userDoc);
    }
    catch(e) {
        console.log(e);
        res.status(400).json(e);
      }
});

app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        //successfully logged in
        jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id:userDoc._id,
                username,
              });
        });    
    } else {
      res.status(400).json('wrong credentials');
    }
  });


  app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info) => {
      if (err) throw err;
      res.json(info);
    });
  });

  app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
  });

app.listen(4000);


// mongodb+srv://dchitransh:jT2268ABDS6FbxgJ@cluster0.sud2ts9.mongodb.net/?retryWrites=true&w=majority



//mongodb credentials
//dchitransh
//jT2268ABDS6FbxgJ
const http = require("http");
const { Server } = require("socket.io");
const app1 = express();
app1.use(cors());

const server = http.createServer(app1);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3002",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3002, () => {
  console.log("SERVER RUNNING");
});

