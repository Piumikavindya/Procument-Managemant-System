import React from "react";
import com1 from "../assets/company1.png";
import com2 from "../assets/company2.png";
import com3 from "../assets/company3.png";
import com4 from "../assets/company4.png";
import com5 from "../assets/company5.png";
import com6 from "../assets/company6.png";
import supply from "../assets/supply.png";

function SuppliersDiv() {
  return (
    <div
      className="px-4 lg:px-14 max-w-screen-2xl mx-auto bg-NeutralSilver py-16"
      id="vendors"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="md:w-1/4">
          <img src={supply} alt="" />
        </div>

        <div className="md:w-3/4 mx-auto">
          <div>
            <p className="md:w-4/5 text-lg text-NeutralGrey MB-8 leading-7 text-justify">
              Effective management of supplier relationships is vital in
              university procurement. This involves vetting suppliers,
              negotiating contracts, ensuring compliance with regulations,
              maintaining quality standards, and fostering long-term
              partnerships to support the university's mission and goals.
              Universities often have procurement departments dedicated to
              managing relationships with suppliers, ensuring
              cost-effectiveness, and maintaining a transparent and ethical
              procurement process.{" "}
            </p>
            <h5 className="text-brandPrimary text-xl font-semibold mb-2">
              PMS
            </h5>
            <p className="text-base text-NeutralGrey mb-8 font-bold">
              Faculty of Engineering University of Ruhuna
            </p>
            <div>
              <div className="flex items-center gap-8 flex-wrap">
                <img src={com1} alt="" className="cursor-pointer" />
                <img src={com2} alt="" className="cursor-pointer" />
                <img src={com3} alt="" className="cursor-pointer" />
                <img src={com4} alt="" className="cursor-pointer" />
                <img src={com5} alt="" className="cursor-pointer" />
                <img src={com6} alt="" className="cursor-pointer" />
                <div className="flex items-center gap-8">
                  <a
                    href="/viewVendors"
                    className="font-bold text-brandPrimary hover:text-neutral-700 no-underline"
                  >
                    See all Suppliers{""}
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
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuppliersDiv;
