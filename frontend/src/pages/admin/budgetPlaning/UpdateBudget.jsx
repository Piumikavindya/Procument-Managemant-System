import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Breadcrumb from "../../../components/Breadcrumb";

const departmentOptions = [
  "DEIE",
  "DCEE",
  "DMME",
  "DCE",
  "DMNNE",
  "DIS",
  "NONE",
];

export default function UpdateBudget() {
  const [department, setDepartment] = useState("");
  const [budgetAllocation, setBudgetAllocation] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");
  const [usedAmount, setUsedAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/budget/previewBudget/${id}`)
      .then((response) => {
        const budgetData = response.data;
        setDepartment(budgetData.department);
        setBudgetAllocation(budgetData.budgetAllocation);
        setAvailableBalance(budgetData.availableBalance);
        setUsedAmount(budgetData.usedAmount);
        setLoading(false);
      
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occurred. Please check the console.", {
          variant: "error",
        });
        console.error(error);
      });
  }, [id, enqueueSnackbar]);

  const handleUpdateBudgets = (e) => {
    e.preventDefault();
    const updatedBudget = {
      department,
      budgetAllocation,
      availableBalance,
      usedAmount,
    };

    setLoading(true);

    axios
      .put(`http://localhost:8000/budget/updateBudget/${id}`, updatedBudget)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Budget updated successfully", {
          variant: "success",
        });
        navigate(`/ManageBudget/${id}`)
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar(`Error updating budget: ${error.message}`, {
          variant: "error",
        });
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleUpdateBudgets}>
      <div className="space-y-12 ml-40 mr-40 mt-40">
        <Breadcrumb
          crumbs={[
            { label: "Home", link: `/adminhome/${id}` },
            { label: "Manage Budget", link: `/manageBudget/${id}` },

            { label: "Update Budget", link: `/updateBudget/${id}` },
          ]}
          selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
        />
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-gray-900">Update Budget</h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Budget Allocation
              </label>
              <input
                type="number"
                value={budgetAllocation}
                onChange={(e) => setBudgetAllocation(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Available Balance
              </label>
              <input
                type="number"
                value={availableBalance}
                onChange={(e) => setAvailableBalance(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Used Amount
              </label>
              <input
                type="number"
                value={usedAmount}
                onChange={(e) => setUsedAmount(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button 
            type="button"
            onClick={() => navigate(`/ManageBudget/${id}`)}
            className="mr-4 bg-gray-300 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 px-4 py-2 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
