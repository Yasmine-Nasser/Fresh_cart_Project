import axios from 'axios'
import React, { useEffect , useContext, useState} from 'react'
import { CartContext } from '../../AuthContect/Cartcontext'

export default function MyOrder() {
  const [order , setOrder] = useState([])
  const {userId} = useContext(CartContext)
  console.log(userId);
  
  async function GetMyOrders() {
    try {
      const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      console.log(data);
      setOrder([])
      return data
    } catch (error) {
      console.log(error);
      return error
      
    }
  }
  useEffect(()=> {
    userId && GetMyOrders()
  } , [userId])
  return (
    <div>
      <section>
        <div className="py-20">
          <div className="container mx-auto">
            <h1 className='text-5xl text-green-600 font-bold text-center mt-40'>Done!</h1>
          </div>
        </div>
      </section>
    </div>
  )
}
