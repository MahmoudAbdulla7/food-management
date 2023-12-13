import React, { useRef,useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../../assets/1.png';
import axios, { useForm,toast,customFetch,useNavigate } from "../../../utls/index";
import Loading from '../../../SharedModule/Components/Loading/Loading';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/authContext';
export default function VerficationCode() {
  const navigate =useNavigate();
  const [isLoading, setisLoading] = useState(false);
  let {url}=useContext(AuthContext);
  let {register,handleSubmit,formState:{errors}} =useForm();

  function onSubmit(data) {
    setisLoading(true)
    axios.put(`${url}Users/verify`,data)
    .then(result=>{
      toast("success");
      setisLoading(false)
      navigate("/login");
    })
    .catch(error=>{
      setisLoading(false)
      return toast(error?.response.data.message);
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
            <h4>Verify Your Account</h4>
            <p className='text-muted'>Please Enter Your Verification Code  or Check Your Inbox</p>
              <div className="form-group my-3">
              <input placeholder='Enter your email' className="form-control " type='email' {...register("email",{required:"email is required",pattern:/^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/})}/>
              {errors.email&&<span className='text-danger ps-1'>{errors.email.message||"invalid email"}</span>}
              </div>
              <div className="form-group mt-3">
              <input  placeholder='Code' className="form-control" type='text' {...register("code",{required:true})}/>
              {errors.code?.type=="required"&&<span className='text-danger ps-1'></span>}
              </div>
              <button className='btn btn-success my-2 w-100'>{isLoading?<Loading/>:<span>Verify</span>} </button>

            </form>
          </div>
        </div>
      </div>

    </div>
  )
}
