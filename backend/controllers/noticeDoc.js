

const Notice = require('../Models/noticeDoc');
const asyncWrapper = require('../middlewares/asyncWrapper');
const path = require("path");




// request from the frontend

exports.uploadnotice = async (req, res) => {
    try {
        const {  name } = req.body;

        // Check if req.file is defined
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const file = req.file.path;

        // Log the file path to ensure it's correct
        console.log('File path:', file);

        // Rest of your code for creating and saving the guidance
        const newNotice = new Notice({  name, file });

        // Log the new guidance object to ensure it's correct
        console.log('New notice:', newNotice);

        // Save the data in the database
        await newNotice.save();

        console.log('Saved to the database');
        res.json({ notice: newNotice, message: 'File successfully uploaded' });

    } catch (error) {
        console.error('Error saving notice:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




// get the all the guidance documents
exports.viewNotice = async (req, res) => {
    try {
      const noticeItems = await Notice.find();
      res.json({ notice: noticeItems });
    } catch (error) {
      console.error('Error fetching guidance:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

exports.downloadNotice = async (req, res) => {
    try {
        const noticeId = req.params.id;

        const notice = await Notice.findById(noticeId);

        if (!notice) {
            return res.status(404).json({ status: "notice not found" });
        }

        const file = notice.file;
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


// delete guidance
exports.deleterNotice = async (req,res)=>{
    let noticeId = req.params.id;
    try {
        // Use await here to wait for the deletion to complete
        await Notice.findByIdAndDelete(noticeId);
        res.status(200).send({ status: "notice deleted" });
      } catch (err) {
        // Use status 500 for server errors
        res.status(500).send({ status: "Error with delete notice", error: err.message });
      }
};
