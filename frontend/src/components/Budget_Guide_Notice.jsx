import React from "react";
import budget from "../assets/budget_img.png";
import guide from "../assets/guideimg.png";
import notice from "../assets/notice_img.png";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

function Budget_Guide_Notice() {
  const budgets = [
    { id: 1, title: "Budget & Procurement Planning", image: budget },
    {
      id: 2,
      title: "Guidelines on Utilizing the PMS",
      image: guide,
      link:"guidelines",
    },
    { id: 3, title: "Procurement Notices", image: notice ,
  link:"notices"},
  ];
  return (
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-12" id="budget">
      <div className="text-center md:w-2/3 mx-auto">
        <h2 className="text-4xl test-neutralDGrey font-semibold mb-4 ">
          Implementing Online Procurement Systems in University Operations.
        </h2>
        <p className="text-sm text-NeutralGrey mb-8 md:w-3/4 mx-auto">
          Web base procurement systems for universities include improved
          transparency, efficiency, cost control, compliance with regulations,
          better supplier management, and reduced paperwork. These systems
          streamline operations, enhance collaboration between departments, and
          ensure a more structured and auditable procurement process.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-6 items-center justify-between">
        {budgets.map((budget) => (
          <div
            key={budget.id}
            className="mx-auto relative mb-12 cursor-pointer"
          >
            <img src={budget.image} alt="" className="hover:scale-95 transition-all duration-300"/>
            <div className="text-center px-4 py-8 bg-white shadow-lg rounded-md md:w-3/4 mx-auto absolute left-0 right-0 -bottom-12">
              <h3 className="mb-3 text-NeutralGrey font-semibold">{budget.title}</h3>

              <div className="flex items-center justify-center gap-8">
              <ScrollLink to={budget.link} spy={true} smooth={true} duration={600}>
                <p
                  className="font-bold text-brandPrimary hover:text-neutral-700"
                >
                  Read More{""}
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block ml-2"
                  >
                    <path
                      d="M8.71145 7.06123L11.0035 4.76915C11.2754 4.49732 11.2754 4.05659 11.0035 3.78476L8.71145 1.49268M10.7997 4.27695L1.05469 4.27695"
                      stroke="#2194F3"
                    />
                  </svg>
                </p>
              </ScrollLink>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Budget_Guide_Notice;
