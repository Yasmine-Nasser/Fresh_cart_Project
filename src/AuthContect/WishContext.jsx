import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const WishContext = createContext()

export default function WishlistProvider({children}) {
    const [listDetails , setListDetails] = useState(null)
    const point = `https://ecommerce.routemisr.com/api/v1/wishlist`
    const { accessToken } = useContext(AuthContext)
    const headers = { token: accessToken }
    
    
    async function AddToWishLIst(productId) {
        try {
        const {data} = await axios.post( point , {productId} ,{headers})
        console.log(data);
        setListDetails(data.data)
        return data
        } catch (error) {
            console.log(error);
            return error.response.data.message;
        }
    }

    async function RemoveFromList(productId) {

        try {
            const {data} = await axios.delete(`${point}/${productId}`, {headers})
            console.log(data);
            //setNumOfCartItems(data.numOfCartItems)
            setListDetails(data.data)
            return data;
        } catch (error) {
            console.log(error);
            return error.response.data.message;
            
        }
    }


   /* async function RemoveFromList(productId) {
        try {
        const {data} = await axios.delete(`${point}/${productId}`, {headers})
        console.log(data);
        setListDetails(data.data)
        return data
        } catch (error) {
            console.log(error);
            return error.response.data.message;
            
        }
    }*/


    useEffect(()=> {
        accessToken && GetWishList()
    } , [accessToken])

    async function GetWishList() {
        try {
        const {data} = await axios.get(point , {headers})
        console.log('wish', data);
        setListDetails(data.data)
        return data
        } catch (error) {
            return error
        }
    }

    
    async function GetCart() {
        try {
        const {data} = await axios.get(endPoint , {headers})
        console.log('cart' ,data);
        console.log(data);
        setNumOfCartItems(data.numOfCartItems)
        setCartDetails(data.data)
        return data
        
        } catch (error) {
            console.log(error)            
        }
    }
    return(
        <WishContext.Provider value= {{
            AddToWishLIst ,
            GetWishList,
            listDetails,
            RemoveFromList,
            //AddToCartLIst,
        }}>
            {children}
        </WishContext.Provider>
    )
}

/**
 * 
 * 
    async function AddToCartLIst(productId) {
        try {
        const {data} = await axios.post( AddCart , {productId} ,{headers})
        console.log(data);
        setListDetails(data.data)
        return data
        } catch (error) {
            console.log(error);
            return error.response.data.message;
        }
    }
 */