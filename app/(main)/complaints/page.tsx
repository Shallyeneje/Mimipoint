"use client";
// import { FaGoogle, FaHome } from "react-icons/fa";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// const ComplaintForm = () => {
//   const [name, setName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [transactionId, setTransactionId] = useState<string>("");
//   const [complaint, setComplaint] = useState<string>("");
//   const [error, setError] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   const router = useRouter(); // Next.js navigation

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault(); // Prevent default form submission

//     if (!name || !email || !transactionId || !complaint) {
//       setError("All fields are required");
//       return;
//     }

//     setError(""); // Clear existing error messages
//     setLoading(true);

//     try {
//       const response = await axios.post("https://your-api.com/complaints", {
//         name,
//         email,
//         transactionId,
//         complaint,
//       });

//       if (response.status === 200) {
//         router.push("/complaints/submitFeedback"); // Redirect to feedback page
//       }
//     } catch (error: any) {
//       setError(
//         error.response?.data?.message || "Something went wrong. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#EFEFF5] p-5">
//       <div className="w-64 hidden md:block">
//         <h2 className="text-sm font-bold flex items-center gap-2">
//           <FaHome size={20} /> Dashboard
//         </h2>
//       </div>
//       <h1 className="text-3xl font-bold text-[#00005D] mt-3">Complaints</h1>
//       <p className="text-[16px] font-medium text-[#333385]">Welcome, Gozzy</p>

//       <div className="flex justify-center items-center min-h-screen p-4">
//         <div className="w-full max-w-md bg-white p-10 rounded-[6px]">
//           <h1 className="text-xl font-bold text-center text-[#00005D] mb-7">
//             Complaints Form
//           </h1>
//           {error && <p className="text-red-500 text-center">{error}</p>}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-[#00005D] mb-1">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter your full name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//                 className="w-full text-sm p-2.5 border border-[#00005D] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#00005D]"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-[#00005D] mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full p-2.5 border text-sm border-[#00005D] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00005D]"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-[#00005D] mb-1">
//                 Transaction ID
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter your transaction ID"
//                 value={transactionId}
//                 onChange={(e) => setTransactionId(e.target.value)}
//                 required
//                 className="w-full p-2.5 border border-[#00005D] text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#00005D]"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-[#00005D] mb-1">
//                 Complaint
//               </label>
//               <textarea
//                 placeholder="Enter your complaint"
//                 value={complaint}
//                 onChange={(e) => setComplaint(e.target.value)}
//                 required
//                 className="w-full p-2.5 border text-sm border-[#00005D] rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#00005D]"
//               ></textarea>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-[#00005D] text-white py-3 rounded-md font-bold text-[16px] hover:bg-blue-800 transition"
//             >
//               {loading ? "Submitting..." : "Submit Complaint"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ComplaintForm;

// "use client";

import { FaHome } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Create an instance of Axios Mock Adapter
const mock = new MockAdapter(axios);

// Mock a POST request to "/complaints"
mock.onPost("/complaints").reply(200, {
  message: "Mock complaint submitted successfully",
});

const ComplaintForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const [complaint, setComplaint] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter(); // Next.js navigation

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    if (!name || !email || !transactionId || !complaint) {
      setError("All fields are required");
      return;
    }

    setError(""); // Clear existing error messages
    setLoading(true);

    try {
      const response = await axios.post("/complaints", {
        name,
        email,
        transactionId,
        complaint,
      });

      if (response.status === 200) {
        router.push("/complaints/submitFeedback"); // Redirect to feedback page
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EFEFF5] p-5 mt-10">
      <div className="w-64 hidden md:block">
        <h2 className="text-sm font-bold flex items-center gap-2">
          <FaHome size={20} /> Dashboard
        </h2>
      </div>
      <h1 className="text-3xl font-bold text-[#00005D] mt-3">Complaints</h1>
      <p className="text-[16px] font-medium text-[#333385]">Welcome, Gozzy</p>

      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-[6px]">
          <h1 className="text-xl font-bold text-center text-[#00005D] mb-6">
            Complaints Form
          </h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-sm font-medium text-[#00005D] ">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full text-sm p-2 border border-[#00005D] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#00005D]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#00005D]">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border text-sm border-[#00005D] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00005D]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#00005D] ">
                Transaction ID
              </label>
              <input
                type="text"
                placeholder="Enter your transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                required
                className="w-full p-2 border border-[#00005D] text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#00005D]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#00005D]">
                Complaint
              </label>
              <textarea
                placeholder="Enter your complaint"
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                required
                className="w-full p-2 border text-sm border-[#00005D] rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#00005D]"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00005D] text-white py-3 rounded-md font-bold text-[16px] hover:bg-blue-800 transition"
            >
              {loading ? "Submitting..." : "Submit Complaint"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;
