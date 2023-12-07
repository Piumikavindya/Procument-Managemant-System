
const Item = require('../Models/Item');




// request from the frontend
exports.create = async (req,res) =>{
    const {username,itemName,AssetsClass, AssetsSubClass} = req.body;
// response will send to frontend
const newItem= new Item({username,itemName,AssetsClass, AssetsSubClass})
//save the data in the database
try {
    console.log('New Item:', newItem);
    await newItem.save();
    
    res.json({ item: newItem });
    console.error(' save to the database')
} catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
};


// get the all the supplyers
exports.viewItem = async (req,res) =>{
    Item.find().then((Items)=>{
     res.json(Items)
    }).catch((err)=>{
     console.log(err);
    })
 
 };


// view details of perticular user
exports.previewItem = async (req,res) =>{
    const itemId = req.params.id;

    try {
        const item = await Item.findById(supplyerId);
        if (!item) {
            
            return res.status(404).json({ status: "item not found" });
        }
        

        res.status(200).json(item); 
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with getting Item", error: err.message });
    }
 
 };


//update user details
exports.updateItem = async (req,res)=>{
    let itemId = req.params.id;

    const { username,itemName,AssetsClass, AssetsSubClass} = req.body;

    const updateItem = {
       username,
       itemName,
       AssetsClass,
       AssetsSubClass,
      
    };

    try {
        const updatedItem = await supplyer.findByIdAndUpdate(itemId, updateItem, { new: true });
        res.status(200).json({ status: "item updated", item: updatedItem });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error with updating item", error: err.message });
    }
};


//delete user
exports.deleterItem = async (req,res)=>{
    let itemId = req.params.id;
    try {
        // Use await here to wait for the deletion to complete
        await item.findByIdAndDelete(itemId);
        res.status(200).send({ status: "Item deleted" });
      } catch (err) {
        // Use status 500 for server errors
        res.status(500).send({ status: "Error with delete user", error: err.message });
      }
};
