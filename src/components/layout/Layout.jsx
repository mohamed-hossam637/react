import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import Nav from '../navbar/Nav'

export default function Layout() {
  return (
    <>
      <Nav />
      <Outlet></Outlet>
      <Footer/>
    </>
  )
}
