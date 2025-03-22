import React from 'react'
import DataDashboard from '@/components/pages/Data/DataDashboard'
import { Import } from 'lucide-react'
import Transactions from '@/components/shared/transactions'

// import Databoard from '@/components/pages/Data/DataDashboard'
const page = () => {
  return (
    <div>
      <DataDashboard />
      <Transactions />
      {/* <Databoard/> */}
    </div>
  )
}

export default page