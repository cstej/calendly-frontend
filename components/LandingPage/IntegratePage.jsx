import Image from "next/image";
import React from "react";

let arr = ["//images.ctfassets.net/k0lk9kiuza3o/64o3ZzxmDZ2RvV36K0PCwc/b8b2993bc4f37beb3eaecdf8b68af6df/Zoom.svg", "//images.ctfassets.net/k0lk9kiuza3o/6OTuIytCbtNByiPPLwTDLD/9250192af735c5ccf3e6a19334643d11/saleforce.svg", "//images.ctfassets.net/k0lk9kiuza3o/6W5mnZM4eNVK6Y8cBCnTu5/a0d70a3a38423e2b206e3dbf50503da5/google-calendar.svg", "//images.ctfassets.net/k0lk9kiuza3o/4UQZOyPUNAjKf3x7tV7WZh/5d25097472dee25e07bd93d25c4376a9/slack.svg", "//images.ctfassets.net/k0lk9kiuza3o/2rhQcGrSRD5qeBzfsUresc/e502a7d02554a63389dec5c37beadb1c/Frame_29927.svg", "//images.ctfassets.net/k0lk9kiuza3o/3x97SWL0ydKgcqT412HGr8/ed9ea1d8dea332dd74b125c89d689288/gmail-icon.svg", "//images.ctfassets.net/k0lk9kiuza3o/7bQs7qA7sp83HJuE7EUETv/ac34c04b2206d7e049f38f41178ef9b2/outlook.svg", "//images.ctfassets.net/k0lk9kiuza3o/1iXaOfSTG4LH14hl3jhgLV/9c262e7842e1e78a9e595a4477ecde7d/Chrome.svg", "//images.ctfassets.net/k0lk9kiuza3o/5iPdwT125pfQPNafr27mny/e866d175ee0169c23f90a3e438b65b21/intercom.svg", "//images.ctfassets.net/k0lk9kiuza3o/4DaLXMiJ2kwAv3qpPblkwG/3e2dcf1bf1a4b80858cd321ad67691b8/webex-logomark-01.svg", "//images.ctfassets.net/k0lk9kiuza3o/2APzJ2NNOwzzKC0mZam9mB/3158e0780a9db488ff243f5f08a48cef/hubspot.svg", "//images.ctfassets.net/k0lk9kiuza3o/42r0sVudnFRBVKsZH5MKRv/62003381c0ab4b1e7ac6facc0093bd0b/zapier-icon.svg", "//images.ctfassets.net/k0lk9kiuza3o/3L8hrM2H4gJLD7s2UFhhxE/75734eb6c87362ba5386ef33c4760d3d/Logomark.svg", "//images.ctfassets.net/k0lk9kiuza3o/nirfrq5tMDzXegZJxZHYr/626c4f558a197d841e926a6f53603aa3/linkedin.svg", " //images.ctfassets.net/k0lk9kiuza3o/68QvXpmECJZjUTvmk1Qbxk/7c2198e75bf4761ccf6677fdb960a14d/stripe-logo.svg", "//images.ctfassets.net/k0lk9kiuza3o/3YVXIhGtUTAzHkrMdGeEWh/f6ccde01983215ca45ba04a9aa57e7b1/Typeform-Icon.svg", "//images.ctfassets.net/k0lk9kiuza3o/5f4urpcDfUzxVFsvqHeuC/e3853fbc190f97bbcf4d165d24ab8e25/ActiveCamapign.svg", "//images.ctfassets.net/k0lk9kiuza3o/263kzYvoG2EGkeRpsrnkrA/b4ff427c85ce29d44a2af026691e985e/Logomark.svg"];

const IntegratePage = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen bg-gray-100">
      <div className="flex flex-row justify-center">
        <div className="flex  flex-row justify-between w-full max-w-[1250px] mx-auto">
          <h2 className="mt-2 small:p-12 font-bold text-3xl small:text-5xl">
            Integrations and <br />
            Extensions
          </h2>
          <div className="flex flex-col p-6">
            <p className="font-normal mb-1 mt-12">Boost productivity with integrations that fold right into your workflow.</p>

            <div className="mt-1 flex">
              <a href="#" className="items-center text-blue-500">
                <span className="mr-2">View all integrations</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-row ">
        {/* mapping 9 div  */}
        <div className="flex gap-8  flex-wrap justify-center items-center w-full max-w-[1200px] mx-auto p-2">
          {/* cards */}
          {arr.map((el, i) => (
            <div key={i} className="border-2 flex items-center justify-center border-indigo-300  rounded-lg min-h-[100px] min-w-[100px]">
              <div className="relative min-h-[40px] min-w-[40px]">
                <Image src={el} alt="no image" fill />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegratePage;
