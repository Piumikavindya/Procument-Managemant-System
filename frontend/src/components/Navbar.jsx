import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logo from "../assets/unilogo.png";

import { FaXmark, FaBars } from "react-icons/fa6";
import { PowerIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Button, Typography } from "@material-tailwind/react";

const Navbar = ({ isAuthenticated, handleSignOut, username }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { link: "Home", path: "Home" },
    { link: "Guidelines", path: "guidelines" },
    { link: "Notices", path: "notices" },
    { link: "Budget", path: "budget" },
    { link: "Vendors", path: "vendors" },
    { link: "Events", path: "events" },
  ];

  return (
    <header
      className={`w-full bg-white md:bg-transparent fixed top-0 left-0 right-0 ${
        isSticky ? "sticky" : ""
      }`}
      style={{ zIndex: 2000 }}
    >
      <nav
        className={`py-2 lg:px-14 px-4 ${
          isSticky
            ? "sticky top-0 left-0 right-0 border-b bg-white duration-300 items-center"
            : ""
        }`}
        style={{ zIndex: 2000 }}
      >
        <div className="flex justify-between items-center text-base gap-8">
          <p className="text-2xl font-semibold flex items-center space-x-3">
            <span className="text-brandPrimary">ENG</span>
            <img
              src={logo}
              alt=" "
              className="w-10 inline-block item-center "
            />
            <span className="text-brandPrimary">PMS</span>
          </p>

          <div className="md:flex space-x-12 hidden">
            {navItems.map(({ link, path }) => (
              <ScrollLink
                to={path}
                spy={true}
                smooth={true}
                offset={-100}
                key={path}
                className="text-base text-brandPrimary hover:font-bold cursor-pointer no-underline"
              >
                {link}
              </ScrollLink>
            ))}
          </div>
          <div className="lg:flex items-center hidden space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center">
              <Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-1 rounded-full py-2 pr-2 pl-2 lg:ml-auto"
                title="Click here to View Profile"
                >
                <Link
                  to={`/Profile`}
                  className="flex items-center gap-2"
                  style={{ textDecoration: "none" }}
                >
                  <UserCircleIcon className="h-10 w-10 text-blue-500 hover:bg-blue-500/10 focus:bg-blue-500/10 active:bg-blue-500/10" />
                  <Typography as="span" variant="small" className="font-normal">
                    username
                  </Typography>
                </Link>
              </Button>
              <button
                onClick={() => {
                  handleSignOut();
                  navigate("/");
                }}
                className="flex items-center gap-2"
                style={{ textDecoration: "none" }}
                title="Sign Out"
              >
                <PowerIcon className="h-6 w-6 text-red-500 hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" />
              </button>
            </div>
          ) : (
            <Link
              className="bg-brandPrimary text-white py-2 px-4 no-underline transition-all duration-300 rounded hover:bg-neutralDGrey items-center mr-4 inline-block"
              to="/loginpage"
            >
              Sign In
              <svg
                width="9"
                height="6"
                viewBox="0 0 9 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block ml-3"
              >
                <path
                  d="M6.52435 5.4707L8.24346 3.7516C8.44734 3.54772 8.44734 3.21716 8.24346 3.01328L6.52435 1.29418M8.09055 3.38244L0.433594 3.38244"
                  stroke="white"
                  strokeWidth="1.3"
                />
              </svg>
            </Link>
          )}
        </div>
        
     
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-brandPrimary focus:outline-none focus:text-brandPrimary"
            >
              {isMenuOpen ? (
                <FaXmark className="h-6 w-6 items-center " />
              ) : (
                <FaBars className="h-6 w-6 items-center" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`space-y-4 px-4 mt-16 py-7 bg-brandPrimary md:hidden ${
            isMenuOpen ? "block fixed top-6 right-0 left-80" : "hidden"
          }`}
        >
          {navItems.map(({ link, path }) => (
            <ScrollLink
              to={path}
              spy={true}
              smooth={true}
              offset={-100}
              key={path}
              onClick={closeMenu}
              className="block no-underline cursor-pointer text-base text-white hover:text-bold hover:font-medium"
            >
              {link}
            </ScrollLink>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
