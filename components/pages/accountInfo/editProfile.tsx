"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUpload, FaHome } from "react-icons/fa";

export default function EditProfile() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    surname: "",
    firstname: "",
    username: "",
    gender: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append("surname", formData.surname);
    formDataToSend.append("firstname", formData.firstname);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("phone", formData.phone);
    if (profileImage) {
      formDataToSend.append("profileImage", profileImage);
    }

    try {
      const response = await fetch("https://your-api-url.com/update-profile", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Error updating profile. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#EFEFF5] p-10">
      <div className="w-64 hidden md:block">
        <h2 className="text-sm font-bold flex items-center gap-2">
          <FaHome size={20} /> Dashboard
        </h2>
      </div>
      <h1 className="text-4xl font-bold text-[#00005D] mt-3">Account Info</h1>
      <p className="text-[16px] font-medium text-[#333385]">Welcome, Gozzy</p>
      <div className="flex justify-center items-center">
        <div className="bg-white m-5 rounded-lg p-[50px] w-full max-w-3xl">
          <h2 className="text-xl font-bold text-[#00005D] mb-4">
            Update User Details
          </h2>

          <form className="grid grid-cols-2 gap-8" onSubmit={handleSubmit}>
            {/* Surname */}
            <div>
              <label className="block text-sm font-medium">Surname</label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                placeholder="Surname"
                className="mt-1.5 block w-full p-2 border rounded-md outline-none text-gray-900 border-[#8A8AB9] focus:ring focus:ring-blue-900"
              />
            </div>

            {/* Firstname */}
            <div>
              <label className="block text-sm font-medium">Firstname</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                placeholder="Firstname"
                className="mt-1.5 block w-full p-2 border rounded-md outline-none text-gray-900 border-[#8A8AB9] focus:ring focus:ring-blue-900"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Gozzy"
                className="mt-1.5 block w-full p-2 border rounded-md outline-none text-gray-900 border-[#8A8AB9] focus:ring focus:ring-blue-900"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="mt-1.5 block w-full p-2 border rounded-md outline-none text-gray-900 border-[#8A8AB9] focus:ring focus:ring-blue-900"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium">Phone number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+234 980 011018"
                className="mt-1.5 block w-full p-2 border rounded-md outline-none text-gray-900 border-[#8A8AB9] focus:ring focus:ring-blue-900"
              />
            </div>

            {/* Profile Picture Upload */}
            <div className="col-span-2 flex items-center gap-6">
              <div className="w-64 h-36 flex flex-col items-center justify-center border-dashed border-2 border-[#8A8AB9] p-4 rounded-lg">
                <label className="flex flex-col items-center cursor-pointer">
                  <FaUpload className="text-[#00005D] text-2xl" />
                  <p className="text-sm text-gray-600 mt-2">
                    Upload Profile Picture
                  </p>
                  <input type="file" className="hidden" onChange={handleImageUpload} />
                </label>
                {profileImage && (
                  <p className="text-sm mt-2 text-gray-600">{profileImage.name}</p>
                )}
              </div>

              <div className="flex flex-col items-start w-60">
                <label className="bg-[#00005D] text-white py-2 px-4 rounded-[6px] text-sm cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg, image/png, image/svg+xml"
                    onChange={handleImageUpload}
                  />
                  Upload an Image
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  Image must not exceed 5MB, <br /> It must be a JPEG, PNG, or SVG
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="col-span-2 flex justify-between mt-4">
              <button
                type="submit"
                className="bg-[#00005D] text-white font-medium py-2 px-4 rounded-md hover:bg-blue-900 flex items-center"
              >
                Submit details
              </button>
              <button
                type="button"
                onClick={() => router.push("/account-info")} // Change this to the correct route
                className="bg-red-600 text-white font-medium py-2 px-4 rounded-md hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
