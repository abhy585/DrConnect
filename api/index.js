const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const User = require("./models/User");
const cookieParser = require("cookie-parser");
//const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const multer = require('multer');
const fs = require("fs");
const uploadMiddleware = multer({dest: 'uploads'})

const salt = bcrypt.genSaltSync(10);
const secret = "asdfe45we45w345wegw345werjktjwertkj"; //random string

app.use(cors({ credentials: true, origin: "http://localhost:3001" }));
app.use(express.json());
app.use(cookieParser());
//app.use(bodyParser);

mongoose.connect(
  "mongodb+srv://dchitransh:jT2268ABDS6FbxgJ@cluster0.sud2ts9.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/api/predict", (req, res) => {
  const inputData = req.body.input;

  // Execute a Python script to interact with your AI model
  const pythonProcess = spawn("python", [
    "./diseaseprediction/DiseasePrediction.py",
    inputData,
  ]);
  console.log("After Python Process: " + pythonProcess);

  // pythonProcess.stdout.on("data", (data) => {
  //   const result = JSON.parse(data);
  //   console.log(result);
  //   res.json(result);
  // });

  // pythonProcess.stderr.on("data", (data) => {
  //   console.error(`Python script error: ${data}cwsdvcd`);
  //   // const result = JSON.parse(data);
  //   // console.log(result);
  //   // res.json(result);

  //   res
  //     .status(500)
  //     .json({ error: "An error occurred while processing the request" });
  // });

  let responseData = ""; // Accumulate the response data

  pythonProcess.stdout.on("data", (data) => {
    // Convert the data to a string
    const dataStr = data.toString();

    // Check if the data contains a warning message
    if (!dataStr.includes("UserWarning:")) {
      responseData += dataStr;
    }
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python script error: ${data}cwsdvcd`);
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      try {
        // Parse the valid JSON response
        const result = JSON.parse(responseData);
        res.json(result); // Send the response without warnings
      } catch (error) {
        console.error(`Error parsing JSON: ${error}`);
        res
          .status(500)
          .json({ error: "An error occurred while processing the request" });
      }
    } else {
      // Handle non-zero exit code (script error) here if needed
      res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  });
});

app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
      email,
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    //successfully logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single('file') ,(req, res) => {
  const {originalname,path} = req.file;
  fs.renameSync(path,path+'.pdf');
  res.json({files:req.file});
});

app.listen(4000);

// mongodb+srv://dchitransh:jT2268ABDS6FbxgJ@cluster0.sud2ts9.mongodb.net/?retryWrites=true&w=majority

//mongodb credentials
//dchitransh
//jT2268ABDS6FbxgJ
