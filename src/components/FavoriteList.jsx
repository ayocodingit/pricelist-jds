import React from 'react'

function FavoriteList({products}) {
  return (
    <div className='overflow-auto grid grid-flow-col gap-4 my-2'>
      {products.map((product, index) => {
        return (
          <div key={index} className='flex flex-col bg-white rounded-md shadow-lg justify-center p-2 gap-5'>
            <img src={product.image} alt="image" className='object-contain min-w-40 h-40' />
            <p className='text-nowrap text-ellipsis overflow-hidden w-full text-sm'>{ product.name }</p>
          </div>
        )
      })}
    </div>
  )
}

export default FavoriteList