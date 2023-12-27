import React from "react";
import guide from "../assets/guideline.png";
import "../styles/Buttons.css";
import supplier from "../assets/supplier.png";
import department from "../assets/department.png";
import items from "../assets/items.png";
import purchasing from "../assets/purchasing.png";

function GuideDiv() {
  return (
    <div>
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-8">
        <div className="md:w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="w-100 h-100">
            <img src={guide} alt="" />
          </div>
          <div className="mdw-3/5 mx-auto">
            <h2
              className="text-4xl text-neutralDGrey font-semibold mb-4 md:w-4/5"
              id="guidelines"
            >
              Guidelines on utilizing the Procurement Management system
            </h2>
            <p className="md:w-3/4 text-sm text-NeutralGrey mb-8 text-justify">
              Procurement Management Systems provide structured guidelines and
              tools for effectively managing the procurement process within an
              organization. They streamline everything from sourcing and
              purchasing to vendor management and payment processing. These
              systems help optimize costs, enhance supplier relationships,
              ensure compliance, and improve overall efficiency in procurement
              operations.
            </p>
            <button className="btn-primary">View Guidelines</button>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto bg-NeutralSilver py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-4xl text-neutralDGrey font-semibold mb-4 md:w-2/3">
              Managing Procurement Processes
              <br />
              <span className="text-brandPrimary"> of FoE , UoR</span>
            </h2>
            <p className="text-justify">
              A procurement management system facilitates streamlined control
              and optimization of the end-to-end procurement process within an
              organization.
            </p>
          </div>

          <div className="md:w-1/2 mx-auto flex sm:flex-row flex-col sm:items-center justify-around gap-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <img src={supplier} alt="supplier" />
                <div>
                  <h4 className="text-2xl text-neutralDGrey font-semibold">
                    1000
                  </h4>
                  <p>Suppliers</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img src={items} alt="items" />
                <div>
                  <h4 className="text-2xl text-neutralDGrey font-semibold">
                    828,867
                  </h4>
                  <p>Items</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <img src={department} alt="departments" />
                <div>
                  <h4 className="text-2xl text-neutralDGrey font-semibold">
                    04
                  </h4>
                  <p>Departments</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img src={purchasing} alt="purchasing" />
                <div>
                  <h4 className="text-2xl text-neutralDGrey font-semibold">
                    1,926,436
                  </h4>
                  <p>Purchasing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuideDiv;