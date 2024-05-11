const router = require('express').Router();
const { generateRequestId,createRequest ,deleteRequest,addProcItem,deleteProcItem,uploadFile,downloadFile,deleteFile,viewFiles,viewAllRequests,veiwProcItems, SpecificationFile, uploadSpecificationFile, uploadSpecification} = require('../controllers/procReqest');
const upload = require('../middlewares/multer');
const specification = require('../middlewares/specificationMulter');

const { isAuthenticated } = require('../middlewares/auth');

router.post("/generateRequestId", generateRequestId, (req, res) => {
    console.log("Received a request to create a REQ id:", req.body);
    generateRequestId(req, res);
  });
  router.post("/createRequest/:requestId", createRequest, (req, res) => {
    console.log("Received a request to create a procurement request:", req.body);
    createRequest(req, res);
  });
  router.get('/viewRequests/' ,viewAllRequests);
  router.delete('/deleteRequest/:requestId',deleteRequest);
  router.post('/addProcItem/:requestId',addProcItem);
  router.get('/viewProcItems/:requestId',veiwProcItems);
  router.delete('/deleteProcItem/:requestId/:itemId', deleteProcItem);
  router.post('/uploadFile/:requestId', upload.single('file'), uploadFile);
  router.post('/uploadSpecification/:requestId', specification.single('specification'), uploadSpecification);

  router.get('/downloadFile/:requestId/:id', downloadFile); 
  router.delete('/deleteFile/:requestId/:filename', deleteFile);
  router.get('/viewFiles', viewFiles);
  // router.get('/downloadPdf/:requestId', downloadPdf);



  module.exports = router;


  


  