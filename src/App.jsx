import { jwtDecode } from 'jwt-decode'
import { useContext, useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import ForgetPassword from './AuthModule/Components/ForgetPassword/ForgetPassword'
import Login from './AuthModule/Components/Login/Login'
import ResetPassword from './AuthModule/Components/ResetPassword/ResetPassword'
import Home from './HomeModule/Components/Home/Home'
import Favorites from './RecipesModule/Components/Recipes/Favorites'
import RecipesList from './RecipesModule/Components/Recipes/RecipesList'
import AuthLayout from './SharedModule/Components/AuthLayout/AuthLayout'
import MasterLayout from './SharedModule/Components/MasterLayout/MasterLayout'
import NotFound from './SharedModule/Components/NotFound/NotFound'
import ProtectedRoute from './SharedModule/Components/ProtectedRoute/ProtectedRoute'
import { AuthContext } from './Context/authContext'
import Register from './AuthModule/Components/Register/Register'
import VerficationCode from './AuthModule/Components/VerficationCode/VerficationCode'


function App() {

  let {userData,saveUserData}=useContext(AuthContext);


  let router =createBrowserRouter([
    {
      path:'dashboard',element:(<ProtectedRoute userData={userData}><MasterLayout userData={userData}/></ProtectedRoute>),errorElement:<NotFound/>,children:[
        {index:true,element:<Home userData={userData}/>},
        {path:'favorites',element:<Favorites/>},
        {path:'recipes',element:<RecipesList/>},
      ]
  
    },
    {
      
      path:'/',element:(<AuthLayout/>),errorElement:<NotFound/>,children:[
        {index:true,element:<Login saveUserData={saveUserData}/>},
        {path:'login',element:<Login saveUserData={saveUserData}/>},
        {path:'register',element:<Register saveUserData={saveUserData}/>},
        {path:'forget-password',element:<ForgetPassword/>},
        {path:'reset-password',element:<ResetPassword/>},
        {path:'verify',element:<VerficationCode/>},
      ]
    }
  ])

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}/>
    </>
  )
}

export default App
