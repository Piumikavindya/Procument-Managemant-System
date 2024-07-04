import React, { useState } from "react";
import axios from "axios";

const departmentOptions = [
  "DEIE",
  "DCEE",
  "DMME",
  "DCE",
  "DMNNE",
  "DIS",
  "NONE",
];

const AddBudgetCard = ({ onSave, onCancel }) => {
  const [department, setDepartment] = useState("");
  const [budgetAllocation, setBudgetAllocation] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");
  const [usedAmount, setUsedAmount] = useState("");

  const handleSave = () => {
    const newBudget = {
      department,
      budgetAllocation,
      availableBalance,
      usedAmount,
    };

    axios
      .post("http://localhost:8000/budget/create", newBudget)
      .then((response) => {
        onSave(response.data);
      })
      .catch((error) => {
        console.error("Error adding budget:", error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Add Budget</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-3 py-2 border rounded h-10 overflow-y-scroll"
          >
            <option value="" disabled>
              Select department
            </option>
            {departmentOptions.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Budget Allocation</label>
          <input
            type="number"
            value={budgetAllocation}
            onChange={(e) => setBudgetAllocation(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Available Balance</label>
          <input
            type="number"
            value={availableBalance}
            onChange={(e) => setAvailableBalance(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Used Amount</label>
          <input
            type="number"
            value={usedAmount}
            onChange={(e) => setUsedAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-300 rounded mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBudgetCard;
