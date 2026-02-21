import NavBar from '@/components/Dashboard/NavBar'
import Sidebar from '@/components/Dashboard/Sidebar'
import React, { ReactNode } from 'react'

export default function Layout({children}:{children:ReactNode}) {
  return (
    <div>
        <NavBar/>
        <Sidebar/>
        {children}
    </div>
  )
}
