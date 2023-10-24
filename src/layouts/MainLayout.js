import React from 'react'
import Navigation from '../components/Navigation'
export default function MainLayout({children}) {
  return (
    <>
        <Navigation/>
        {children}
    </>
  )
}
