import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
export default function MasterLayout({userData}) {
  return (
    <>

        <div className="d-flex w-100">
                <Sidebar/>
            <div className="w-100 p-4">
                <div>
                    <Navbar userData={userData}/>
                    <Outlet/>
                    
                </div>
            </div>
        </div>

    </>
  )
}
