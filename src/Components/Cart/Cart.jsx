import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../AuthContect/Cartcontext'
import { AuthContext } from '../../AuthContect/AuthContext'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function Cart() {
    const {GetCart,
    cartDetails,
    setCartDetails,
    numOfCartItems,
    UpdateQuantity,
    RemoveFromCart,
} = useContext(CartContext)
    const {accessToken} = useContext(AuthContext)

  async function GetCartDetails() {
    const res = await GetCart();
    if (res.status== 'success' ) {
      console.log(res.data.products);
      setCartDetails(res.data)
    }else{
      console.log(res);
      
    }
  }


    async function RemoveProductsFromCart(productId) {
    const res = await RemoveFromCart(productId);
    
    if (res.status == 'success') {
        //GetCartDetails()
        toast.success('Product Removed Successfully')
    }else {
        toast.error('Somthing went wrong')
    }
    }

    async function UpdataProductItems(productId , count) {
    const res = await UpdateQuantity(productId, count)
    if (res.status == 'success') {
        //GetCartDetails()
        toast.success('Quantity Updated Successfully')
    }else {
        toast.error('Somthing went wrong')
    }
    }
    useEffect(()=>{
        accessToken && GetCartDetails();
    }, [accessToken])



    return (
    <section>
        <div className="py-20">
            <div className="container mx-auto">
                <h1>Wish List</h1>
                {cartDetails && (
                    <>
                <div className='flex flex-wrap justify-between py-10'>
                    <h4 className='text-lg font-semibold shadow shadow-green-300 p-2 mx-20'>total number of items: <span className='text-green-600'>{numOfCartItems}</span></h4>
                    <h4 className='text-lg font-semibold shadow shadow-green-300 p-2 mx-20'>Total Price: <span className='text-green-600'>{cartDetails.totalCartPrice} L.E</span></h4>
                    <Link to={"/checkout"} className='btn bg-green-700 py-2 px-3 rounded-xl text-slate-100 mx-20'>Checkout</Link>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-sm text-slate-950">
                <tr className=''>
                    <th scope="col" className="px-16 py-3">
                    Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                        product
                        </th>
                        <th scope="col" className="px-6 py-3">
                        Quatinty
                        </th>
                        <th scope="col" className="px-6 py-3">
                        Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                        Action
                        </th>
                </tr>
                </thead>
                {cartDetails.products.map((product)=> (
                <tr
                key={product.product.id} 
                className="bg-white border-b dark:bg-green-300 rounded-2xl dark:border-green-300 hover:bg-green-300 dark:hover:bg-green-300">
                <td 
                    className="p-4">
                    <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title}/>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.product.title}
                </td>
                <td className="px-6 py-4">
                <div className="flex items-center">
                    <button 
                    onClick={()=> UpdataProductItems(product.product.id , product.count -1) }
                    className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button">
                    <span className="sr-only">Quantity button</span>
                <svg className="w-3 h-3" 
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2">
                    <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h16"/>
                </svg>
                </button>
                <div>
                <span>{product.count}</span>
                </div>
                <button
                onClick={()=> UpdataProductItems(product.product.id , product.count +1) }
                className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button">
                <span className="sr-only">Quantity button</span>
                <svg className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18">
                <path stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"/>
            </svg>
    </button>
    </div>
    </td>
    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
    {product.price}
    </td>
    <td className="px-6 py-4">
    <button onClick={() => RemoveProductsFromCart(product.product.id)}
    className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove
    </button>
    </td>
    </tr>
        ))}




            </table>
        </div>
            </>)}
        </div>
    </div>
    </section>
    )
}