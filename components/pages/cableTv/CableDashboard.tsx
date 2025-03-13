"use client";
import React, { useState, useEffect } from "react";
import { PhoneCallIcon, ChevronDown } from "lucide-react";
import { CheckCircle, Wallet } from "lucide-react";
import { FiWifi, FiHome, FiTv, FiCreditCard } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { DialogModal } from "@/components/shared/dialogModal";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const packages = [
  { bundle: "GOtv Smallie", Amount: "₦1900", duration: "1 Month" },
  { bundle: "GOtv Jinja", Amount: "₦3900", duration: "1 Month" },
  { bundle: "GOtv Jolli", Amount: "₦5800", duration: "1 Month" },
  { bundle: "GOtv Max", Amount: "₦8500", duration: "1 Month" },
  { bundle: "GOtv Supa", Amount: "₦11400", duration: "1 Month" },
  { bundle: "GOtv Supa+", Amount: "₦16800", duration: "1 Month" },
];
const data = [
  {
    name: "GOTV",
    description: "everywhere you go",
    icon: PhoneCallIcon,
    color: "#2E94C5",
    nameColor: "#FFCC00", // MTN Yellow
    bg: "#E6F7FF",
    href: "#",
  },
  {
    name: "DSTV",
    description: "smartphone network",
    icon: FiWifi,
    color: "#009900",
    nameColor: "#E60000", // Airtel Red
    bg: "#E6FFE6",
    href: "/airtel",
  },
  {
    name: "Startimes",
    description: "here for you",
    icon: FiTv,
    color: "#E88B2E",
    nameColor: "#008000", // 9mobile Green
    bg: "#FFF5E6",
    href: "/9mobile",
  },
];

export default function CableDashboard() {
  const [selected, setSelected] = useState<string | null>("GOTV"); // Default active service

  const [clicked, setClicked] = useState("daily");
  const [smartcard, setSmartcard] = useState("");
  const [beneficiaries, setBeneficiaries] = useState<string[]>([]);
  // const [showDropdown, setShowDropdown] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [selectedBundle, setSelectedBundle] = useState<{
    bundle: string;
    Amount: string;
  } | null>(null);
  const [selectedServiceDetails, setSelectedServiceDetails] = useState(() =>
    data.find((item) => item.name === "GOTV")
  );

  const options = [
    { label: "daily", href: "/daily" },
    { label: "monthly", href: "/monthly" },
    { label: "yearly", href: "/2-weeks" },
  ];

  // Mock API Call - Replace with your actual API call
  const fetchBeneficiaries = async () => {
    // Simulating an API request
    setTimeout(() => {
      setBeneficiaries([
        "John Doe - 123456",
        "Jane Smith - 789012",
        "Peter Parker - 345678",
      ]);
    }, 1000);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      fetchBeneficiaries(); // Fetch data only when opening dropdown
    }
  };
  const handlePayment = async () => {
    if (!smartcard || !selectedBundle) {
      alert("Please enter your SmartCard number and select a bundle.");
      return;
    }

    setIsPaying(true); // Show loading state

    // Simulate an API call with a delay
    setTimeout(() => {
      setIsPaying(false);
      setPaymentSuccess(true); // Show success modal
      setSelectedBundle(null); // Close payment modal
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#EFEFF5] p-8">
      <div className="w-64  hidden md:block">
        <h2 className="text-sm font-bold flex items-center gap-2">
          <FiHome size={20} /> Dashboard
        </h2>
      </div>
      <h1 className="text-4xl font-bold text-[#00005D] mt-3">
        Cable Subscription
      </h1>
      <p className="text-[16px] font-medium text-[#333385]">
        pay for your Favourite TV provider and enjoy your favourite shows
      </p>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {data.map(
          ({ name, description, icon: Icon, color, nameColor, bg, href }) => (
            <Link key={name} href={href} legacyBehavior>
              <Card
                key={name}
                className="px-3 py-2.5 mb-4 h-[107px] relative flex items-center cursor-pointer rounded-[6px]"
                onClick={() => setSelected(name)}
              >
                {/* Selectable Checkbox */}
                <div className="absolute top-2 right-4 w-4 h-4 border-2 border-[#D9D9D9] rounded-full flex items-center justify-center">
                  <div
                    className="w-2.5 h-2.5 rounded-full transition-colors duration-200"
                    style={{
                      backgroundColor:
                        selected === name ? "#00005D" : "#D9D9D9",
                    }}
                  ></div>
                </div>

                {/* Icon and Text */}
                <div className="flex items-center gap-2 mt-4">
                  <div
                    className="flex justify-center items-center w-10 h-10 rounded-full"
                    style={{ backgroundColor: bg }}
                  >
                    <Icon size={24} style={{ color }} />
                  </div>
                  <div>
                    <p
                      className="text-[18px] font-bold"
                      style={{ color: nameColor }}
                    >
                      {name}
                    </p>
                    <p className="text-sm text-[#8A8AB9]">{description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          )
        )}
      </div>
      <div className="flex flex-col w-full max-w-md">
        <label className="text-sm font-medium text-[#00005D] mt-6 mb-3">
          SmartCard number
        </label>
        <div className="flex items-center gap-2 relative">
          {/* Input Field */}
          <div className="bg-[#F5F5FA] border border-[#A3A3C2] rounded-lg overflow-hidden w-full">
            <input
              type="text"
              value={smartcard}
              onChange={(e) => setSmartcard(e.target.value)}
              placeholder="Enter your SmartCard Number"
              className="w-full px-4 py-2 bg-[#FFFFFF] outline-none text-[#00005D] placeholder:text-[#A3A3C2]"
            />
          </div>

          {/* Button and Dropdown Wrapper */}
          <div className="relative">
            {/* Dropdown Button */}
            <button
              onClick={handleDropdownToggle}
              className="bg-[#00005D] text-[12px] rounded-[6px] text-white px-4 py-3 flex items-center gap-1 font-medium w-[150px]"
            >
              Beneficiaries
              <ChevronDown size={16} />
            </button>

            {/* Dropdown List */}
            {isDropdownOpen && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 shadow-md rounded-lg z-10">
                {beneficiaries.length > 0 ? (
                  beneficiaries.map((beneficiary, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#00005D]"
                      onClick={() => {
                        setSmartcard(beneficiary.split(" - ")[1]); // Extracts meter number
                        setIsDropdownOpen(false);
                      }}
                    >
                      {beneficiary}
                    </div>
                  ))
                ) : (
                  <p className="px-4 py-2 text-gray-500">Loading...</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 ">
        {/* Service Buttons */}
        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {packages.map(({ bundle, Amount, duration }, index) => (
            <Card
              key={index}
              className="h-[100px] flex items-center p-4 rounded-[6px] cursor-pointer shadow-sm hover:shadow-lg transition"
              onClick={() => setSelectedBundle({ bundle, Amount })}
            >
              <CardContent className="flex flex-col justify-center text-center">
                <h3 className="font-bold text-[#00005D] text-xl">{bundle}</h3>
                <div className="">
                  <div className="text-[10px] mx-auto  w-20 bg-[#FFE5B4] text-[#D97706] px-0.5 py-0.5 rounded-full inline-block">
                    {duration}
                  </div>
                </div>
                <p className="text-[14px] text-[#8A8AB9]">{Amount}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Modal */}
        {selectedBundle && (
          <DialogModal
            open={!!selectedBundle}
            setOpen={() => setSelectedBundle(null)}
            title={selectedBundle.Amount}
            showFooter={false}
            // footerButtonText="Pay"
            onSave={() =>
              alert(`Processing payment for ${selectedBundle.bundle}...`)
            }
          >
            {/* Payment Details */}
            <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
              <p className="flex justify-between">
                <span>Product Name</span> <span>📺 GOtv</span>
              </p>
              <p className="flex justify-between mt-0.5">
                <span>Account Number</span>{" "}
                <span className="font-semibold">{smartcard}</span>
              </p>
              <p className="flex justify-between mt-0.5">
                <span>Account Name</span>{" "}
                <span className="font-semibold">ENEJE SHALOM</span>
              </p>
              <p className="flex justify-between text-[#00005D] mt-0.5">
                <span>Cashback (₦303.17)</span> <span>-₦303.17</span>
              </p>
            </div>

            {/* Payment Method */}
            <div className="mt-1">
              <p className="text-gray-900 font-medium mb-1">Payment Method</p>
              <div className="bg-[#E5E5F5] flex items-center justify-between p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Wallet className="" size={18} />
                  <p className=" font-medium">Wallet (₦9,973.00)</p>
                </div>
                <CheckCircle className="" size={18} />
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <button
                onClick={handlePayment}
                className={`w-full bg-[#00005D] text-white py-2 rounded-md hover:bg-blue-900 transition ${
                  isPaying ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isPaying}
              >
                {isPaying ? "Processing..." : "Complete Payment"}
              </button>
            </div>
          </DialogModal>
        )}

        {paymentSuccess && (
          <DialogModal
            open={paymentSuccess}
            setOpen={() => setPaymentSuccess(false)}
            title="Payment Successful!"
            showFooter={false}
          >
            <div className="text-center">
              <CheckCircle size={50} className="text-green-500 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-800">
                Your payment was successful.
              </p>
              <p className="text-sm text-gray-600">
                Thank you for subscribing to {selectedServiceDetails?.name}!
              </p>
              <button
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md"
                onClick={() => setPaymentSuccess(false)}
              >
                Close
              </button>
            </div>
          </DialogModal>
        )}
      </main>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import { PhoneCallIcon, ChevronDown } from "lucide-react";
// import { CheckCircle, Wallet } from "lucide-react";
// import { FiWifi, FiHome, FiTv } from "react-icons/fi";
// import { Card, CardContent } from "@/components/ui/card";
// import { DialogModal } from "@/components/shared/dialogModal";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// const packages = [
//   { bundle: "GOtv Smallie", Amount: "₦1900", duration: "1 Month" },
//   { bundle: "GOtv Jinja", Amount: "₦3900", duration: "1 Month" },
//   { bundle: "GOtv Jolli", Amount: "₦5800", duration: "1 Month" },
//   { bundle: "GOtv Max", Amount: "₦8500", duration: "1 Month" },
//   { bundle: "GOtv Supa", Amount: "₦11400", duration: "1 Month" },
//   { bundle: "GOtv Supa+", Amount: "₦16800", duration: "1 Month" },
// ];

// const data = [
//   {
//     name: "GOTV",
//     description: "everywhere you go",
//     icon: PhoneCallIcon,
//     color: "#2E94C5",
//     nameColor: "#FFCC00",
//     bg: "#E6F7FF",
//     href: "#",
//   },
//   {
//     name: "DSTV",
//     description: "smartphone network",
//     icon: FiWifi,
//     color: "#009900",
//     nameColor: "#E60000",
//     bg: "#E6FFE6",
//     href: "/airtel",
//   },
//   {
//     name: "Startimes",
//     description: "here for you",
//     icon: FiTv,
//     color: "#E88B2E",
//     nameColor: "#008000",
//     bg: "#FFF5E6",
//     href: "/9mobile",
//   },
// ];

// export default function CableDashboard() {
//   const [selected, setSelected] = useState<string | null>("GOTV");
//   const [smartcard, setSmartcard] = useState("");
//   const [beneficiaries, setBeneficiaries] = useState<string[]>([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isPaying, setIsPaying] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [selectedBundle, setSelectedBundle] = useState<{
//     bundle: string;
//     Amount: string;
//   } | null>(null);
//   const [selectedServiceDetails, setSelectedServiceDetails] = useState(() =>
//     data.find((item) => item.name === "GOTV")
//   );

//   const fetchBeneficiaries = async () => {
//     setTimeout(() => {
//       setBeneficiaries([
//         "John Doe - 123456",
//         "Jane Smith - 789012",
//         "Peter Parker - 345678",
//       ]);
//     }, 1000);
//   };

//   const handleDropdownToggle = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//     if (!isDropdownOpen) {
//       fetchBeneficiaries();
//     }
//   };

//   const handlePayment = async () => {
//     if (!smartcard || !selectedBundle) {
//       alert("Please enter your SmartCard number and select a bundle.");
//       return;
//     }

//     setIsPaying(true);

//     setTimeout(() => {
//       setIsPaying(false);
//       setPaymentSuccess(true);
//       setSelectedBundle(null); // Close payment modal
//     }, 2000);
//   };

//   return (
//     <div className="min-h-screen bg-[#EFEFF5] p-8">
//       <h1 className="text-4xl font-bold text-[#00005D] mt-3">
//         Cable Subscription
//       </h1>
//       <p className="text-[16px] font-medium text-[#333385]">
//         Pay for your favorite TV provider and enjoy your shows
//       </p>

//       {/* SmartCard Input */}
//       <div className="flex flex-col w-full max-w-md mt-6">
//         <label className="text-sm font-medium text-[#00005D] mb-3">
//           SmartCard number
//         </label>
//         <div className="flex items-center gap-2 relative">
//           <input
//             type="text"
//             value={smartcard}
//             onChange={(e) => setSmartcard(e.target.value)}
//             placeholder="Enter your SmartCard Number"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
//           />
//           <div className="relative">
//             <button
//               onClick={handleDropdownToggle}
//               className="bg-[#00005D] text-white px-4 py-3 rounded-lg flex items-center gap-1"
//             >
//               Beneficiaries <ChevronDown size={16} />
//             </button>
//             {isDropdownOpen && (
//               <div className="absolute top-full mt-1 w-full bg-white border shadow-md rounded-lg z-10">
//                 {beneficiaries.length > 0 ? (
//                   beneficiaries.map((beneficiary, index) => (
//                     <div
//                       key={index}
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                       onClick={() => {
//                         setSmartcard(beneficiary.split(" - ")[1]);
//                         setIsDropdownOpen(false);
//                       }}
//                     >
//                       {beneficiary}
//                     </div>
//                   ))
//                 ) : (
//                   <p className="px-4 py-2 text-gray-500">Loading...</p>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Package Selection */}
//       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
//         {packages.map(({ bundle, Amount, duration }, index) => (
//           <Card
//             key={index}
//             className="h-[100px] flex items-center p-4 rounded-lg cursor-pointer hover:shadow-lg"
//             onClick={() => setSelectedBundle({ bundle, Amount })}
//           >
//             <CardContent className="text-center">
//               <h3 className="font-bold text-[#00005D]">{bundle}</h3>
//               <p className="text-sm text-[#8A8AB9]">{Amount}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Payment Modal */}
//       {selectedBundle && (
//         <DialogModal
//           open={!!selectedBundle}
//           setOpen={() => setSelectedBundle(null)}
//           title={selectedBundle.Amount}
//           showFooter={false}
//         >
//           <div className="bg-gray-100 p-4 rounded-lg text-sm">
//             <p className="flex justify-between">
//               <span>Product Name</span> <span>📺 GOtv</span>
//             </p>
//             <p className="flex justify-between mt-0.5">
//               <span>Account Number</span>{" "}
//               <span className="font-semibold">{smartcard}</span>
//             </p>
//             <p className="flex justify-between text-[#00005D] mt-0.5">
//               <span>Cashback (₦303.17)</span> <span>-₦303.17</span>
//             </p>
//           </div>

//           <div className="mt-3">
//             <button
//               onClick={handlePayment}
//               className={`w-full bg-[#00005D] text-white py-2 rounded-md hover:bg-blue-900 ${
//                 isPaying ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//               disabled={isPaying}
//             >
//               {isPaying ? "Processing..." : "Complete Payment"}
//             </button>
//           </div>
//         </DialogModal>
//       )}

//       {/* Payment Success Modal */}
//       {paymentSuccess && (
//         <DialogModal
//           open={paymentSuccess}
//           setOpen={() => setPaymentSuccess(false)}
//           title="Payment Successful!"
//           showFooter={false}
//         >
//           <div className="text-center">
//             <CheckCircle size={50} className="text-green-500 mx-auto mb-4" />
//             <p className="text-lg font-semibold">Payment was successful.</p>
//             <button
//               className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md"
//               onClick={() => setPaymentSuccess(false)}
//             >
//               Close
//             </button>
//           </div>
//         </DialogModal>
//       )}
//     </div>
//   );
// }
