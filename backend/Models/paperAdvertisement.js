const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paperAdvertisementSchema = new Schema({
    
    advertisementId: {
        type: String,
        unique: true,
      },
    procProject : [{
        projectId: {
            type: String,
            unique: true,
          },
          projectTitle: {
              type: String,
          },
          items: [],
    }],

    address :{
        type: String
    },
    lastDate:{
        type : Date

    },
    accountNo :{
        type: String
    },
    validateTime :{
        type: String

    },
    sendAddress:{
        type: String
    },
    validityPeriod:{
        type: String
    },
    deadline:{
        type: String

    },
    meetingPlaceAddress :{
        type: String
    },
    sendFinalDocumentAddress :{
        type: String
    },
    furtherInformationAddress :{
        type: String
    },
    publishDate : {
        type : Date
    }
  
 
 
   
  });
  
  const procProject = mongoose.model("paperAdvertisement", paperAdvertisementSchema);
  
  module.exports = procProject;