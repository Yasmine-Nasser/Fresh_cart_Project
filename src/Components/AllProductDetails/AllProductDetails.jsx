import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import { useParams } from 'react-router-dom'
import RelatedProduct from '../RelatedProduct/RelatedProduct'
import Slider from "react-slick";
import { CartContext } from '../../AuthContect/Cartcontext'
import { toast } from 'react-toastify'
import { WishContext } from '../../AuthContect/WishContext'

export default function AllProductDetails() {
  const [productsDetails, setProductDetails] = useState([])
  const [error , setError] = useState(null)
  //const [isLoading , setIsLoading] = useState(false)
  const {id} = useParams()
  const {AddToCart} = useContext(CartContext)
  const {AddToWishLIst} = useContext(WishContext)

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,

  };
  async function GetProductsDetails(id) {
    //setIsLoading(true)
    try {
      const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      console.log(data.data)

      setProductDetails(data.data)
      setError(null)
    }catch (error) {
      console.log(error);
      setError(error.response.data.message)
      setProductDetails([])
    }finally{
      //setIsLoading(false)
    }
    
  }
  useEffect(()=> {
      GetProductsDetails(id);
  } )

  async function AddProductToCart(productId) {
    const res = await AddToCart(productId)
    console.log(res);
    if (res.status === "success") {
      toast.success(res.message,{
        position:'top-center'
      })
    } else{
      toast.error('somthing went wrong',{
        position:'top-center'
      })
    }
  }

  async function AddToWish(productId) {
    const res = await AddToWishLIst(productId)
    console.log(res);
  if (res.status === 'success') {
    toast(res.message , 
    { position:'top-center'}

    )
  }else{
    toast.error('something went wrong', 
      { position:'top-center'}

    )
  }
  
  }
  return (
    <>
    <div className="py-20 ">
      <div className="container mx-auto">
        {
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
        ) : (
          <div className="row ">
            <div className=" w-1/3 p-10">
              <Slider {...settings}>
                  {productsDetails?.images?.map((src , index)=>(
                    <img
                    key={index}
                    src={src} 
                    alt={productsDetails.title}/>
                  ))}
              </Slider>
            </div>
            <div className="w-2/3 flex flex-col pe-10 py-20">
            <span className='text-green-600 mb-3 text-lg'>{productsDetails?.category?.name}</span>
            <h1 className='mb-3 text-2xl font-medium'>{productsDetails.title}</h1>
            <p className='mb-3 text-sm'>{productsDetails.description}</p>
            <div className='flex justify-between text-gray-500 mb-3'>
            <span className='ms-3' >{productsDetails.price} EGP</span>
            <i className='fas fa-star text-yellow-300'><span>{productsDetails.ratingsAverage}</span></i>
            </div>
            <button onClick={()=> AddProductToCart(productsDetails.id)} className='btn bg-green-600 w-100 text-slate-100 py-2 rounded-lg'> add to cart</button>
            <div className='hover:text-green-600 text-lg'>
              <button onClick={()=> AddToWish(productsDetails.id)}>
              <i className="fa-solid fa-heart text-2xl ms-20 py-4 mt-5 "></i>
              <span className='text-md'> Add to wish list</span>
              </button>
              
            </div>
            </div>
          </div>
        )
      }
      </div>
    </div>
    <RelatedProduct/>
    </>
  )
}