import React, { useState,useRef } from 'react'
import logo from '../../../assets/1.png';
import axios, { useForm ,Link,useNavigate,toast,customFetch } from "../../../utls/index";
import Loading from '../../../SharedModule/Components/Loading/Loading';
import { useContext } from 'react';
import {AuthContext} from '../../../Context/authContext'
export default function Register() {

    const {url}=useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false)

    let {register,handleSubmit,formState:{errors},watch} =useForm();
    const password =useRef({});
    password.current=watch("password","")
    let navigate=useNavigate();
    function onSubmit(data) {
        setIsLoading(true)
        const formData = new FormData();
        Object.entries(data).forEach(([key,value])=>{
            if (key=="profileImage") {
                formData.append(key,value[0]);
            }else{
                formData.append(key,value);
            }
        })
        axios.post(`${url}Users/Register`,formData).then(res=>{toast.success(res.data.message);
            setIsLoading(false)
            navigate("/verify");
        })
        .catch(err=>{
            setIsLoading(false)
            toast.error(err.response.data.message || "failed")})
      }

  return (
    <div className='Auth-container container-fluid'>
    <div className="row bg-overLay vh-100 justify-content-center">
    <div>
    </div>
      <div className="col-md-6">
        <div className='bg-light p-3 rounded-3'>
          <div className="text-center">
          <img src={logo} className='w-25' alt="logo" />
          </div>

          <form className='w-100 m-auto' onSubmit={handleSubmit(onSubmit)}>
          <h2>Register</h2>
          <p className='text-muted'>Welcome Back! Please enter your details</p>
          <div className="row">
          <div className="col-md-6 form-group userName my-2">
            <input placeholder='UserName' className="form-control " type='userName' {...register("userName",{required:"userName is required",pattern:/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/ || "Username should start with characters and end with numbers"})}/>
            {errors.userName&&<span className='text-danger ps-1'>{errors.userName.message}</span>}
            {errors.userName?.type=="pattern"&&<span className='text-danger ms-2 '>should start with characters and end with numbers</span>}

            </div>
          <div className="col-md-6 form-group email my-2">
            <input placeholder='Enter your E-mail' className="form-control " type='email' {...register("email",{required:"email is required",pattern:/^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/ ||"invalid email"})}/>
            {errors.email&&<span className='text-danger ps-1'>{errors.email.message}</span>}
            </div>

          <div className="col-md-6 form-group country  my-2">
            <input placeholder='country' className="form-control " type='country' {...register("country",{required:"country is required"})}/>
            {errors.country &&<span className='text-danger ps-1'>{errors.country.message}</span>}
            </div>

          <div className="col-md-6 form-group phoneNumber  my-2">
            <input placeholder='Phone Number' className="form-control " type='phoneNumber' {...register("phoneNumber",{required:"phoneNumber is required",pattern: /^\d{11}$/})}/>
            {errors.phoneNumber &&<span className='text-danger ps-1'>{errors.phoneNumber.message}</span>}
            {errors.phoneNumber?.type=="pattern" &&<span className='text-danger ps-1'>invalid phone number</span>}
            </div>
            {/*  */}
            <div className="col-md-6 form-group password my-2">
            <input  placeholder='password' className="form-control" type='password' {...register("password",{required:"password is required"})}/>
            {errors.password&&<span className='text-danger ps-1'>{errors.password.message}</span>}
            </div>

            <div className="col-md-6 form-group confirmPassword my-2">
            <input  placeholder='Confirm Password' className="form-control" type='password'  {...register("confirmPassword", {
                    required: "confirm new password is required",
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}/>
            {errors.confirmPassword&&<span className='text-danger ps-1'>{errors.confirmPassword.message}</span>}
            </div>

            <div className="form-group profileImage my-2">
                <span className='ms-2 fw-medium' htmlFor="profileImage">Add Profile Image</span>
            <input  placeholder='Profile Image' name='profileImage' className="form-control" type='file'  {...register("profileImage", {
                    required: "Profile Image Is Required"})}/>
            {errors.profileImage&&<span className='text-danger ps-1'>{errors.profileImage.message}</span>}
            </div>
          </div>
            <br />
            <div className="text-end">

            <Link className="text-decoration-none text-success ms-2" to="/login">Login Now?</Link>
</div>
            <div className="registration text-center">
            <button className='btn btn-success w-50'>{isLoading?<Loading/>: <span>Register</span>} </button>
            </div>

          </form>
        </div>
      </div>
    </div>

  </div>
  )
}
