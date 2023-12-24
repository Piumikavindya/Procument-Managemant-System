import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import logo from "../assets/unilogo.png";
import { FaXmark, FaBars } from "react-icons/fa6";
import "../styles/Navbar.css";
import "../pages/Home";

const AdminNavbar = () => {
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
  }, []); // Add an empty dependency array to useEffect

  //NAVITEMS ARRAY
  const navItems = [
    { link: "User Registration", path: "Home" },
    { link: "Vendor Registration", path: "guidelines" },
    { link: "Add Items", path: "notices" },
    { link: "Dashboard", path: "budget" },
    { link: "Manage Documents", path: "vendors" },
    { link: "Budget & Plan", path: "events" },
  ];
  return (
    <header className="w-full mt-20 bg-brandPrimary md:bg-brandPrimary fixed top-0 left-0 right-0 ${isSticky ? 'sticky' : ''}">
      <nav
        className={`py-4 lg:px-14 px-4 ${
          isSticky
            ? "sticky top-0 left-0 right-0 border-b bg-brandPrimary duration-300"
            : ""
        }`}
      >
        <div className="flex justify-between items-center text-base gap-8">
          

          {/* Nav bar items for large devices */}
          <ul className="md:flex space-x-20 hidden ml-24">
            {navItems.map(({ link, path }) => (
              <ScrollLink
                to={path}
                spy={true}
                smooth={true}
                offset={-100}
                key={path}
                className="block text-base text-white hover:text-black first:font-medium cursor-pointer"
              >
                {link}
              </ScrollLink>
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
};

export default AdminNavbar;
