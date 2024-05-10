const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  username: {
    type: String,
   // required: true,
  },
  itemName: {
    type: String,
    // required: true,
  },
  AssetsClass: {
    type: String,
    default: 'Current Assets',
    enum: ['Current Assets', 'Inventory', 'Supplier Assets', 'Contractual Assets'],
  },
  AssetsSubClass: {
    type: String,
  },
});

module.exports = mongoose.model('Item', ItemSchema);
