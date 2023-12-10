const router = require('express').Router();
const { create,updateSupplyer, viewSupplyers,deleterSupplyer, previewSupplyer } = require('../controllers/supplyer');


// Add user create route
router.post("/create", create, (req, res) => {
    console.log("Received a request to create a supplyer:", req.body);
    create(req, res);
  });
  router.get('/view-supplyers', viewSupplyers);
  router.get("/preview-supplyer/:id",   previewSupplyer)
  router.put("/update/:id", updateSupplyer);
  router.delete("/delete/:id", deleterSupplyer);
  module.exports = router;