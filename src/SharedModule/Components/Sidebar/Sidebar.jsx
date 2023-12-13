import React, { useState } from 'react';
import { Sidebar as Div, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import ChangePassword from '../../../AuthModule/Components/ChangePassword/ChangePassword';
import logo from '../../../assets/3.png';

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
    localStorage.removeItem("userTkn");
    navigate("/login");
  }
  return (
    <>
    <div className='sidebar'>
    <Div className='vh-100' collapsed={isCollapsed}>
  <Menu>
  <div className='ms-3' onClick={handelToggel}> <img src={logo} className='w-75' alt="logo" /> </div>
  <MenuItem icon={<i className="fa-solid fa-house"></i>} component={<Link to="/dashboard" />}> Home</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-heart"></i>} component={<Link to="/dashboard/favorites" />}> Favorits</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-bowl-rice"></i>} component={<Link to="/dashboard/recipes" />}> Recipes</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-lock"></i>} onClick={handleShow}> Change Password</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-arrow-right-from-bracket"></i> } onClick={logout} >Logout</MenuItem>
  </Menu>
</Div>
<ChangePassword show={show} handleClose={handleClose}/>
    </div>
    </>

  )
}
