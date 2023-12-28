import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import logo from "../assets/unilogo.png";
import { FaXmark, FaBars } from "react-icons/fa6";
import "../styles/Navbar.css";
import axios from 'axios';
//import "../pages/Home";

export default function NavbarMain({ isAuthenticated, handleSignOut, loggedInUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
  // Add an empty dependency array to useEffect

  
  useEffect(() => {
    const getUser = async () => {
      try {
        // Check if loggedInUser and loggedInUser.id are available, use them; otherwise, set userId to an empty string
        const userId = loggedInUser?.id || '';
        console.log('User ID:', userId); // Add this line
        const response = await axios.get(`http://localhost:8000/user/preview-user/${userId}`);
        
        console.log("User Data:", response.data);
        setUser(response.data);
      } catch (error) {
        console.log("Error fetching user:", error);
        console.log("Request config:", error.config);
        console.log("Response data:", error.response ? error.response.data : null);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [loggedInUser]);

  useEffect(() => {
    console.log("loggedInUser changed:", loggedInUser);
  }, [loggedInUser]);
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
        className={`py-4 lg:px-14 px-4 ${
          isSticky
            ? "sticky top-0 left-0 right-0 border-b bg-sky-900 duration-300"
            : "sticky top-0 left-0 right-0 border-b bg-sky-950  duration-300"
        }`}
        
      >
        <div className="flex justify-between items-center text-base gap-8">
          <a
            href="/"
            className="text-2xl font-semibold flex items-center space-x-3"
          >
            <span className="text-[#2194F3]">ENG</span>
            <img
              src={logo}
              alt=" "
              className="w-10 inline-block item-center "
            />
            <span className="text-[#2194F3]">PMS</span>
          </a>

          {/* Nav bar items for large devices */}
          <ul className="md:flex space-x-12 hidden">
            {navItems.map(({ link, path }) => (
              <ScrollLink
                to={path}
                spy={true}
                smooth={true}
                offset={-100}
                key={path}
                className="block text-base text-gray900 hover:text-brandPrimary first:font-medium cursor-pointer"
              >
                {link}
              </ScrollLink>
            ))}
          </ul>
          <div className="space-x-12 hidden lg:flex items-center">
         
                <Link 
               to="/"

                 className="bg-brandPrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-neutralDGrey items-center mr-4 inline-block">
                
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
                  stroke-width="1.3"
                />
              </svg>
            </Link>
             
          </div>

          {/*menu btn for only mobile devices */}
          <div className="md:hidden">
            <svg
              className="inline-block  h-6 w-6 mr-4 mb-4 ml-4 text-brandPrimary cursor-pointer"
              viewBox="0 0 20 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 15V17C6 19.2091 7.79086 21 10 21H15C17.2091 21 19 19.2091 19 17V5C19 2.79086 17.2091 1 15 1H10C7.79086 1 6 2.79086 6 5V7"
                stroke="#2194F3"
                stroke-width="2.5"
                stroke-linecap="round"
              />
              <path
                d="M11 14L13.2929 11.7071C13.6834 11.3166 13.6834 10.6834 13.2929 10.2929L11 8"
                stroke="#2194F3"
                stroke-width="2.5"
                stroke-linecap="round"
              />
              <path
                d="M13 11L1 11"
                stroke-width="2.5"
                stroke="#2194F3"
                stroke-linecap="round"
              />
            </svg>
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
            isMenuOpen ? "block fixed top-6 right-0 left-0" : "hidden"
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
              className="block  cursor-pointer text-base text-white   hover:text-black first:font-medium"
            >
              {link}
            </ScrollLink>
          ))}
        </div>
      </nav>
    </header>
  );
}

