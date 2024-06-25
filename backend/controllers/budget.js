
const budget = require('../Models/budget')
const Budget = require('../Models/budget');




// request from the frontend
exports.create = async (req,res) =>{
    const {department,budgetAllocation,availableBalance,usedAmount} = req.body;
// response will send to frontend
const newBudget= new Budget({department,budgetAllocation,availableBalance,usedAmount} )
//save the data in the database
try {
    console.log('New Budget:', newBudget);
    await newBudget.save();
    
    res.json({ budget: newBudget.toObject() });
    console.log(' save to the database')
} catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
};


// get the all the supplyers
exports.viewBudget = async (req,res) =>{
  Budget.find().then((Budgets)=>{
     res.json(Budgets)
    }).catch((err)=>{
     console.log(err);
    })
 
 };


// view details of perticular user
exports.previewBudget = async (req,res) =>{
    const budgetId = req.params.id;

    try {
        const budget = await Budget.findById(budgetId);
        if (!budget) {
            
            return res.status(404).json({ status: "budjet not found" });
        }
        

        res.status(200).json(budget); 
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with getting budget", error: err.message });
    }
 
 };

// Update budget details
exports.updateBudget = async (req, res) => {
    let budgetId = req.params.id;

    const { department, budgetAllocation, availableBalance, usedAmount } = req.body;

    const updatedBudget = {
        department,
        budgetAllocation,
        availableBalance,
        usedAmount,
    };

    try {
        const budget = await Budget.findByIdAndUpdate(budgetId, updatedBudget, { new: true });
        res.status(200).json({ status: "budget updated", budget: budget });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error with updating budget", error: err.message });
    }
};


//delete user
exports.deleterBudget = async (req,res)=>{
    let budgetId = req.params.id;
    try {
        // Use await here to wait for the deletion to complete
        await budget.findByIdAndDelete(budgetId);
        res.status(200).send({ status: "budget deleted" });
      } catch (err) {
        // Use status 500 for server errors
        res.status(500).send({ status: "Error with delete budget", error: err.message });
      }
};