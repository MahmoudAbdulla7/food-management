import React from 'react'
import logo from '../../../assets/1.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useRef } from 'react';

export default function ResetPassword({saveAdminData}) {
  const navigate =useNavigate();
  // const [newPassword, setnewPassword] = useState('');
  // function newPasswordValue(e) {
  //   setnewPassword(e.target.value);
  // }

  let {register,handleSubmit,formState:{errors},watch} =useForm();
  const password = useRef({});
  password.current = watch('newPassword', '');

  function onSubmit(data) {
    axios.post(`http://upskilling-egypt.com:3002/api/v1/Users/Reset`,data)
    .then(result=>{
      toast("success");
      navigate("/login");
    })
    .catch(error=>{
      return toast(error?.response.data.message)
      
    })
  }
  return (
    <div className='Auth-container container-fluid'>
      <div className="row bg-overLay vh-100 justify-content-center">
      <div>
        
      </div>
        <div className="col-md-6 ">
          <div className='bg-light p-3 rounded-3'>
            <div className="text-center">
            <img src={logo} className='w-25' alt="logo" />
            </div>

            <form className='w-75 m-auto' onSubmit={handleSubmit(onSubmit)}>
            <h2> Reset  Password</h2>
            <p className='text-muted'>Please Enter Your Otp  or Check Your Inbox</p>
              <div className="form-group my-3">
              <input placeholder='Enter your email' className="form-control " type='email' {...register("email",{required:true,pattern:/^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/})}/>
              {errors.email?.type=="required"&&<span className='text-danger ps-1'>email is required</span>}
              {errors.email?.type=="pattern"&&<span className='text-danger ps-1'>invalid email</span>}
              </div>
              <div className="form-group mt-3">
              <input  placeholder='OTP' className="form-control" type='text' {...register("seed",{required:true})}/>
              {errors.seed?.type=="required"&&<span className='text-danger ps-1'>OTP is required</span>}
              {errors.seed?.type=="minLength"&&<span className='text-danger ps-1'>OTP must be 6 digits</span>}
              {errors.seed?.type=="maxLength"&&<span className='text-danger ps-1'>OTP must be 6 digits</span>}
              </div>
              <div className="form-group my-3">
              <input  placeholder='Enter your new password' className="form-control" name='password' type='password'{...register("password",{required:true,minLength:6})}  />
              {errors.password?.type=="required"&&<span className='text-danger ps-1'> new password is required</span>}
              {errors.password?.type=="minLength"&&<span className='text-danger ps-1'> Password must have at least 6 characters</span>}
              </div>
              <div className="form-group my-3">
              <input  placeholder='Confirm password' className="form-control" type='password' {...register("confirmPassword",{required:'confirm password is required',validate:(value)=>  value == password.current || 'Passwords do not match'})} />
              {errors.confirmPassword&&<span className='text-danger ps-1'>{errors.confirmPassword.message}</span>}
              </div>
              <button className='btn btn-success w-100'>ResetPassword </button>

            </form>
          </div>
        </div>
      </div>

    </div>
  )
}
