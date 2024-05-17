const Item = require("../Models/item");

exports.create = async (req, res) => {
    const { username, itemName, AssetsClass, AssetsSubClass } = req.body;
  
    try {
      const newItem = new Item({ username, itemName, AssetsClass, AssetsSubClass });
      const savedItem = await newItem.save();
      return res.status(201).json({ item: savedItem });
    } catch (error) {
      console.error('Error saving item:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Get all items
exports.viewItem = async (req, res) => {
  Item.find()
    .then((Supplyers) => {
      res.json(Supplyers);
    })
    .catch((err) => {
      console.log(err);
    });
};

// View details of a particular item
exports.previewItem = async (req, res) => {
  const itemId = req.params.id;

  try {
    /* if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid item ID' });
        } */

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ status: "Item not found" });
    }

    res.status(200).json(item);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ status: "Error with getting item", error: err.message });
  }
};

// Update item details
exports.updateItem = async (req, res) => {
  const itemId = req.params.id;
  const { username, itemName, AssetsClass, AssetsSubClass } = req.body;

  try {
    /*  if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid item ID' });
        } */

    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { username, itemName, AssetsClass, AssetsSubClass },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ status: "Item not found" });
    }

    res.status(200).json({ status: "Item updated", Item: updatedItem });
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  const itemId = req.params.id;

  try {
   /*  if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid item ID" });
    } */

    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ status: "Item not found" });
    }

    res.status(200).json({ status: "Item deleted" });
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
