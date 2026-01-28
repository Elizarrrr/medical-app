import React, { ReactNode } from 'react'

export default function Layout({children}:{children:ReactNode}) {
  return (
    <div>
        <h2>I am dashboard only pages layout</h2>
        {children}
    </div>
  )
}
