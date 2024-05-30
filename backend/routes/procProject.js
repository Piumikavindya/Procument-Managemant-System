const router = require('express').Router();
const { generateProjectId,createProject,addRequestsData,viewAddedRequests,createSmallProcurementPdf, viewShippingMethodPdf,createNationalShoppingPdf, viewSmallProcurementPdf, viewNationalShoppingPdf} = require('../controllers/procProject');
// const upload = require('../middlewares/multer');
// const { isAuthenticated } = require('../middlewares/auth');

router.get("/generateProjectId", generateProjectId, (req, res) => {
    console.log("Received a project to create a REQ id:", req.body);
    generateProjectId(req, res);
  });


  router.post('/addRequestsData/:projectId', addRequestsData);
  router.get('/viewAddedRequests/:projectId', viewAddedRequests);
  router.post("/createProject/:projectId", createProject, (req, res) => {
    console.log("Received a request to create a procurement project:", req.body);
    createRequest(req, res);
  });
  router.post('/createPdf',createSmallProcurementPdf) // to generate pdf 
  router.get('/view-Pdf/:projectId',viewSmallProcurementPdf) // to generate pdf 

  // routes for national shopping pdf
  router.post('/createNationalShoppingPdf',createNationalShoppingPdf) // to generate pdf 

  router.get('/viewnational-Pdf/:projectId',viewNationalShoppingPdf) // to generate pdf 

  



  module.exports = router;