import React from "react";
import notice from "../assets/noticediv.png";
import doc from "../assets/pdf.png";


function NoticesDiv() {
  return (
    <div id="notices">
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-8">
        <div className="md:w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="w-100 h-100">
            <img src={notice} alt="" />
          </div>
          <div className="mdw-3/5 mx-auto">
            <h2 className="text-4xl test-neutralDGrey font-semibold mb-4 md:w-4/5">
              Procurement Notices
            </h2>
            <p className="md:w-3/4 text-sm text-NeutralGrey mb-8 text-justify">
              Procurement notices are formal announcements or notifications
              issued by organizations to communicate their intent to procure
              goods, services, or works. These notices provide essential
              information such as requirements, specifications, deadlines, and
              procedures for interested suppliers or vendors to participate in
              the bidding or proposal process.
            </p>
            <div className=" mx-auto flex sm:flex-row flex-col sm:items-left  gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img src={doc} alt="supplier" />
                  <div>
                    <a href="#" className="text-brandPrimary text-sm underline">Notice of Intent to Award - Laboratory Equipment Purchase</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <img src={doc} alt="items" />
                  <div>
                    <a href="#" className="text-brandPrimary text-sm underline" >Invitation to Bid - University Maintenance Services</a>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img src={doc} alt="departments" />
                  <div>
                    <a href="#" className="text-brandPrimary text-sm underline">Request for Quotation (RFQ) - Printing Services</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <img src={doc} alt="purchasing" />
                  <div>
                    <a href="#" className="text-brandPrimary text-sm underline">Expression of Interest (EOI) - University Development Project</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoticesDiv;