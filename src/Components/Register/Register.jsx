import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthContect/AuthContext'

export default function Register() {
  const [error,setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const Navigate = useNavigate()
  const { setAccessToken } =useContext(AuthContext)


  const initial = {
    email:"",
    name:"",
    password:"",
    rePassword:"",
    phone:"",
  };

  const validationSchema =Yup.object().shape({
    email:Yup.string().email().required("Please Enter Your Email Address! Ex: youremail@example.com"),
    name:Yup.string().min(3).max(20).required("name is a required field"),
    password:Yup.string()/*.matches()*/.min(4).max(16).required("Your Password Is Invalid"),
    rePassword:Yup.string().oneOf([Yup.ref("password")]).required("Your Re-password Is Invalid"),
    phone:Yup.string().matches().required(),
  })
  const formik= useFormik({
    initialValues: initial,
    onSubmit:HandleRegister,  
    validationSchema,
  }); 

  async function HandleRegister(values){
    console.log('Submit', values)
    setIsLoading(true)
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,

        values
      );
    
        console.log(data);
        ///success
        if(data.message === 'success') {
          setAccessToken(data.token)
          localStorage.setItem("accessToken" , data.token);
          Navigate('login')
        }
    } catch (error) {
      console.log(error.message);
      setError(error.response.data.message)
    } finally{
      setIsLoading(false)
    }
    
  }
  return(
    <>
    <div>
      <h1 className='reg font-bold text-3xl mx-20 mt-10 pt-10'>Register Now:</h1>
    </div>
    {error&& <div className='alert alert-error max-w-md mx-20'>{error}</div>}
    <form className="max-w-md mx-auto mb-10" onSubmit={formik.handleSubmit}>
  <div className="relative z-0 w-full mb-5 group">
      <input type="email"
       name="email"
        id="email" 
        className="block px-0 w-full py-7  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-200 appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
         placeholder="" 
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.email}/>
      <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
      Email address
      </label>
      {formik.errors.email && formik.touched.email &&(
          <div className='alert alert-error'>{formik.errors.email}</div>
        )}
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" name="password" id="password"
         className="block px-0 w-full py-7  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-200 appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
          placeholder=""
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}/>
      <label  className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
      {formik.errors.password && formik.touched.password &&(
          <div className='alert alert-error'>{formik.errors.password}</div>
        )}
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="password"
       name="rePassword"
        id="rePassword"
         className="block px-0 w-full py-7  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-200 appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
          placeholder=" "        
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.rePassword}/>
      <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
      {formik.errors.rePassword && formik.touched.rePassword &&(
          <div className='alert alert-error'>{formik.errors.rePassword}</div>
        )}
  </div>
    <div className="relative z-0 w-full mb-5 group">
        <input type="text"
         name="name"
          id="name" 
          className="block px-0 w-full py-7  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-200 appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
           placeholder=""     
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
           value={formik.values.name}/>
        <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Name</label>
        {formik.errors.name && formik.touched.name &&(
          <div className='alert alert-error'>{formik.errors.name}</div>
        )}
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input type="tel"
         //pattern="" 
         name="phone"
          id="phone" 
          className="block px-0 w-full py-7  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-200 appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
           placeholder=""
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.phone}/>
        <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
        {formik.errors.phone && formik.touched.phone &&(
          <div className='alert alert-error'>{formik.errors.phone}</div>
        )}
    </div>
    
  <button 
  disabled={!(formik.isValid&& formik.dirty)}
  type="submit" className="btn text-xl text-white bg-green-700 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-700 font-medium rounded-lg w-full sm:w-auto px-20 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    {isLoading? 
    <i className='fas fa-spinner fa-spin'></i>
    :"Register"}</button>
    </form>
    </>
  )
}