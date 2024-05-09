import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Carousel } from "flowbite-react";
import guide from "../../assets/guide.png";
import notice from "../../assets/notice.png";
import budget from "../../assets/budget.png";

import VenderList from '../../components/VenderList';
import GuideDiv from "../../components/GuideDiv";
import NoticesDiv from "../../components/NoticesDiv";
import SuppliersDiv from "../../components/SuppliersDiv";
import BudgetGuideNotice from "../../components/Budget_Guide_Notice.jsx";
import UserTypeNavbar from "../../components/UserTypeNavbar.jsx";
import CalendarDiv from "../../components/CalendarDiv.jsx";



function AdminHome() {
  // const { id } = useParams();
  const { id } = useParams();
  return (
   
    <div id="Home">
    <UserTypeNavbar userType="admin" />
    <div className="bg-NeutralSilver">
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen">
      <Carousel className="w-full mx-auto ">
        <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
          <div>
            <img
              src={guide}
              alt=""
              className="max-w-full h-auto  md:max-w-md lg:max-w-full md:h-auto w-full"
            ></img>
          </div>
          <div className="md:w-1/2 pt-8">
            <h1 className=" text-1xl md:text-3xl lg:text-5xl font-semibold mb-1 text-NeutralDGrey md:w-3/4 leading-snug">
              Guidelines{" "}
              <span className="text-brandPrimary leading-snug">
                on utilizing the system
              </span>
            </h1>
            <p className="text-NeutralGrey text-lg pt-8">
              Follow the Instructions for operating the procurement
              management system.
            </p>
          </div>
        </div>

        <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
          <div>
            <img
              src={notice}
              alt=""
              className="max-w-full h-auto md:max-w-md lg:max-w-full md:h-auto w-full "
            ></img>
          </div>
          <div className="md:w-3/4">
            <h1 className="text-1xl  md:text-3xl lg:text-5xl font-semibold  mb-1 text-NeutralDGrey md:w-3/4 leading-snug">
              Take a moment to read the{" "}
              <span className="text-brandPrimary leading-snug">
                procurement notices.
              </span>
            </h1>
            <p className=" text-NeutralGrey text-lg ">
              Procurement notices give information about available
              opportunities for purchasing goods or services.
            </p>
          </div>
        </div>

        <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
          <div>
            <img
              src={budget}
              alt=""
              className="max-w-full h-auto  md:max-w-md lg:max-w-full md:h-auto w-full"
            ></img>
          </div>
          <div className="md:w-3/4 ">
            <h1 className=" text-1xl md:text-3xl lg:text-5xl font-semibold mb-4 text-NeutralDGrey md:w-3/4 leading-snug">
              Manage the procurement{" "}
              <span className="text-brandPrimary leading-snug">
                Budget{" "}
              </span>
              through meticulous{" "}
              <span className="text-brandPrimary leading-snug">
                Planning.
              </span>
            </h1>
            <p className="text-NeutralGrey text-lg mb-8  mt-8">
              Plan and make the procurement budgets to guarantee optimal
              resource allocation and cost-effective purchasing decisions.
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  </div>
  <VenderList />
  <GuideDiv />
  <NoticesDiv />
  <SuppliersDiv />
  <BudgetGuideNotice />
  <CalendarDiv />
     
    </div>
  );
}

export default AdminHome;