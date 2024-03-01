import React, { useState, useEffect } from "react";
import { EyeIcon, MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Tooltip,
  Breadcrumbs,
} from "@material-tailwind/react";
import { Breadcrumb } from "flowbite-react";


const TABLE_HEAD = [
  "No",
  "Role",
  "Email",
  "FirstName",
  "LastName",
  "Department",
  "EmployeeNumber",
  "UserName",
  "Operations",
];

const TABLE_ROWS = [
  {
    no: "01",
    role: "admin",
    email: "admin@gmail.com",
    firstName: "Vimalasooriya",
    lastName: "Wasana",
    department: "Electrical",
    employeeNo: "ADMIN0005",
    userName: "Admin",
  },
  {
    no: "02",
    role: "user",
    email: "user01@gmail.com",
    firstName: "Vimalasooriya",
    lastName: "Wasana",
    department: "Civil",
    employeeNo: "USER0001",
    userName: "user01",
  },
  {
    no: "03",
    role: "user",
    email: "user02@gmail.com",
    firstName: "Vimalasooriya",
    lastName: "Wasana",
    department: "Mechanical",
    employeeNo: "USER0002",
    userName: "user02",
  },
  {
    no: "03",
    role: "user",
    email: "user03@gmail.com",
    firstName: "Vimalasooriya",
    lastName: "Wasana",
    department: "Computer",
    employeeNo: "USER0003",
    userName: "user03",
  },
  {
    no: "04",
    role: "user",
    email: "user04@gmail.com",
    firstName: "Vimalasooriya",
    lastName: "Wasana",
    department: "MENA",
    employeeNo: "USER0004",
    userName: "user04",
  },
];

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );


  

  // Fetch users data from your API endpoint
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/user/view-users") // Update the API endpoint
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  const selected = (crumb) => {
    console.log(crumb);
  };

  return (
       
    <Card className="h-full w-full  mt-20  flex justify-center items-center">
    
      <CardHeader floated={false} shadow={false} className="rounded-none w-4/5 ">
      <Breadcrumb
        crumbs={[
          { label: "Home", link: "/adminhome/:id" },
          { label: "User Details", link: "/AllItem" },

          { label: "Add User Details", link: "/additem" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />
        <div className="mb-8 flex items-center justify-between gap-8 w-full">
        
        
          <div>
          
            <Typography variant="h5" color="blue-gray">
            
              <h4>USER DETAILS</h4>
            </Typography>
            
            <Typography color="gray" className="mt-1 font-normal">
              <h5>See information about all users.</h5>
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm" className="text-white bg-blue-500 h-10">
              <h6 className="mt-0">view all</h6>
            </Button>
            <Button className="flex items-center gap-3 h-10" size="sm" onclick="popuphandler(true)">
              <UserPlusIcon strokeWidth={2} className="h-5 w-5" /> 
              <Link to={"/addUsers"} class="text-white"  style={{ textDecoration: 'none' }}>
              <h6 className="mt-2">Add User</h6>
            </Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
         
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-6 w-6" />}
              className="text-base"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="w-4/5  overflow-scroll px-0 ">
        <table className="mt-4 w-full  table-auto text-center ">
          <thead className="bg-blue-500">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray-900"
                    className="font-normal leading-none "
                  >
                    <h5 className="font-bold text-white">{head}</h5>
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
          {filteredUsers.map((user, index) =>  {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={user._id} >
                    <td className={classes} >
                      <div className="flex flex-col ">
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
                          <h6>{user.role}</h6>
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
                          <h6>{user.email}</h6>
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
                          <h6>{user.firstname}</h6>
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
                          <h6>{user.lastname}</h6>
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
                          <h6>{user.department}</h6>
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
                          <h6>{user.employeeNumber}</h6>
                        </Typography>
                        
                      </div>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <h6>{user.username}</h6>
                      </Typography>
                    </td>
                    <td className={classes}>
                    <Link to={`/editUsers/${user._id}`}>
                    <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <PencilIcon className="h-6 w-6 text-green-500" />
                        </IconButton>
                      </Tooltip>
                    </Link>
                    <Link to={`/deleteUserDetails/${user._id}`}>
                    <Tooltip content="Delete User">
                        <IconButton variant="text">
                          <TrashIcon className="h-6 w-6  text-red-500" />
                        </IconButton>
                      </Tooltip>
                    </Link>

                    
                      
                     
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="w-4/5 flex items-center justify-between border-t border-blue-green-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined"  className="text-white bg-green-500">
            Previous
          </Button>
          <Button variant="outlined"  className="text-white bg-green-500">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
    
  );
}
