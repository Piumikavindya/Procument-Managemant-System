import React from "react";
import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import logo from "../assets/unilogo.png";

function CommonFooter() {
  return (
    <Footer container className="bg-NeutralBlack text-FooterFont">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1 ">
          <div className="space-y-4 mb-8">
            <div>
              <p className="mb-1 text-FooterFont">Copyright © 2023 PMS,FoE,UoR</p>
              <p >All rights reserved</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-2 sm:gap-6 text-center gap-4">
            <div>
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
              <Footer.LinkGroup col>
            {/*<Footer.Link href="#">The Faculty of Engineering of University of Ruhuna was established on 1st July 1999 at Hapugala, Galle. Admission to the Faculty of Engineering,
              University of Ruhuna, is subject to the University Grants Commission policy on university admissions.</Footer.Link> */}
              
              </Footer.LinkGroup>
            </div>
            <div >
              <Footer.Title title="Contact Us" className="text-FooterFont"/>
              <Footer.LinkGroup col className="text-FooterFont">
                <Footer.Link href="#">
                  Faculty of Engineering, Hapugala, Galle, Sri Lanka.
                </Footer.Link>
                <Footer.Link href="#">Phone : +(94)0 91 2245765/6 </Footer.Link>
                <Footer.Link>Email : webmaster@eng.ruh.ac.lk</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
         
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default CommonFooter;
