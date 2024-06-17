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
const supplyerRouter = require('./routes/supplyer');
const itemRouter = require('./routes/Item');

const guidanceRouter = require('./routes/guidanceDoc');
const noticeRouter = require('./routes/noticeDoc');
const procReqestRouter = require('./routes/procReqest');
const procProjectRoutes = require('./routes/procProject');
const pdfRoutes = require('./routes/pdfprocrequest');
const approvalRoute =require('./routes/approvalReqest');
const sendMailRoute =require('./routes/sendMail');
const PORT = process.env.PORT || 8000;
const env = require('dotenv')
const pdfRoute = require('./routes/pdfRoutes');
const paperAdvertisementRoute = require('./routes/paperAdvertisement');
const path = require('path')
require('dotenv').config();
env.config()





app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


// const URL = process.env.MONGODB_URL;

// mongoose.connect(URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


//const connection = mongoose.connection;

//this is user route
app.use('/user', userRouter);
app.use(errorHandler);
// this is supplyer route
app.use('/supplyer',supplyerRouter);
//thsi is item route
app.use('/item',itemRouter);
//this is gudance document route
app.use('/guidance',guidanceRouter);
//this is gudance document route
app.use('/notice',noticeRouter);
//this is Procurement request route
app.use('/procReqest',procReqestRouter);
app.use('/pdf', pdfRoutes);
app.use('/procProject', procProjectRoutes)
app.use(pdfRoute)
app.use('/approvalReqest',approvalRoute);
app.use('/send',sendMailRoute)
app.use('/paperAdd',paperAdvertisementRoute)



app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`);
  });