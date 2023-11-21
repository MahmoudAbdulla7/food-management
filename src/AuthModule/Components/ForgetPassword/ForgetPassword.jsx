import React from 'react'
import logo from '../../../assets/1.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgetPassword() {
  const navigate =useNavigate();
  let {register,handleSubmit,formState:{errors}} =useForm();
  function onSubmit(data) {
    axios.post(`http://upskilling-egypt.com:3002/api/v1/Users/Reset/Request`,data)
    .then(result=>{
      toast(result.data.message);
      navigate("/reset-password");
    })
    .catch(error=>{
      return toast("Email does not exist")})
  }
  return (
    <div className='Auth-container container-fluid'>
      <div className="row bg-overLay vh-100 justify-content-center">
      <div>
        <ToastContainer />
      </div>
        <div className="col-md-6 ">
          <div className='bg-light p-3 rounded-3'>
            <div className="text-center">
            <img src={logo} className='w-25' alt="logo" />
            </div>

            <form className='w-75 m-auto' onSubmit={handleSubmit(onSubmit)}>
            <h2>Request Reset  Password</h2>
            <p className='text-muted'>Please Enter Your Email And Check Your Inbox</p>
              <div className="form-group my-3">
              <input placeholder='Enter your email' className="form-control " type='email' {...register("email",{required:true,pattern:/^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/})}/>
              {errors.email?.type=="required"&&<span className='text-danger ps-1'>email is required</span>}
              {errors.email?.type=="pattern"&&<span className='text-danger ps-1'>invalid email</span>}
              </div>
              <button className='btn btn-success w-100'>Send</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}
