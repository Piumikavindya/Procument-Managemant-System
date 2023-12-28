import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import logo from "../assets/unilogo.png";
import { FaXmark, FaBars } from "react-icons/fa6";
import "../styles/Navbar.css";
import axios from 'axios';
import { Menu, Transition } from '@headlessui/react';  // Import Menu and Transition from the specified library
import { Fragment } from 'react';  // Import Fragment from Reac
//import "../pages/Home";
import classNames from 'classnames'; // Import classNames

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
          <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Account Setting
                          </a>
                        )}
                      </Menu.Item>
                    
                     
                    </Menu.Items>
                  </Transition>
                </Menu>
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

