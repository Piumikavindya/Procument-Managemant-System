const router = require('express').Router();
const {create,viewBudget,previewBudget,getBudgetByDepartment,updateBudget,deleterBudget} = require('../controllers/budget');


// Add item create route
router.post("/create", create, (req, res) => {
    console.log("Received a request to create a supplyer:", req.body);
    create(req, res);
  });
  router.get('/viewBudget', viewBudget);
  router.get("/previewBudget/:id",   previewBudget);
  router.get('/budget/:department', getBudgetByDepartment);
  router.put("/updateBudget/:id", updateBudget);
  router.delete("/deleterBudget/:id", deleterBudget);
  router.get("/getBudgetByDepartment/:id", getBudgetByDepartment);

  
  module.exports = router;
