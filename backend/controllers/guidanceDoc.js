

const Guidance = require('../Models/guidanceDoc');
const asyncWrapper = require('../middlewares/asyncWrapper');
const path = require("path");




// request from the frontend

exports.upload = async (req, res) => {
    try {
        const { username, name } = req.body;

        // Check if req.file is defined
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const file = req.file.path;

        // Log the file path to ensure it's correct
        console.log('File path:', file);

        // Rest of your code for creating and saving the guidance
        const newGuidance = new Guidance({ username, name, file });

        // Log the new guidance object to ensure it's correct
        console.log('New guidance:', newGuidance);

        // Save the data in the database
        await newGuidance.save();

        console.log('Saved to the database');
        res.json({ guidance: newGuidance });
    } catch (error) {
        console.error('Error saving guidance:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




// get the all the guidance documents

exports.viewGuidance = async (req, res) => {
    try {
        const guidanceItems = await Guidance.find();
        res.json(guidanceItems);
    } catch (error) {
        console.error('Error fetching guidance:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.downloadGuidance = async (req, res) => {
    try {
        const guidanceId = req.params.id;

        const guidance = await Guidance.findById(guidanceId);

        if (!guidance) {
            return res.status(404).json({ status: "guidance not found" });
        }

        const file = guidance.file;
        const filepath = path.join(__dirname, `../${file}`);
        
        res.download(filepath);
        // Note: Since res.download() will end the response, the following line won't be executed.
        // You may want to remove the line below or handle it differently.
        // res.status(200).json(guidance);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error while downloading guidance", error: err.message });
    }

};
// // view details of perticular user
// exports.previewSupplyer = async (req,res) =>{
//     const supplyerId = req.params.id;

//     try {
//         const supplyer = await Supplyer.findById(supplyerId);
//         if (!supplyer) {
            
//             return res.status(404).json({ status: "suppler not found" });
//         }
        

//         res.status(200).json(supplyer); 
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ status: "Error with getting supplyer", error: err.message });
//     }
 
//  };


// //update user details
// exports.updateSupplyer = async (req,res)=>{
//     let supplyerId = req.params.id;

//     const { username,supplierName,email, address,contactOfficer,contactNumber,faxNumber,typeofBusiness,classOfAssets} = req.body;

//     const updateSupplyer = {
//        username,
//        supplierName,
//        email,
//        address,
//        contactOfficer,
//        contactNumber,
//        faxNumber,
//        typeofBusiness,
//        classOfAssets,
//     };

//     try {
//         const updatedSupplyer = await guidance.findByIdAndUpdate(supplyerId, updateSupplyer, { new: true });
//         res.status(200).json({ status: "supplyer updated", supplyer: updatedSupplyer });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ status: "Error with updating User", error: err.message });
//     }
// };


//delete user
// exports.deleterSupplyer = async (req,res)=>{
//     let supplyerId = req.params.id;
//     try {
//         // Use await here to wait for the deletion to complete
//         await guidance.findByIdAndDelete(supplyerId);
//         res.status(200).send({ status: "User deleted" });
//       } catch (err) {
//         // Use status 500 for server errors
//         res.status(500).send({ status: "Error with delete user", error: err.message });
//       }
// };
