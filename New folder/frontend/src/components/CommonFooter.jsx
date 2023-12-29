import React from "react";
import { Footer } from "flowbite-react";
import logo from "../assets/unilogo.png";

function CommonFooter() {
  return (
    <Footer container className="bg-NeutralBlack text-FooterFont">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex gap-8 sm:justify-between md:flex md:grid-cols-3 md:gap-14 text-left mt-2 mb-2">
          <div className="flex flex-col items-center space-y-4 mb-2 w-3/4 mx-4 my-8">
            <div className="justify-center">
              <p className="mb-1 text-FooterFont text-sm">
                Copyright © 2023 PMS,FoE,UoR
              </p>
              <p className="text-sm">All rights reserved</p>
            </div>
          </div>

          <div className="justify-center mr-8">
            <p className="text-2xl font-semibold flex items-center space-x-1 mx-auto justify-center">
              <span className="text-[#2194F3] text-sm">ENG</span>
              <img
                src={logo}
                alt="FoE,UoR "
                className="w-10 inline-block item-center"
              />
              <span className="text-[#2194F3] text-sm">PMS</span>
            </p>

            <p className="text-justify text-sm">
              The Faculty of Engineering of the University of Ruhuna was established on 1st July 1999 at Hapugala, Galle. Admission to the Faculty of Engineering, University of Ruhuna, is subject to the University Grants Commission policy on university admissions.
            </p>
          </div>
          <div className="text-left items-center w-1/2 my-2 text-sm">
            <p className="text-FooterFont font-bold">Contact Us</p>
            <br />
            <p col className="text-FooterFont">
              <ul>
                <li>Faculty of Engineering, Hapugala, Galle, Sri Lanka.</li>
                <li>Phone : +(94)0 91 2245765/6 </li>
                <li>
                  Email :{" "}
                  <a
                    href="mailto:webmaster@eng.ruh.ac.lk"
                    className="text-underline"
                  >
                    webmaster@eng.ruh.ac.lk
                  </a>
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default CommonFooter;
