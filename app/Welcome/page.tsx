"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

export default function Welcome() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Retrieve username from localStorage
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    } else {
      router.push("/register"); // Redirect if no username found
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#B0B0B0] p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6 text-center border border-gray-300">
        <div className="bg-[url('/images/Frame.png')] bg-cover bg-center text-white flex items-center justify-between m-4 px-4 py-3 rounded-lg">
          <span className="font-bold text-2xl">Mimi-point</span>
          <span className="bg-blue-800 text-white flex items-center justify-center font-bold text-4xl">
            M
          </span>
        </div>

        <div className="m-4 p-5">
          <p className="font-medium mt-4 text-lg">
            Hello{" "}
            <span className=" font-bold uppercase">
              {username || "Guest"}
            </span>
            ,
          </p>

          <p className="mt-3 font-medium">
            Welcome to <span className="font-bold">MIMI-POINT</span>, We’re excited to have you on board! 🎉<br/>
            At MIMI-POINT, we make transactions easier, easy subscriptions, easy
            Airtime Purchase, easy TV Subscription. <br /> Feeling stuck at any
            point? <br /> Kindly reach out to us via: Instagram, Facebook,
            Tiktok, LinkedIn, X (Twitter) <br />
            @InnovationsCybercafe <br />
            And we will be happy to help!
          </p>

          <p className="font-semibold mt-4">Lawson Sorhue</p>
          <p className="font-medium">Founder, Innovations Cybercafe.</p>

          <button
            onClick={() => router.push("/")}
            className="mt-6 bg-[#00005D] text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-900 transition"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="bg-[#EFEFF5] mt-6 p-3">
          <p className="text-sm ">Contact us through any of our Social Media Handles</p>

          <div className="flex justify-center gap-4 mt-3 text-xl">
            <FaInstagram />
            <FaFacebook />
            <FaTiktok />
            <FaLinkedin />
            <FaTwitter />
          </div>
        </div>
      </div>
    </div>
  );
}
