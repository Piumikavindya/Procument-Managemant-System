const multer = require("multer");
const path = require('path');
const fs = require('fs');

// Specify the destination directory for uploads
const uploadDirectory = 'uploads/';

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}
// configure how the files are stored
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        //where to store the file
        cb(null, uploadDirectory);
    },
    filename:function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + "_" + file.originalname);


    },
});


const fileFilter = (req,file,cb)=>{
    //reject a file if it's not a jpg,png, ot pdf
    if(file.mimetype === "image/jpeg"||
    file.mimetype === "image/png"||
    file.mimetype === "application/pdf")
{
    cb(null,true);
}else{
    cb(null,false);
}

};



const uploads = multer({
    storage: storage,
    limits: {
        fileSizze: 1024*1024*5,
    },
    fileFilter:fileFilter,
});



module.exports = uploads;