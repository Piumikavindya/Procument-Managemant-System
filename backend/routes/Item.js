const router = require('express').Router();
const { create,updateItem, viewItem,deleteItem, previewItem } = require('../controllers/Item');


// Add item create route
router.post("/create", create, (req, res) => {
    console.log("Received a request to create a supplyer:", req.body);
    create(req, res);
  });
  router.get('/view-item', viewItem);
  router.get("/preview-item/:id",   previewItem)
  router.put("/update/:id", updateItem);
  router.delete("/delete/:id", deleteItem);
  module.exports = router;
