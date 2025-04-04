"use client";
import Link from "next/link";
import { FiCalendar, FiPhoneCall } from "react-icons/fi";
import { FaShoppingCart, FaHome } from "react-icons/fa";
import { PencilIcon } from "lucide-react";
import { CgGenderFemale } from "react-icons/cg";
import { CgGenderMale } from "react-icons/cg";
import { MdOutlineTransgender } from "react-icons/md";
import { HiOutlineMailOpen } from "react-icons/hi";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import PageHeader from "@/components/shared/pageheader";

const ProfileCard = () => {
  const { user } = useUser();

  // from the backend
  const role = "Customer";
  const gender = "Male";
  const dateJoined = "4th Dec, 2025";
  
  const balance = 765;
  const transactions = 34;

  // Safe gender icon function
  const getGenderIcon = (gender?: string) => {
    if (!gender) return <MdOutlineTransgender size={23} />; // Default icon
    const lowerGender = gender.toLowerCase();
    if (lowerGender === "male") return <CgGenderMale size={23} />;
    if (lowerGender === "female") return <CgGenderFemale size={23} />;
    return <MdOutlineTransgender size={23} />; // Non-binary or unspecified
  };

  return (
    <div className="min-h-screen bg-[#EFEFF5] p-8 mt-3">
      <PageHeader
        icon={<FaHome size={20} />}
        title="Dashboard"
        subtitle="Account Info"
        description="view and manage your Profile from here"
      />

      {/* Profile Card */}
      <div className="min-h-screen bg-[#EFEFF5] p-8 flex justify-center items-center">
        <div className="w-full max-w-[552px] bg-white rounded-xl overflow-hidden border border-gray-200 p-8">
          {/* Header */}
          <div className="bg-[#C5C5E1] p-6 rounded-lg flex flex-col items-center relative">
            <>
              {user?.imageUrl ? (
                <div className="w-[70px] h-[70px] rounded-full bg-gray-200 outline-4 outline-white overflow-hidden">
                  <Image
                    src={user.imageUrl}
                    alt="Profile image"
                    height={76}
                    width={76}
                    quality={100}
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-[70px] h-[70px] rounded-full bg-gray-200 outline-4 outline-white flex items-center justify-center text-lg font-semibold">
                  {user?.firstName?.charAt(0)}
                </div>
              )}
            </>
            <Link href="/account-info/editProfile">
              <PencilIcon className="absolute top-4 right-4 text-gray-600 cursor-pointer hover:text-gray-800" />
            </Link>
          </div>

          {/* Profile Info */}
          <div className="text-center mt-4">
            <h2 className="text-2xl font-bold text-[#00005D]">
              {user?.firstName ? user?.firstName : "Not available"}{" "}
              {user?.lastName}
            </h2>
            <p className="text-[#333385] text-sm font-bold">
              @{user?.username ? user?.username : "<username>"}
            </p>
            <span className="bg-[#EFEFF5] text-[#333385] px-3 py-1 rounded-full text-xs font-semibold mt-3 inline-flex items-center gap-1">
              <FaShoppingCart /> {role}
            </span>
          </div>

          {/* Details */}
          <div className="mt-4 border-t border-b border-[#333385] py-4 space-y-2 text-[#545498] text-sm">
            <div className="flex items-center gap-1">
              <div className="inline-flex items-center gap-1 font-bold">
                {getGenderIcon(gender)} Gender:
              </div>{" "}
              {gender}
            </div>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1 font-bold">
                <FiPhoneCall size={15} /> Contact:
              </div>{" "}
              {user?.primaryPhoneNumber?.phoneNumber || "Not Provided"}
            </div>

            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1 font-bold">
                <HiOutlineMailOpen size={15} /> Email:
              </div>{" "}
              {user?.primaryEmailAddress?.emailAddress}
            </div>

            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1 font-bold">
                <FiCalendar size={15} /> Date joined:
              </div>{" "}
              {dateJoined}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-[#F5F5FA] p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-[#00005D]">₦{balance}</p>
              <p className="text-xs text-gray-500">Amount in Wallet</p>
            </div>
            <div className="bg-[#F5F5FA] p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-[#00005D]">
                {transactions}
              </p>
              <p className="text-xs text-gray-500">Transactions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
