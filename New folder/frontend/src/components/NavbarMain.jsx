import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import logo from "../assets/unilogo.png";
import { FaXmark, FaBars } from "react-icons/fa6";
import '../styles/NavbarMain.css'
import '../pages/Home';

const NavbarMain = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // set toggle Menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
    { link: "Home", path: "Home" },
    { link: "Guidelines", path: "Guidelines" },
    { link: "Notices", path: "notices" },
    { link: "Budget", path: "budget" },
    { link: "Events", path: "events" },
  ];
  return (
    <header className="w-full bg-white md:bg-transparent fixed top-0 left-0 right-0 ${isSticky ? 'sticky' : ''}">
      <nav
        className={`py-4 lg:px-14 px-4 ${
          isSticky
            ? "sticky top-0 left-0 right-0 border-b bg-white duration-300"
            : ""
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
              <Link
                to={path}
                spy={true}
                smooth={true}
                offset={-100}
                key={path}
                className="block text-base text-gray900 hover:text-brandPrimary first:font-medium"
              >
                {link}
              </Link>
            ))}
          </ul>
          <div className="space-x-12 hidden lg:flex items-center">
            <button className="bg-brandPrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-neutralDGrey">
              Sign In
            </button>
          </div>

          {/*menu btn for only mobile devices */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className=" text-neutralDGrey focus:outline-none focus:text-gray-500"
            >
              {isMenuOpen ? (
                <FaXmark className="h-6 w-6 " />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/*nav items for mobile devices */}
        <div
          className={`space-y-4 px-4 mt-16  py-7 bg-brandPrimary ${
            isMenuOpen ? "block fixed top-6 right-0 left-0" : "hidden"
          }`}
        >
          {navItems.map(({ link, path }) => (
            <Link
              to={path}
              spy={true}
              smooth={true}
              offset={-100}
              key={path}
              className="block text-base text-white   hover:text-black first:font-medium"
            >
              {link}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default NavbarMain;