import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  EyeIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import AddBudgetCard from "./AddBudgetCard";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import UserTypeNavbar from "../../../components/UserTypeNavbar.jsx";
import DefaultPagination from "../../../components/DefaultPagination.js";

const TABLE_HEAD = [
  "No",
  "Department",
  "Budget Allocation",
  "Available Balance",
  "Used Amount",
  "Operations",
];

export default function ManageBudget() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddBudgetCard, setShowAddBudgetCard] = useState(false);
  const itemsPerPage = 5;
  const {id} = useParams();
  const filteredBudgets = budgets.filter(
    (budget) =>
      budget.department &&
      typeof budget.department === "string" &&
      budget.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/budget/viewBudget")
      .then((response) => {
        setBudgets(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching budgets:", error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleAddBudgetClick = () => {
    setShowAddBudgetCard(true);
  };

  const handleBudgetAdded = (newBudget) => {
    setBudgets([...budgets, newBudget]);
    setShowAddBudgetCard(false);
  };

  const handleCancelClick = () => {
    setShowAddBudgetCard(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBudgets.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4 ">
      <UserTypeNavbar userType="admin" />
      <Breadcrumb
        crumbs={[
            { label: "Home", link: `/adminhome/${id}` },
          { label: "Budget Details", link: `/budgetDetails/${id}` },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />
      <Card className="h-full w-full  mt-20  flex justify-center items-center">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none w-4/5"
        >
          <div className="mb-8 flex items-center justify-between gap-8 w-full">
            <div>
              <Typography variant="h5" color="blue-gray">
                <h4>BUDGET DETAILS</h4>
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                <h5>See information about all budgets.</h5>
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                variant="outlined"
                size="sm"
                className="text-white bg-brandPrimary  h-10"
              >
                <h6 className="mt-0">view all</h6>
              </Button>
              <Button
                className="flex items-center gap-3 h-10 bg-NeutralBlack"
                size="sm"
                onClick={handleAddBudgetClick}
              >
                <UserPlusIcon strokeWidth={2} className="h-5 w-5" />{" "}
                <h6 className="mt-1 text-white">Add Budget</h6>
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <div className="relative flex items-center">
                <div className="relative">
                  <button
                    type="submit"
                    className="absolute left-0 top-0 flex items-center justify-center h-full px-3"
                  >
                    <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
                  </button>
                  <input
                    className="border-2 border-gray-300 bg-white h-10 px-10 pr-16 rounded-lg text-sm focus:outline-none flex-grow"
                    type="search"
                    name="search"
                    placeholder="Search by Department"
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="w-5/5 overflow-scroll px-0">
          <table className="mt-4 w-full table-auto text-center">
            <thead className="bg-NeutralBlack">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-1"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray-900"
                      className="font-normal leading-none"
                    >
                      <h6 className="font-bold text-white mt-2">{head}</h6>
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((budget, index) => {
                const classes = "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={budget._id}>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <h6>{index + 1}</h6>
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <h6>{budget.department}</h6>
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <h6>{budget.budgetAllocation}</h6>
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <h6>{budget.availableBalance}</h6>
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <h6>{budget.usedAmount}</h6>
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Link to={`/updateBudget/${budget._id}`}>
                        <Tooltip content="Edit Budget">
                          <IconButton variant="text">
                            <PencilIcon className="h-6 w-6 text-green-500" />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      <Link to={`/DeleteBudget/${budget._id}`}>
                        <Tooltip content="Delete Budget">
                          <IconButton variant="text">
                            <TrashIcon className="h-6 w-6 text-red-500" />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <DefaultPagination
            totalItems={filteredBudgets.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </CardBody>
      </Card>
      {showAddBudgetCard && (
        <AddBudgetCard
          onSave={handleBudgetAdded}
          onCancel={handleCancelClick}
        />
      )}
    </div>
  );
}