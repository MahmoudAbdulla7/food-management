import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
export default function MasterLayout({adminData}) {
  return (
    <>
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2 p-0">

                <Sidebar/>

            </div>
            <div className="col-md-10 p-0">
                <div>
                    <Navbar adminData={adminData}/>
                    <Header/>
                    <Outlet/>
                    
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
