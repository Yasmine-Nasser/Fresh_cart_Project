import { flip } from '@popperjs/core';
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react';
import Loader from '../Loader/Loader'
import AllProduct from '../AllProduct/AllProduct';

export default function RecentsProducts() {
  const [products, setProducts] = useState([])
  const [error , setError] = useState(null)
  const [isLoading , setIsLoading] = useState(false)
  
  async function GetRecentsProducts() {
    setIsLoading(true)
    try {
      const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      console.log(data.data)
      setProducts(data.data)
      setError(null)
    }catch (error) {
      console.log(error);
      setError(error.response.data.message)
      setProducts([])
    }finally{
      setIsLoading(false)
    }
    
  }

  useEffect(()=> {
    GetRecentsProducts();
  } , [])
  return (
    <>
      <div className="py-4 px-5">
        <div className="container mx-auto">
          {
          isLoading ? (
          <Loader/>
          ):
          error ? (
          <>
          <div className="container w-screen h-screen">
          <div className='flex flex-wrap justify-center items-center text-green-600'> 
            <span className='text-7xl'>4</span>
            <i className="fa-solid fa-compact-disc fa-spin text-5xl "></i> 
            <span className='text-7xl '>4</span>
          </div>
          <div className='flex flex-col justify-center items-center mt-5 ' >
            <p className='text-6xl text-green-600 mb-3'>PAGE NOT FOUND</p>
            <p className=''>We Looked Everywhere For This Page!</p>
           </div>
          </div>
            </>
          ): (
          <div className='row'>
            {products.map((product) =>(
              <AllProduct key={product.id} product={product}/>
            ))}
          </div>
        )}
        </div>
      </div>
    </>
  )
}



/*
 {products.map((product =>(
              <div className="w-1/4 mb-4 mx-10" key={product.id}>
                <img src={product.imageCover} alt={product.title} className='mb-2'/>
                <span className='text-green-700 mb-2'>{product.category.name}</span>
                <h2 className='text-lg truncate'>{product.title}</h2>
                <div className='flex justify-between text-gray-500 font-light mb-3'>
                  <span>{product.price} EGP</span>
                  <div>
                    <i className='fas fa-star text-yellow-300'></i>
                    <span>{product.ratingAverage}</span>
                  </div>
                </div>
              </div>
            )))}
*/