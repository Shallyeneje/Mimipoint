// fetching options from API
// import React, { useState, useEffect } from "react";

// export default function DataOfferDropdown() {
//   const [amount, setAmount] = useState("");
//   const [offers, setOffers] = useState([]);

//   useEffect(() => {
//     // Replace this URL with your actual API endpoint
//     fetch("https://api.example.com/data-offers")
//       .then((res) => res.json())
//       .then((data) => setOffers(data))
//       .catch((error) => console.error("Error fetching data offers:", error));
//   }, []);

//   return (
//     <select
//       value={amount}
//       onChange={(e) => setAmount(e.target.value)}
//       className="w-full p-1 border bg-white border-[#8A8AB9] rounded-[6px] outline-none text-[14px] focus:ring focus:ring-blue-900"
//     >
//       <option value="" disabled>
//         Other data offers
//       </option>
//       {offers.length > 0 ? (
//         offers.map((offer) => (
//           <option key={offer.id} value={offer.price}>
//             ₦{offer.price}
//           </option>
//         ))
//       ) : (
//         <option disabled>Loading offers...</option>
//       )}
//     </select>
//   );
// }
