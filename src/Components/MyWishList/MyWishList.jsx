import React, { useContext, useEffect } from 'react'
import { WishContext } from '../../AuthContect/WishContext'
import { AuthContext } from '../../AuthContect/AuthContext'
import { toast } from 'react-toastify'
import { CartContext } from '../../AuthContect/Cartcontext'
//import Loader from '../Loader/Loader'

export default function MyWishList() {
  const {GetWishList ,
          listDetails ,
          setListDetails,
          RemoveFromList,
  } = useContext(WishContext)
  const {accessToken} = useContext(AuthContext)
  const {AddToCart} = useContext(CartContext)
  //const [error , setError] = useState(null)
  //const [isLoading , setIsLoading] = useState(false)

  async function GetListDetails() {
  const res = await GetWishList()
  if (res.status === 'success') {
    setListDetails(res.data)
    console.log(res.data);
  }else{
    console.log(res);
  }
  }

  /*async function RemoveProductsFromCart(productId) {
    const res = await RemoveFromCart(productId);
    
    if (res.status == 'success') {
        //GetCartDetails()
        toast.success('Product Removed Successfully')
    }else {
        toast.error('Somthing went wrong')
    }
    }*/


  async function RemoveProductsFromList(productId) {
  const res = await RemoveFromList(productId)

  if (res.status == 'success') {
    console.log(res.data);
    //setListDetails(res.data)
    toast.success('Product Removed Successfully' ,{
      position:'top-center'
    })
  }else {
    toast.error('something went wrong' ,{
      position:'top-center'
      
    })
  }
  }

  async function AddToCArt(productId) {
  const res = await AddToCart(productId)
  if (res.status == 'success') {
    console.log(res.data);
    //setListDetails(res.data)
    toast('Product Added to cart Successfully' , {
      position:'top-center'
    })
  }else{
    toast.error('something went wrong' ,{
      position:'top-center'
      
    })
  }
    
  }

  useEffect(()=> {
    accessToken && GetListDetails()
  } , [accessToken])


  return (
<section>
  <div className="py-20">
    <div className="container mx-auto">
        <h1 className='text-green-500 text-center font-bold text-4xl my-7'>Wish List</h1>
        {listDetails && (
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center">
                        <tr className='border-2 border-gray-100'>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className=" py-3">
                                Price
                            </th>
            
                        </tr>
                    </thead>
                      {listDetails.map((product) => (
                        <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="p-4">
                            <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.title} />
                          </td>
                          <td className="px-6 text-center py-4 font-bold text-gray-900 dark:text-white">
                          {product.title}
                          </td>
                          <td className="px-6 py-4 text-center font-semibold text-green-700 dark:text-white">
                              {product.price} L.E
                          </td>
                          <td className=" py-4 ">
                            <button
                            onClick={()=> AddToCArt(product.id)}
                            className="font-medium ms-20 text-green-600 p-2 rounded-lg border-2 border-green-600">Add to Cart</button>
                          </td>
                          <td className=" py-4">
                            <button 
                            onClick={()=> RemoveProductsFromList(product.id)}
                            className="font-medium text-red-600  p-2 rounded-lg border-2 border-red-600">Remove cart</button>
                          </td>
                        </tr>
                      ))}
                </table>
          </div>
        )}

        </div>
      </div>
    </section>
      )
      }
