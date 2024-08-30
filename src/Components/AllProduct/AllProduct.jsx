import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../AuthContect/Cartcontext'
import { toast } from 'react-toastify'
import { WishContext } from '../../AuthContect/WishContext'


export default function AllProduct({product}) {
  const {AddToCart} = useContext(CartContext)
  const {AddToWishLIst} = useContext(WishContext)

  
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
        <div className="w-1/4 px-4 mb-4 product pb-5">
            <Link to={`/details/${product.id}/${product.category.name}`}>
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
            </Link>
            <div className="flex justify-between">
            <button 
              onClick={()=>AddProductToCart(product.id)} className='btn bg-green-600 rounded-lg w-2/3 text-slate-100'>add to cart 
            </button>
            <button 
              onClick={()=>AddToWish(product.id)} className="btn fa-solid fa-heart text-slate-900 text-3xl py-4 me-3">
            </button>
            </div>
            
        </div>
    </>
  )
}
