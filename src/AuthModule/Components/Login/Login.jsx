import React from 'react'
import logo from '../../../assets/1.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({saveAdminData}) {
  const navigate =useNavigate();
  let {register,handleSubmit,formState:{errors}} =useForm();
  function onSubmit(data) {
    axios.post(`https://upskilling-egypt.com:3002/api/v1/Users/Login`,data)
    .then(result=>{
      toast("success");
      localStorage.setItem("adminTkn",result.data.token)
      saveAdminData();
      navigate("/dashboard");
    })
    .catch(error=>{
      return toast(error?.response.data.message)})
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
            <h2>Log in</h2>
            <p className='text-muted'>Welcome Back! Please enter your details</p>
              <div className="form-group my-3">
              <input placeholder='Enter your email' className="form-control " type='email' {...register("email",{required:true,pattern:/^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/})}/>
              {errors.email?.type=="required"&&<span className='text-danger ps-1'>email is required</span>}
              {errors.email?.type=="pattern"&&<span className='text-danger ps-1'>invalid email</span>}
              </div>
              <div className="form-group mt-3">
              <input  placeholder='password' className="form-control" type='password' {...register("password",{required:true,min:5,max:20})}/>
              {errors.password?.type=="required"&&<span className='text-danger ps-1'>password is required</span>}
              </div>
              <div className="text-end">
              <Link className="text-decoration-none text-success" to="/forget-password"> Forget password?</Link>
              </div>
              <br />
              <button className='btn btn-success w-100'>Login </button>

            </form>
          </div>
        </div>
      </div>

    </div>
  )
}
