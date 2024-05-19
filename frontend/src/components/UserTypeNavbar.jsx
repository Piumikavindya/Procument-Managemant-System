import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
// import { FaXmark, Fabars } from "react-icons/fa";

import { FaXmark, FaBars } from "react-icons/fa6";
import "../styles/Navbar.css";
import "../pages/Home";

const UserTypeNavbar = ({ userType }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // set toggle Menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    console.log("UserTypeNavbar received userType:", userType);
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Change to removeEventListener
    };
  }, []);

  //NAVITEMS ARRAY
  const AdminOptions = [
    { link: "Manage Users", path: "/userList" },
    { link: "Manage Vendors", path: "/allvendors" },
    { link: "Items", path: "/AllItem" },
    { link: "Dashboard", path: "" },
    { link: "Manage Guidance", path: "/ManageGuidance" },
    { link: "Manage Notices", path: "/ManageNotice" },
    { link: "Department", path: "" },
    { link: "Budget & Plan", path: "" },
    { link: "Manage Year Plan", path: "/EventPlanner" },
  ];

  const DepartmentOptions = [
    { link: "Purchase Requisition", path: `/reqform` },
    { link: "Requisition Tracker", path: "/ProgressTrack" },
    { link: "Request List", path: "/ViewForRequest" },
  ];

  const procOfficerOptions = [
    { link: "Created Projects", path: "/projectList" },
    { link: "Create New Project", path: "/ProjectCreationForm" },
    { link: "Approved Purchase Requisition List ", path: "/ApprovedRequestList" },
  ];

  const TECofficerOptions = [
    { link: "User Registration", path: "Home" },
    { link: "Vendor Registration", path: "guidelines" },
    { link: "Add Items", path: "notices" },
    { link: "Dashboard", path: "budget" },
    { link: "Manage Documents", path: "vendors" },
    { link: "Budget & Plan", path: "events" },
  ];

  const FinanceOfficersOptions = [
    { link: "User Registration", path: "Home" },
    { link: "Vendor Registration", path: "guidelines" },
    { link: "Add Items", path: "notices" },
    { link: "Dashboard", path: "budget" },
    { link: "Manage Documents", path: "vendors" },
    { link: "Budget & Plan", path: "events" },
  ];

  const ApproverOptions = [
    { link: "Pending Approval list", path: "/ViewForApproval" },
  ];

  return (
    <header className="w-full mt-20 bg-brandPrimary items-center md:bg-brandPrimary fixed top-2 left-0 right-0 ${isSticky ? 'sticky' : ''}">
      <nav
        className={`py-2.5 lg:px-14 px-4 ${
          isSticky
            ? "sticky top-0 left-0 right-0 border-b bg-brandPrimary duration-300"
            : ""
        }`}
      >
        <div className="flex justify-between items-center text-m gap-8 text-center">
          {/* Nav bar items for large devices */}
          <ul className="md:flex space-x-20 hidden ml-auto mr-auto ">
            {userType === "admin" &&
              AdminOptions.map(({ link, path }) => (
                <Link
                  to={path}
                  offset={-100}
                  key={path}
                  className="block no-underline text-white hover:font-bold hover:font-medium cursor-pointer"
                >
                  {link}
                </Link>
              ))}
            {userType === "department" &&
              DepartmentOptions.map(({ link, path }) => (
                <Link
                  to={path}
                 offset={-100}
                  key={path}
                  className="block no-underline text-white hover:font-bold hover:font-medium cursor-pointer"
                >
                  {link}
                </Link>
              ))}
            {userType === "TECofficer" &&
              TECofficerOptions.map(({ link, path }) => (
                <Link
                  to={path}
                  offset={-100}
                  key={path}
                  className="block no-underline text-white hover:font-bold hover:font-medium cursor-pointer"
                >
                  {link}
                </Link>
              ))}
            {userType === "procurement Officer" &&
              procOfficerOptions.map(({ link, path }) => (
                <Link
                  to={path}
                   offset={-100}
                  key={path}
                  className="block no-underline text-white hover:font-bold hover:font-medium cursor-pointer"
                >
                  {link}
                </Link>
              ))}
            {userType === "Finance officers" &&
              FinanceOfficersOptions.map(({ link, path }) => (
                <Link
                  to={path}
                  offset={-100}
                  key={path}
                  className="block no-underline text-white hover:font-bold hover:font-medium cursor-pointer"
                >
                  {link}
                </Link>
              ))}

            {userType === "approver" &&
              ApproverOptions.map(({ link, path }) => (
                <Link
                  to={path}
                  offset={-100}
                  key={path}
                  className="block no-underline text-white hover:font-bold hover:font-medium cursor-pointer"
                >
                  {link}
                </Link>
              ))}
          </ul>

          {/*menu btn for only mobile devices */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className=" text-white focus:outline-none focus:text-white "
            >
              {isMenuOpen ? (
                <FaXmark className="h-6 w-6 items-center " />
              ) : (
                <FaBars className="h-6 w-6 items-center" />
              )}
            </button>
          </div>
        </div>

        {/*nav items for mobile devices */}
        <div
          className={`space-y-4 px-4 mt-24  py-7 bg-brandPrimary md:hidden ${
            isMenuOpen ? "block fixed top-6 right-0 left-0" : "hidden"
          }`}
        >
          {userType === "admin" &&
            AdminOptions.map(({ link, path }) => (
              <Link
                to={path}
                offset={-100}
                key={path}
                onClick={closeMenu}
                className="block no-underline cursor-pointer text-base text-white  hover:text-bold  hover:font-medium"
              >
                {link}
              </Link>
            ))}

          {userType === "department" &&
            DepartmentOptions.map(({ link, path }) => (
              <Link
                to={path}
                offset={-100}
                key={path}
                onClick={closeMenu}
                className="block no-underline cursor-pointer text-base text-white  hover:text-bold  hover:font-medium"
              >
                {link}
              </Link>
            ))}

          {userType === "TECofficer" &&
            TECofficerOptions.map(({ link, path }) => (
              <Link
                to={path}
                offset={-100}
                key={path}
                onClick={closeMenu}
                className="block no-underline cursor-pointer text-base text-white  hover:text-bold  hover:font-medium"
              >
                {link}
              </Link>
            ))}

          {userType === "procurement Officer" &&
            procOfficerOptions.map(({ link, path }) => (
              <Link
                to={path}
                offset={-100}
                key={path}
                onClick={closeMenu}
                className="block no-underline cursor-pointer text-base text-white  hover:text-bold  hover:font-mediumm"
              >
                {link}
              </Link>
            ))}

          {userType === "Finance officers" &&
            FinanceOfficersOptions.map(({ link, path }) => (
              <Link
                to={path}
                offset={-100}
                key={path}
                onClick={closeMenu}
                className="block no-underline cursor-pointer text-base text-white  hover:text-bold  hover:font-medium"
              >
                {link}
              </Link>
            ))}

          {userType === "approver" &&
            ApproverOptions.map(({ link, path }) => (
              <Link
                to={path}
                offset={-100}
                key={path}
                onClick={closeMenu}
                className="block no-underline cursor-pointer text-base text-white  hover:text-bold  hover:font-medium"
              >
                {link}
              </Link>
            ))}
        </div>
      </nav>
    </header>
  );
};

export default UserTypeNavbar;