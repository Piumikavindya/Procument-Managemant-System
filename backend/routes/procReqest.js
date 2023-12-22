const router = require('express').Router();
const { generateRequestId,createRequest ,deleteRequest,addProcItem,deleteProcItem,uploadFile,downloadFile,deleteFile,viewFiles} = require('../controllers/procReqest');
const upload = require('../middlewares/multer');


router.post("/generateRequestId", generateRequestId, (req, res) => {
    console.log("Received a request to create a REQ id:", req.body);
    generateRequestId(req, res);
  });
  router.post("/createRequest", createRequest, (req, res) => {
    console.log("Received a request to create a procurement request:", req.body);
    createRequest(req, res);
  });
  router.delete('/deleteRequest/:requestId',deleteRequest);
  router.post('/addProcItem/:requestId',addProcItem);
  router.delete('/deleteProcItem/:requestId/:itemId', deleteProcItem);
  router.post('/uploadFile/:requestId', upload.single('file'), uploadFile);
  router.get('/downloadFile/:requestId/:id', downloadFile); 
  router.delete('/deleteFile/:requestId/:filename', deleteFile);
  router.get('/viewFiles', viewFiles);

  module.exports = router;