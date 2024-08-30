import axios from 'axios'
import React, { useEffect, useState } from 'react'
import classes from './SliderCategories.module.css'
import Slider from "react-slick";
import Loader from '../Loader/Loader';

export default function SliderCategories() {
  const [categories, setCategories] = useState([])
  const [error , setError] = useState(null)
  const [isLoading , setIsLoading] = useState(false)


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
  };
  
  async function GetCategories() {
    setIsLoading(true)
    try {
      const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setCategories(data.data)
      console.log(data.data);
      
      setError(null)
    }catch (error) {
      console.log(error);
      setError(error.response.data.message)
      setCategories([])
    }finally{
      setIsLoading(false)
    }
    
  }
  useEffect(()=> {
      GetCategories();
  } , []);

return (
  <>
      <div className="py-20">
        <div className="container mx-auto">
        <Slider {...settings}>
          {categories.map((category)=>(
            <div key={category.id}>
              <img src={category.image}
               className={`mb-2 ${classes.category}`} alt={category.name} />
               <h2>{category.name}</h2>
            </div>
          ))}
    </Slider>
        </div>
      </div>
  </>
)
}