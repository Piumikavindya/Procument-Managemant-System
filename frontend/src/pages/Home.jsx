import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Carousel } from "flowbite-react";
import guide from "../assets/guide.png";
import notice from "../assets/notice.png";
import budget from "../assets/budget.png";
import VenderList from "../components/VenderList";
import GuideDiv from "../components/GuideDiv";

function Home() {
  // const { id } = useParams();
  return (
    <div>
      <div className="bg-NeutralSilver">
        <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen">
          <Carousel className="w-full mx-auto">
            <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
              <div>
                <img src={guide} alt=""></img>
              </div>
              <div className="md:w-1/2">
                <h1 className="text-5xl font-semibold mb-4 text-neutralDGrey md:w-3/4 leading-snug">
                  Guidelines{" "}
                  <span className="text-brandPrimary leading-snug">
                    on utilizing the system
                  </span>
                </h1>
                <p className="text-NeutralGrey text-base mb-8">
                  Follow the Instructions for operating the procurement
                  management system.
                </p>
              </div>
            </div>

            <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
              <div>
                <img src={notice} alt=""></img>
              </div>
              <div className="md:w-3/4">
                <h1 className="text-5xl font-semibold mb-4 text-neutralDGrey md:w-3/4 leading-snug">
                  Take a moment to read the{" "}
                  <span className="text-brandPrimary leading-snug">
                    procurement notices.
                  </span>
                </h1>
                <p className="text-NeutralGrey text-base mb-8">
                  Procurement notices give information about available
                  opportunities for purchasing goods or services.
                </p>
              </div>
            </div>

            <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
              <div>
                <img src={budget} alt=""></img>
              </div>
              <div className="md:w-3/4">
                <h1 className="text-5xl font-semibold mb-4 text-neutralDGrey md:w-3/4 leading-snug">
                  Manage the procurement{" "}
                  <span className="text-brandPrimary leading-snug">
                    Budget{" "}
                  </span>
                  through meticulous{" "}
                  <span className="text-brandPrimary leading-snug">
                    Planning.
                  </span>
                </h1>
                <p className="text-NeutralGrey text-base mb-8">
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
    </div>
  );
}

export default Home;
