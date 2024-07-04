
const budget = require('../Models/budget')
const Budget = require('../Models/budget');
const User = require("../Models/user");



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

 exports.getBudgetByDepartment = async (req, res) => {
  const userId = req.params.id;

  try {
    // Fetch the logged-in user to get their department
    const user = await User.findById(userId); // Corrected from findOne to findById
    if (!user) {
      return res.status(404).json({ status: "User not found" });
    }

    const budgets = await Budget.find({ department: user.department });
    if (!budgets || budgets.length === 0) {
      return res.status(404).json({ status: "No budgets found for this department" });
    }

    const { budgetAllocation, usedAmount, availableBalance } = budgets[0]; // Assuming one budget per department

    res.status(200).json({ budgetAllocation, usedAmount, availableBalance });
  } catch (error) {
    console.error("Error fetching budget:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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