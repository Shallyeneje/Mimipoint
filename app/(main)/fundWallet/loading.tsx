import React from 'react'
import { RiLoader2Fill } from 'react-icons/ri'

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <RiLoader2Fill className="animate-spin text-5xl" />
    </div>
  )
}

export default loading