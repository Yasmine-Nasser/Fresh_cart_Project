import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function CategoryDetails() {
    const [specificCategory , setSpecificCategory] = useState([])
    const {id} = useParams()


   async function GetCategoryDetails(id) {
        try {
            const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>
        {
            GetCategoryDetails(id)
        } , []);

  return (
    <div>
        <h1>category</h1>
    </div>
  )
}

