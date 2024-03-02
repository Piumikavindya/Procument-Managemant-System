import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  EyeIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import Breadcrumb from "../../../components/Breadcrumb.jsx";

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
} from "@material-tailwind/react";
import UserTypeNavbar from "../../../components/UserTypeNavbar.jsx";



const TABLE_HEAD = [
  "No",
  "SupplierID",
  "SupplierName",
  "Address",
  "ContactOfficer",
  "FaxNumber",
  "ContactNumber",
  "ContactEmail",
  "TypeofBusiness",
  "Operations",
];

const TABLE_ROWS = [
  {
    no: "01",
    supplierId: "SUPPLIER001",
    supplierName: "suplier01@gmail.com",
    street: "TempleRoad",
    city: "Colombo",
    province: "Western",
    faxNo: "+0094672367",
    contactNo1: "07548234823",
    contactNo2: "07826727676",
    contactEmail1: "sup01@gmail.com",
    contactEmail2: "supp02@gmail.com",
    typeofBusiness: "Electrical",
  },
  {
    no: "02",
    supplierId: "SUPPLIER002",
    supplierName: "suplier02@gmail.com",
    street: "TempleRoad",
    city: "Colombo",
    province: "Western",
    faxNo: "+0094672367",
    contactNo1: "07548234823",
    contactNo2: "07826727676",
    contactEmail1: "sup01@gmail.com",
    contactEmail2: "supp02@gmail.com",
    typeofBusiness: "Electrical",
  },
  {
    no: "03",
    supplierId: "SUPPLIER003",
    supplierName: "suplier03@gmail.com",
    street: "TempleRoad",
    city: "Colombo",
    province: "Western",
    faxNo: "+0094672367",
    contactNo1: "07548234823",
    contactNo2: "07826727676",
    contactEmail1: "sup01@gmail.com",
    contactEmail2: "supp02@gmail.com",
    typeofBusiness: "Electrical",
  },
  {
    no: "04",
    supplierId: "SUPPLIER004",
    supplierName: "suplier04@gmail.com",
    street: "TempleRoad",
    city: "Colombo",
    province: "Western",
    faxNo: "+0094672367",
    contactNo1: "07548234823",
    contactNo2: "07826727676",
    contactEmail1: "sup01@gmail.com",
    contactEmail2: "supp02@gmail.com",
    typeofBusiness: "Electrical",
  },
  {
    no: "05",
    supplierId: "SUPPLIER005",
    supplierName: "suplier05@gmail.com",
    street: "TempleRoad",
    city: "Colombo",
    province: "Western",
    faxNo: "+0094672367",
    contactNo1: "07548234823",
    contactNo2: "07826727676",
    contactEmail1: "sup01@gmail.com",
    contactEmail2: "supp02@gmail.com",
    typeofBusiness: "Electrical",
  },
];

export default function VendorDetails() {
  const [supplyers, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users data from your API endpoint
  useEffect(() => {
    console.log("Supplyers:", supplyers);
    setLoading(true);
    axios
      .get("http://localhost:8000/supplyer/view-supplyers") // Update the API endpoint
      .then((response) => {
        setVendors(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching supplyer:", error);
        setLoading(false);
      });
  }, []);

  const selected = (crumb) => {
    console.log(crumb);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const filteredsupplyers = supplyers.filter((supplyer) =>
    supplyer.supplierId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 ">
    <UserTypeNavbar userType="admin"/>
     <Breadcrumb  
        crumbs={[
          { label: "Home", link: "/adminhome/:id" },
          { label: "Vendor Details", link: "/vendorsDetails" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}/>
    <Card className="h-full w-full  mt-20  flex justify-center items-center">
      <CardHeader floated={false} shadow={false} className="rounded-none w-4/5">
        <div className="mb-8 flex items-center justify-between gap-8 w-full">
          <div>
            <Typography variant="h5" color="blue-gray">
              <h4>SUPPLIER DETAILS</h4>
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              <h5>See information about all suppliers.</h5>
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
            <Button className="flex items-center gap-3 h-10 bg-NeutralBlack" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-5 w-5" />{" "}
              <Link to={"/addSupplier"} class="text-white" style={{ textDecoration: 'none' }}>
              <h6 className="mt-1">Add Supplier</h6>
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
              placeholder="Search by Supplier ID"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="w-4/5  overflow-scroll px-0 ">
        <table className="mt-4 w-full  table-auto text-center ">
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
                    className="font-normal leading-none "
                  >
                    <h6 className="font-bold text-white mt-2">{head}</h6>
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredsupplyers.map((supplyer, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={supplyer._id}>
                  <td className={classes}>
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
                        <h6>{supplyer.supplierId}</h6>
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
                        <h6>{supplyer.supplierName}</h6>
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
                        <h6>{supplyer.address},</h6>
                      </Typography>
                    </div>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      <h6>{supplyer.contactOfficer}</h6>
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      <h6>{supplyer.faxNumber1}</h6>
                      <h6>{supplyer.faxNumber2}</h6>
                    </Typography>
                  </td>

                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {supplyer.contactNumber.map((number, index) => (
                          <div
                            key={index}
                            class="text-sm leading-5 text-gray-800"
                          >
                            <h6>{number}</h6>
                          </div>
                        ))}
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
                       {supplyer.email.map((number, index) => (
                          <div
                            key={index}
                            class="text-sm leading-5 text-gray-800"
                          >
                            <h6>{number}</h6>
                          </div>
                        ))}
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
                        <h6>{supplyer.typeofBusiness}</h6>
                      </Typography>
                    </div>
                  </td>

                  <td className={classes}>
                  <Link to={`/updateSupplier/:${supplyer._id}`}>
                    <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <PencilIcon className="h-6 w-6 text-green-500" />
                        </IconButton>
                      </Tooltip>
                    </Link>
                    <Link to={`/deleteSupplier/:${supplyer._id}`}>
                    <Tooltip content="Delete User">
                        <IconButton variant="text">
                          <TrashIcon className="h-6 w-6  text-red-500" />
                        </IconButton>
                      </Tooltip>
                    </Link>

                    
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="w-4/5 flex items-center justify-between border-t border-blue-green-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" className="text-white bg-green-500">
            Previous
          </Button>
          <Button variant="outlined" className="text-white bg-green-500">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>

    </div>
  );
}