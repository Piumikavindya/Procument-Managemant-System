const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
require('dotenv').config();
require('./database/database');


const PORT = process.env.PORT || 8000;


app.use(cors());
app.use(bodyParser.json());
//app.use(express.json());
// const URL = process.env.MONGODB_URL;

// mongoose.connect(URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


//const connection = mongoose.connection;


app.get("/about",(req,res) =>{
    res.send("<h1> Hello illllllllj</h1>");
});

const userRouter = require("./routes/user");
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`);
  });