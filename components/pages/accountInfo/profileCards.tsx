"use client";
import Link from "next/link";
import { FiCalendar } from "react-icons/fi";
import { FaShoppingCart, FaCalendar } from "react-icons/fa";
import { PencilIcon } from "lucide-react";

interface ProfileCardProps {
  name: string;
  username: string;
  role: string;
  gender?: string; // Optional to avoid undefined errors
  contact: string;
  email: string;
  dateJoined: string;
  balance: number;
  transactions: number;
}



const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  username,
  role,
  gender = "Not specified", // Default value
  contact,
  email,
  dateJoined,
  balance,
  transactions,
}) => {
  // Safe gender icon function
  const getGenderIcon = (gender?: string) => {
    if (!gender) return "⚧"; // Default icon
    const lowerGender = gender.toLowerCase();
    if (lowerGender === "male") return "♂️";
    if (lowerGender === "female") return "♀️";
    return "⚧"; // Non-binary or unspecified
  };
  

  return (
    <div className="min-h-screen bg-[#EFEFF5] p-8 flex justify-center items-center">
      <div className="max-w-sm w-full bg-white rounded-xl overflow-hidden border border-gray-200 p-6">
        {/* Header */}
        <div className="bg-[#C5C5E1] p-6 rounded-t-lg flex flex-col items-center relative">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-3xl text-gray-600">👤</span>
          </div>
          <Link href="/account-info/editProfile">
            <PencilIcon className="absolute top-4 right-4 text-gray-600 cursor-pointer hover:text-gray-800" />
          </Link>
        </div>

        {/* Profile Info */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold text-[#00005D]">{name}</h2>
          <p className="text-[#333385] text-sm font-bold">@{username}</p>
          <span className="bg-[#EFEFF5] text-[#333385] px-3 py-1 rounded-full text-xs font-semibold mt-3 inline-flex items-center gap-1">
            <FaShoppingCart /> {role}
          </span>
        </div>

        {/* Details */}
        <div className="mt-4 border-t border-b border-[#333385] py-4 space-y-2 text-[#545498] text-sm">
          <p>
            <strong>{getGenderIcon(gender)} Gender:</strong> {gender}
          </p>
          <p>
            <strong>📞 Contact:</strong> {contact}
          </p>
          <p>
            <strong>📧 Email:</strong> {email}
          </p>
          <p>
            <strong className="inline-flex gap-1 items-center"><FiCalendar/> Date joined:</strong> {dateJoined}
          </p>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-[#E6F3FF] p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-[#00005D]">${balance}</p>
            <p className="text-xs text-gray-500">Amount in Wallet</p>
          </div>
          <div className="bg-[#F5F5FA] p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-[#00005D]">{transactions}</p>
            <p className="text-xs text-gray-500">Transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
