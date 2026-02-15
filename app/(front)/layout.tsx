import MegaMenu from '@/components/Frontend/MegaMenu'
import Navbar from '@/components/Frontend/Navbar'
import React, { ReactNode } from 'react'

export default function Layout({children}:{children:ReactNode}) {
  return (
    <div className='bg-white'>
        <Navbar/>
        <div className="bg-white py-4 fixed top-20 w-full left-0 z-50 right-0 border-t border-gray-400/30">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <MegaMenu/>
          </div>
        </div>
        {children}
    </div>
  )
}
