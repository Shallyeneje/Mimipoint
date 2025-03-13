import React from 'react'
import Dashboard from '@/components/pages/home/dashboard'
import Transactions from '@/components/pages/home/transaction'

const page = () => {
  return (
    <div className='bg-[#EFEFF5]'>
      <Dashboard/>
      <Transactions/>
    </div>
  )
}

export default page