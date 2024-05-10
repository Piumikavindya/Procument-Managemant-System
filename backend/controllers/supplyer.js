
const supplyer = require('../Models/supplyer');
const Supplyer = require('../Models/supplyer');




// request from the frontend
exports.create = async (req,res) =>{
    const {username,supplierId,supplierName,email, address,contactOfficer,contactNumber,faxNumber1,faxNumber2,typeofBusiness,classOfAssets} = req.body;
// response will send to frontend
const newSupplyer= new Supplyer({username,supplierId,supplierName,email, address,contactOfficer,contactNumber,faxNumber1,faxNumber2,typeofBusiness,classOfAssets})
//save the data in the database
try {
    console.log('New Supplyer:', newSupplyer);
    await newSupplyer.save();
    
    res.json({ supplyer: newSupplyer.toObject() });
    console.log(' save to the database')
} catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
};


// get the all the supplyers
exports.viewSupplyers = async (req,res) =>{
    Supplyer.find().then((Supplyers)=>{
     res.json(Supplyers)
    }).catch((err)=>{
     console.log(err);
    })
 
 };


// view details of perticular user
exports.previewSupplyer = async (req,res) =>{
    const supplyerId = req.params.id;

    try {
        const supplyer = await Supplyer.findById(supplyerId);
        if (!supplyer) {
            
            return res.status(404).json({ status: "suppler not found" });
        }
        

        res.status(200).json(supplyer); 
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with getting supplyer", error: err.message });
    }
 
 };


//update user details
exports.updateSupplyer = async (req,res)=>{
    let supplyerId = req.params.id;

    const { username,supplierName,supplierId,email, address,contactOfficer,contactNumber,faxNumber1,faxNumber2,typeofBusiness,classOfAssets} = req.body;

    const updateSupplyer = {
       username,
       supplierName,
       supplierId,
       email,
       address,
       contactOfficer,
       contactNumber,
       faxNumber1,
       faxNumber2,
       typeofBusiness,
       classOfAssets,
    };

    try {
        const updatedSupplyer = await supplyer.findByIdAndUpdate(supplyerId, updateSupplyer, { new: true });
        res.status(200).json({ status: "supplyer updated", supplyer: updatedSupplyer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error with updating User", error: err.message });
    }
};


//delete user
exports.deleterSupplyer = async (req,res)=>{
    let supplyerId = req.params.id;
    try {
        // Use await here to wait for the deletion to complete
        await supplyer.findByIdAndDelete(supplyerId);
        res.status(200).send({ status: "User deleted" });
      } catch (err) {
        // Use status 500 for server errors
        res.status(500).send({ status: "Error with delete user", error: err.message });
      }
};