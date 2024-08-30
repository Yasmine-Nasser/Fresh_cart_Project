import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import { useParams } from 'react-router-dom'
import AllProduct from '../AllProduct/AllProduct'



export default function RelatedProduct() {
    const [products, setProducts] = useState([])
    const [error , setError] = useState(null)
    const [isLoading , setIsLoading] = useState(false)
    const {category} = useParams()

    
    async function GetRealatedProducts() {
      setIsLoading(true)
      try {
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
        const res = data.data.filter(product => product.category.name == category)
        setProducts(res)
        console.log(res)
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
        GetRealatedProducts();
    } , []);


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
