import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from React Router
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import logo from "../assets/unilogo.png";
import { FaXmark, FaBars } from "react-icons/fa6";
import "../styles/Navbar.css";
import "../pages/Home";
import { Button } from "flowbite-react";

const Navbar = ({ isAuthenticated, handleSignOut, handleSignIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [isActive, setActive] = useState(false);
  // set toggle Menu
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
      window.removeEventListener("scroll", handleScroll); // Change to removeEventListener
    };
  }, []);

  //NAVITEMS ARRAY
  const navItems = [
    { link: "Home", path: "Home" },
    { link: "Guidelines", path: "guidelines" },
    { link: "Notices", path: "notices" },
    { link: "Budget", path: "budget" },
    { link: "Vendors", path: "vendors" },
    { link: "Events", path: "events" },
  ];
  return (
    <header className="w-full bg-white md:bg-transparent fixed top-0 left-0 right-0 ${isSticky ? 'sticky' : ''}">
      <nav
        className={`py-2 lg:px-14 px-4 ${
          isSticky
            ? "sticky top-0 left-0 right-0 border-b bg-white duration-300 items-center"
            : ""
        }`}
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

          {/* Nav bar items for large devices */}
          <ul className="md:flex space-x-12 hidden">
            {navItems.map(({ link, path }) => (
              <ScrollLink
  to={path}
  spy={true}
  smooth={true}
  offset={-100}
  key={path}
  className=" text-base text-brandPrimary  hover:font-bold  cursor-pointer no-underline"
>

                {link}
              </ScrollLink>
            ))}
          </ul>
          <div className="space-x-12 lg:flex items-center hidden">
            {isAuthenticated ? (
              <Link
                onClick={handleSignOut}     to="/"
                className="bg-brandPrimary text-white py-2 px-4 transition-all duration-300 rounded  hover:bg-neutralDGrey items-center mr-4 inline-block"
              >
                Sign Out
                <svg
                  width="9"
                  height="6"
                  viewBox="0 0 9 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block  ml-3"
                >
                  <path
                    d="M6.52435 5.4707L8.24346 3.7516C8.44734 3.54772 8.44734 3.21716 8.24346 3.01328L6.52435 1.29418M8.09055 3.38244L0.433594 3.38244"
                    stroke="white"
                    strokeWidth="1.3"
                  />
                </svg>
              </Link>
            ) : (
              <Link
                className="bg-brandPrimary text-white py-2 px-4 no-underline transition-all duration-300 rounded hover:bg-neutralDGrey items-center mr-4 inline-block"
                to="/loginpage"
                
              >
                Sign In{""}
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

          {/*menu btn for only mobile devices */}
          <div className="md:hidden">
          {isAuthenticated ? (
            <Link
              onClick={handleSignOut} to="/" 
              className="bg-brandPrimary text-white py-2 px-4 transition-all duration-300 rounded  hover:bg-neutralDGrey items-center mr-4 inline-block"
            >
              Sign Out
              <svg
                width="9"
                height="6"
                viewBox="0 0 9 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block  ml-3"
              >
                <path
                  d="M6.52435 5.4707L8.24346 3.7516C8.44734 3.54772 8.44734 3.21716 8.24346 3.01328L6.52435 1.29418M8.09055 3.38244L0.433594 3.38244"
                  stroke="white"
                  strokeWidth="1.3"
                />
              </svg>
            </Link>
          ) : (
            <Link
              className="bg-brandPrimary text-white py-2 px-4 no-underline transition-all duration-300 rounded hover:bg-neutralDGrey items-center mr-4 inline-block"
              to="/loginpage"
              onClick={() => handleSignIn()}
            >
              Sign In{""}
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


            <button
              onClick={toggleMenu}
              className=" text-brandPrimary focus:outline-none focus:text-brandPrimary "
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
          className={`space-y-4 px-4 mt-16  py-7 bg-brandPrimary md:hidden ${
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
              className="block no-underline cursor-pointer text-base text-white  hover:text-bold  hover:font-medium"
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