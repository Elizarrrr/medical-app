import NavBar from '@/components/Dashboard/NavBar'
import React, { ReactNode } from 'react'

export default function Layout({children}:{children:ReactNode}) {
  return (
    <div>
        <NavBar/>
        {children}
    </div>
  )
}
