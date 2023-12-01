const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
require('express-async-errors');
require('dotenv').config();
require('./database/database');
require('./middlewares/error');
const userRouter = require("./routes/user");
const { errorHandler } = require('./middlewares/error');

const PORT = process.env.PORT || 8000;




app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// const URL = process.env.MONGODB_URL;

// mongoose.connect(URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


//const connection = mongoose.connection;

//this is user route
app.use('/user', userRouter);
app.use(errorHandler);




app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`);
  });