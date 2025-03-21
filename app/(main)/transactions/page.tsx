import Transactions from '@/components/shared/transaction'
import React from 'react'
import { FaHome } from 'react-icons/fa'

const page = () => {
  return (
   <div className="min-h-screen bg-[#EFEFF5] p-8 mt-10">
         <div className="w-64  hidden md:block">
           <h2 className="text-sm font-bold flex items-center gap-2">
             <FaHome size={20} /> Dashboard
           </h2>
         </div>
         <h1 className="text-4xl font-bold text-[#00005D] mt-3">
           Transactions
         </h1>
         <p className="text-[16px] font-medium text-[#333385]">
           pay for your Favourite TV provider and enjoy your favourite shows
         </p>

         <Transactions/>
    </div>
  )
}

export default page