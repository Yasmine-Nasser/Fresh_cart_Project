import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthContect/AuthContext'
import { CartContext } from '../../AuthContect/Cartcontext'
import { toast } from 'react-toastify'


export default function checkOut() {
  const {getPayment , cartId } = useContext(CartContext)
  const [isLoading, setIsLoading] = useState(false)
  const Navigate = useNavigate()
  const { setAccessToken } = useContext(AuthContext)


  const initial = {
    details: "",
    phone: "",
    city: ""
  };


  const formik= useFormik({
    initialValues: initial,
    onSubmit  : handleCheckOut,
  }); 


  async function handleCheckOut(values){
    console.log(cartId);
    console.log('submit' , values)
    const url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`
    const res =  await getPayment(url , values)
    if (res.status === 'success') {
      toast.success('Payment done successfully')
      console.log(res.session.url);
      window.location.href = res.session.url
      console.log('data' , res);
      
    }
  }
  return(
     <>
    <div>
      <h1 className='text-sky-400 flex justify-center items-center font-bold text-4xl mx-20 my-10 pt-10'>Check out</h1>
    </div>
    <form className="max-w-md mx-auto text-xs" onSubmit={formik.handleSubmit}>
    <div className="relative z-0 w-full mb-5 group">
        <input type="text"
         name="details"
          id="details" 
          className="block py-7 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-900 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
           placeholder=" "     
            onChange={formik.handleChange }
            onBlur={formik.handleBlur}
           value={formik.values.details}/>
        <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-sky-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
        {formik.errors.name && formik.touched.name &&(
          <div className='alert alert-error'>{formik.errors.name}</div>
        )}
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input type="tel"
         //pattern="" 
         name="phone"
          id="phone" 
          className="block py-7 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-900 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
           placeholder=" "
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.phone}/>
        <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-sky-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number (123-456-7890)</label>
        {formik.errors.phone && formik.touched.phone &&(
          <div className='alert alert-error'>{formik.errors.phone}</div>
        )}
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input type="text"
         //pattern="" 
         name="city"
          id="city" 
          className="block py-7 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-900 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
           placeholder=" "
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.city}/>
        <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-sky-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your City</label>
        {formik.errors.city && formik.touched.city &&(
          <div className='alert alert-error'>{formik.errors.phone}</div>
        )}
    </div>
    
  <button
  onClick={()=> handleCheckOut}
  type="submit" className="check btn text-xl hover:text-white hover:bg-sky-400 focus:ring-1 focus:outline-none focus:ring-sky-400 font-medium rounded-lg w-full sm:w-auto px-20 py-2.5 text-center dark:bg-sky-400 dark:hover:bg-sky-400 dark:focus:ring-sky-400">
    {isLoading? 
    <i className='fas fa-spinner fa-spin'></i>
    :"Pay Now"}</button>
    </form>
    </>
  )
}