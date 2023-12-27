import React from "react";
import company1 from "../assets/company1.png";
import company2 from "../assets/company2.png";
import company3 from "../assets/company3.png";
import company4 from "../assets/company4.png";
import company5 from "../assets/company5.png";
import company6 from "../assets/company6.png";
import company7 from "../assets/company7.png";
import icon1 from "../assets/icons/Icon1.png";
import icon2 from "../assets/icons/Icon2.png";
import icon3 from "../assets/icons/Icon3.png";

function VenderList() {
  const procurements = [
    {
      id: 1,
      title: "Small Procurement",
      description:
        " process of acquiring goods, services, or works through a streamlined or simplified procedure. It often involves purchases of relatively lower value or less complexity compared to larger procurement processes.",
      image: icon1,
    },
    {
      id: 2,
      title: "Shopping",
      description:
        " Shopping procurement typically involves obtaining commonly available items or standardized services from pre-approved suppliers or through commonly used marketplaces.",
      image: icon2,
    },
    {
      id: 3,
      title: "National Shopping",
      description:
        " It works through simplified procedures on a national scale. This method typically streamlines purchasing processes within the country's boundaries.",
      image: icon3,
    },
  ];
  return (
    <div className="md:px-14 px-4 py-16 max-w-screen-2xl mx-auto">
      <div className="text-center my-8">
        <h2 className="text-4xl text-neutralDGrey font-semibold mb-2">
          Our Vendors
        </h2>
        <p className="text-neutralDGrey">
          We've collaborated with vendors serving Fortune many companies...
        </p>

        {/*Company logos */}
        <div className="my-12 flex flex-wrap justify-between items-center gap-8">
          <img src={company1} alt="company1" />
          <img src={company2} alt="company2" />
          <img src={company3} alt="company3" />
          <img src={company4} alt="company4" />
          <img src={company5} alt="company5" />
          <img src={company6} alt="company6" />
          <img src={company7} alt="company7" />
        </div>
      </div>

      {/*procurement type card */}
      <div className="mt-20 md:w-1/2 mx-auto text-center">
        <h2 className="text-4xl text-neutralDGrey font-semibold mb-2">
          Manage your entire procurement process in a single system
        </h2>
        <p className="text-neutralDGrey">
          What is the procurement is suitable for?
        </p>
      </div>

      {/*Cards */}
      <div className="mt-14 grid lg:grid-cols-3 md:;grid-cols-2 grid-cols-1 md:w-11/12 mx-auto gap-12">
        {procurements.map((procurement) => (
          <div
            key={procurement.id}
            className="px-4 py-8 text-center md:w-[300px]
          mx-auto md:h-80 rounded-md shadow cursor-pointer hover:-translate-y-5 hover:border-b-4 
          hover:border-indigo-700 transition-all duration-300 flex flex-col items-center justify-center h-full "
          >
            <div className="bg-[#C7E4FC]  mb-4 h-14 w-14 mx-auto rounded-tl-3xl rounded-br-3xl">
              <img src={procurement.image} alt="" className="-ml-5 h-14 w-14" />
            </div>
            <h4 className="text-2xl font-bold text-neutralDGrey mb-2 px-2">
              {procurement.title}
            </h4>
            <p className="text-sm text-NeutralGrey">
              {procurement.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VenderList;