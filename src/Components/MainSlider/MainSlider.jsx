import React from 'react'
import Banner1 from '../../assets/image3.jpg'
import Banner2 from '../../assets/apa-itu-marketplace.png'
import Back from '../../assets/backpack.jpeg'
import Sport from '../../assets/sneaker.jpeg'
import Classes from './MainSlider.module.css'
import Slider from "react-slick"



export default function MainSlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
  };

  const images = [
    {
      src: Banner1,
    label : 'image 1'
    },
    {
      src: Banner2,
      label : 'image 2'
    },
  ]
  return (
    <>
      <section>
        <div className="p-20 mt-10">
          <div className="container mx-auto">
            <div className="row ">
              <div className="w-2/3">
              <Slider {...settings}>
                {images.map((img , index)=>(
                  <div key={index} >
                    <img className='w-full h-96' src={img.src} alt={img.label}/>
                    <button className='bg-green-800 text-slate-100 btn absolute bottom-9 px-4 py-2 rounded-lg ms-20'><a href="">Shop Now!</a></button>
                  </div>
                ))}
              </Slider>
              </div>
              <div className="w-1/3">
            <img className='h-48 w-full' src={Sport} alt="" />
            <img className='w-full h-48' src={Back} alt="" />
            </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 

/**
 * 
 *  <section className="pb-10 pt-20">
        <div className="container">
          <div className="row w-full">
            <div className="w-1/3">          
              <Slider {...settings}>
                {images.map((img , index)=>(
                  <div key={index}>
                    <img className={`${Classes.banner} mx-2 relative`} src={img.src} alt={img.label}/>
                    <button className='bg-slate-950 text-slate-100 btn absolute bottom-20 px-4 py-2 rounded-lg ms-40'><a href="/">Shop Now!</a></button>
                  </div>
                ))}
              </Slider>
            </div>
           
          </div>
        </div>
      </section>
 */