import React from 'react'
import AirtimeDashboard from '@/components/pages/Airtime/airtimeDashboard'
import Transactions from '@/components/shared/transactions'

const page = () => {
  return (
    <div>
      <AirtimeDashboard />
      <Transactions />
    </div>
  )
}

export default page