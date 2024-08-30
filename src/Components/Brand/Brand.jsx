import axios from 'axios'
import React, { useEffect, useState } from 'react'
import classes from './Brands.module.css'
import Loader from '../Loader/Loader';


export default function Brand(product) {
  const [brands, setBrands] = useState([])
  const [error , setError] = useState(null)
  const [isLoading , setIsLoading] = useState(false)




  
  async function GetBrand() {
    setIsLoading(true)
    try {
      const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
      setBrands(data.data)
      console.log(data.data);
      setError(null)
    }catch (error) {
      console.log(error);
      setError(error.response.data.message)
      setBrands([])
    }finally{
      setIsLoading(false)
    }
  }


  useEffect(()=> {
    GetBrand();
  } , []);

return (
  <> 
      <div className="py-20">
        <div className="container mx-auto">
          {
            isLoading ? (
              <Loader/>
            ):
            error ? (
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
            ) :(
              <div className='row'>
                <div className=" flex flex-wrap justify-center items-center" >
              {brands.map((product)=>(
                <div key={product.id} className= {`w-1/5 m-1 shadow-sm pb-2 shadow-gray-400 ${classes.cart}`}>
                  <img src={product.image} className={`my-4 ${classes.brand}`} alt={product.name} />
                  <h2 className='text-center pb-3'>{product.name}</h2>
                </div>
              ))}
              </div>
            </div>
            )
          }

        </div>
      </div>
  </>
)
}

