import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from '../../components/shopping-view/Header'

export default function ShoppingLayout() {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
        {/* shopping header */}
        <ShoppingHeader />
        <main className='flex flex-col w-full '>
            <Outlet />
        </main>
         </div>
  )
}
