const router = require('express').Router();
const { generateProjectId,createProject,addRequestsData} = require('../controllers/procProject');
// const upload = require('../middlewares/multer');
// const { isAuthenticated } = require('../middlewares/auth');

router.post("/generateProjectId", generateProjectId, (req, res) => {
    console.log("Received a project to create a REQ id:", req.body);
    generateProjectId(req, res);
  });


  router.post('/addRequestsData', addRequestsData);

  router.post("/createProject/:projectId", createProject, (req, res) => {
    console.log("Received a request to create a procurement project:", req.body);
    createRequest(req, res);
  });





  module.exports = router;