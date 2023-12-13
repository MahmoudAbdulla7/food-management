import React from 'react'
import eating from '../../../assets/eating a variety of foods-amico.png'
import { useLocation } from 'react-router-dom'

export default function Header({userData}) {
  let path=useLocation().pathname?.split("/")[2]
  if (path==null) {
    path="home"
  }
  const headers ={
    home:{
      h2:`Welcome ${userData?.userName}`,
      p:"This is a welcoming screen for the entry of the application , you can now see the options"
    },
    
    favorites:{
      h2:'Favorite Items',
      p:"You can now add your items that any user can order it from the Application and you can edit"
    }
  }
  return (
    <div className="container-fluid rounded-5 header-content p-4 my-2">
          <div className=' px-2 text-light'>
      <div className="row align-items-center ">
        <div className="col-md-10">
          <div>
            <h2 className='titelOfHeader'>
             {headers[path]?.h2}
            </h2>
            <p className='text-muted-light pargraphOfHeader'>{headers[path]?.p}</p>
          </div>
        </div>
        <div className="col-md-2">
          <div>
            <img className='w-100' src={eating} alt="eating" />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
