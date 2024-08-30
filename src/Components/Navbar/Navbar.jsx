import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/freshcart-logo.svg'
import { AuthContext } from '../../AuthContect/AuthContext'
import { CartContext } from '../../AuthContect/Cartcontext'
export default function Navbar() {
  const { accessToken, setAccessToken } = useContext(AuthContext)
  const {numOfCartItems} = useContext(CartContext)

  function HandleLogout() {
    localStorage.removeItem("accessToken")
    setAccessToken(null)
  }
  

  return (<>
    <nav className='bg-gray-200 p-4 stateic lg:fixed top-0 end-0 start-0 z-50'>
      <div className="container mx-auto">
        <div className='flex justify-between items-center flex-col lg:flex-row'>
          <div className='flex items-center flex-col lg:flex-row '>
            <Link to={''} classNameName='mx-10 '>
              <img src={logo} alt="logo"/>
            </Link>
            {accessToken &&
              <ul className='flex flex-col lg:flex-row ms-20 font-semibold'>
                <li>
                  <NavLink className={'p-2 '} to={""}>Home</NavLink>
                </li>
                <li >
                  <NavLink className={'p-2'} to={"getproducts"}>Products</NavLink>
                </li>
                <li>
                  <NavLink  className={'p-2'} to={"cart"}>Cart</NavLink>
                </li>
                <li>
                  <NavLink  className={'p-2'} to={"wishlist"}>wish list</NavLink>
                </li>
                <li>
                  <NavLink className={'p-2'} to={"category"}>Categories</NavLink>
                </li>
                <li>
                  <NavLink className={'p-2'} to={"brand"}>Brands</NavLink>
                </li>
              </ul>}
          </div>
          <div>
            <ul className='flex flex-col lg:flex-row mt-3'>
              {accessToken ? (
                <>
                  <li>       
                    <button type="button"
                      className="relative ps-16 inline-flex items-center text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none">
                      <Link to={'cart'}><i className='fas fa-cart-shopping fa-2xl'></i></Link>
                      <span className="sr-only">Notifications</span>
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 border-2 border-white rounded-full -top-4 -end-2 dark:border-gray-900">{numOfCartItems}</div>
                    </button>

                  </li>
                  
                  <li>
                    <button className={'text-slate-800 mx-4 hover:text-green-600 text-md font-semibold hover:border-green-600 ps-7'} onClick={HandleLogout}> <a href="login">Log Out</a></button>
                  </li>
                </>
              ) :(
                <>
              <li>
                <NavLink className={'p-2 ms-1'} to={'login'}>Login</NavLink>
              </li>
              <li>
                <NavLink className={'p-2 me-10'} to={"register"}>Register</NavLink>
              </li>
            </>
              )  
              }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </>)
}


/*
  <li><a href="https://www.facebook.com/"><i classNameName="fa-brands fa-facebook fa-sm p-2"></i></a></li>
          <li><a href="https://www.tiktok.com/"><i classNameName="fa-brands fa-tiktok fa-sm p-2"></i></a></li>
          <li><a href="https://www.twitter.com/"><i classNameName="fa-brands fa-twitter fa-sm p-2"></i></a></li>
          <li><a href="https://www.linkedin.com/"><i classNameName="fa-brands fa-linkedin fa-sm p-2"></i></a></li>
          <li><a href="https://www.youtube.com/"><i classNameName="fa-brands fa-youtube fa-sm p-2"></i></a></li>
</>} */