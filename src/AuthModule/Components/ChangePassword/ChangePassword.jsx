import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import logo from '../../../assets/1.png';
import axios from 'axios';
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function ChangePassword({show,handleClose}) {
  let {register,handleSubmit,formState:{errors}} =useForm();
  const [newPassword, setnewPassword] = useState('');
  const navigate =useNavigate()
  function newPasswordValue(e) {
    setnewPassword(e.target.value);
  }
  //api intgration
  function onSubmit(data) {
    axios.put(`http://upskilling-egypt.com:3002/api/v1/Users/ChangePassword`,data,
    {headers:{Authorization:`Bearer ${localStorage.getItem(`adminTkn`)}`}})
    .then(result=>
      //toast && navigate
{      toast(result.data.message)
      navigate("/login")}
      ).catch(error=>
        //handel error
        toast("Invalid password"))
  }


  return (
    <>
      <Modal className='p-5' show={show} onHide={handleClose}>
        <Modal.Header >
        <div>
            <div className="logo text-center">
            <img src={logo} className='w-50' alt="" />
            </div>
            <h3>Change Password</h3>
            <p className='text-muted'>Enter your details below</p>
            <form onSubmit={handleSubmit(onSubmit)} >
              <div className="form-group my-3">
              <input placeholder='Enter your Old password' className="form-control " type='password' {...register("oldPassword",{required:true,minLength:6,maxLength:20})} />
              {errors.oldPassword?.type=="required"&&<span className='text-danger ps-1'>password is required</span>}
              {errors.oldPassword?.type=="minLength"&&<span className='text-danger ps-1'>password is required</span>}
              </div>
              <div className="form-group my-3">
              <input  placeholder='Enter your new password' className="form-control" name='newPassword' type='password'{...register("newPassword",{required:true,minLength:6})} onChange={newPasswordValue}  />
              {errors.newPassword?.type=="required"&&<span className='text-danger ps-1'> new password is required</span>}
              {errors.newPassword?.type=="minLength"&&<span className='text-danger ps-1'> Password must have at least 6 characters</span>}
              </div>
              <div className="form-group my-3">
              <input  placeholder='Confirm password' className="form-control" type='password' {...register("confirmNewPassword",{required:true,validate:value=> value==newPassword})} />
              {errors.confirmNewPassword?.type=="required"&&<span className='text-danger ps-1'>confirm new password is required</span>}
              {errors.confirmNewPassword?.type=="validate"&&<span className='text-danger ps-1'>confirm password is mismatch new password</span>}
              <button className='btn btn-success my-3 w-100' >Change Password </button>
              </div>

            </form>
        </div>
        </Modal.Header>
      </Modal>
    </>
  );
}