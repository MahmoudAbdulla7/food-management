import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ChangePassword from '../../../AuthModule/Components/ChangePassword/ChangePassword';
import { Sidebar as Div , Menu, MenuItem } from 'react-pro-sidebar';
import logo from '../../../assets/3.png'

export default function Sidebar() {
  const [show, setShow] = useState(false);
  const [isCollapsed, setisCollapsed] = useState(true);
  function handelToggel() {
    setisCollapsed(!isCollapsed);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const navigate =useNavigate();
  function logout() {
    localStorage.removeItem("adminTkn");
    navigate("/login");
  }
  return (
    <>
    <Div collapsed={isCollapsed}>
  <Menu>
  <MenuItem onClick={handelToggel} icon={<img src={logo} className='w-100' alt="logo" />} > <div className="text-center"> </div> </MenuItem>
  <MenuItem icon={<i className="fa-solid fa-house"></i>} component={<Link to="/dashboard" />}> Home</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-people-group"></i>} component={<Link to="/dashboard/users" />}> Users</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-bowl-rice"></i>} component={<Link to="/dashboard/recipes" />}> Recipes</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-calendar-days"></i>} component={<Link to="/dashboard/categories" />}> Categories</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-lock"></i>} onClick={handleShow}> Change Password</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-arrow-right-from-bracket"></i> } onClick={logout} >Logout</MenuItem>
  </Menu>
</Div>;
<ChangePassword show={show} handleClose={handleClose}/>
    </>

  )
}
