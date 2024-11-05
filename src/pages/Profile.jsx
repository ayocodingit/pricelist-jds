import React from 'react'
import Customer from '../components/Customer'
import Menu from '../components/Menu'

function Profile() {
  return (
    <div className='h-[calc(100dvh)] bg-gray-50 text-sm md:text-lg flex md:justify-center'>
        <div className='flex w-full md:w-1/2 items-center mt-32 flex-col'>
            <Customer></Customer>
        </div>
        <Menu></Menu>
    </div>
  )
}

export default Profile