import axios from "axios";
import {createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext()

export default function CartContextProvider({children}) {
    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [cartDetails ,setCartDetails] = useState(null)
    const [cartId , setCartId] = useState(null)
    const [userId , setUserId] = useState(null)
    const endPoint = `https://ecommerce.routemisr.com/api/v1/cart`;
    const { accessToken } = useContext(AuthContext);
    const headers = {
        token:accessToken
    }
    
    useEffect(()=>{
        accessToken && GetCart();
    }, [accessToken]);

    async function GetCart() {
        try {
        const {data} = await axios.get(endPoint , {headers})
        console.log('cart' ,data);
        console.log(data);
        setNumOfCartItems(data.numOfCartItems)
        setCartDetails(data.data)
        setCartId(data.data._id)
        setUserId(data.data.cartOwner)
        return data
        
        } catch (error) {
            console.log(error)            
        }
    }

    async function AddToCart(productId) {
        try {
        const {data} = await axios.post ( endPoint ,{productId},{headers} )
        console.log(data);
        setNumOfCartItems(data.numOfCartItems)
        setCartDetails(data.data)
        setCartId(data.data._id)
        setUserId(data.data.cartOwner)
        return data;
        } catch (error) {
        console.log(error);
        return error.response.data.message;
        }
    }
    async function RemoveFromCart(productId) {
        try {
            const {data} = await axios.delete(`${endPoint}/${productId}`, {headers})
            console.log(data);
            setNumOfCartItems(data.numOfCartItems)
            setCartDetails(data.data)
            setCartId(data.data._id)
            return data;
        } catch (error) {
            console.log(error);
            
        }
    }

    async function UpdateQuantity(productId, count) {
        try {
            const {data} = await axios.put(`${endPoint}/${productId}`,{count} ,{headers})
            console.log(data);
            setNumOfCartItems(data.numOfCartItems)
            setCartDetails(data.data)
            setCartId(data.data._id)
            return data;
        } catch (error) {
            console.log(error);
            
        }
    }

    async function getPayment(url ,shippingAddress) {
        try {
            const {data} = await axios.post (url , {shippingAddress} , {headers})
            console.log(data)
            return data;
        } catch (error) {
            console.log(error);
            return error.response.data.message;
            
        }
    }
    return(
    <CartContext.Provider value = {{numOfCartItems,
     cartDetails,
        AddToCart,
        GetCart ,
        RemoveFromCart ,
        UpdateQuantity ,
        getPayment,
        cartId,
        userId,
        }}>
        {children}
    </CartContext.Provider>
    )
}