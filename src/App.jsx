import './App.css'
import Home from './Components/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import About from './Components/About/About'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brand from './Components/Brand/Brand'
import Category from './Components/Category/Category'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Notfound from './Components/Notfound/Notfound'
import ContextProvider from './AuthContect/AuthContext'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import Loader from './Components/Loader/Loader'
import AllProductDetails from './Components/AllProductDetails/AllProductDetails'
import CartContextProvider from './AuthContect/Cartcontext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckOut from './Components/CheckOut/CheckOut'
import MyOrder from "./Components/MyOrder/MyOrder"
import MyWishList from './Components/MyWishList/MyWishList'
import WishlistProvider from './AuthContect/WishContext'
import CategoryDetails from './Components/CategoryDetails/CategoryDetails'
import GetProducts from './Components/GetProducts/GetProducts'


function App() {
  const x = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        {
          index: true, element:
            (<ProtectedRoutes>
              <Home />
            </ProtectedRoutes>)
        },
        {
          path: 'about', element:
            (<ProtectedRoutes>
              <About />
            </ProtectedRoutes>)
        },
        {
          path: 'products', element:
            (<ProtectedRoutes>
              <Products />
            </ProtectedRoutes>)
        },
        {
          path: 'cart', element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          )
        },
        {
          path: '/checkout', element:(
          <ProtectedRoutes>
            <CheckOut />
          </ProtectedRoutes>
          )
          },
        {
          path: 'brand', element:
            (<ProtectedRoutes>
              <Brand />
            </ProtectedRoutes>)
        },
        {
          path: 'category', element:
            (<ProtectedRoutes>
              <Category />
            </ProtectedRoutes>)
        },
        {
          path: 'categorydetails/:id/:category', element:
            (<ProtectedRoutes>
              <CategoryDetails />
            </ProtectedRoutes>)
        },
        {
          path: 'register', element:
           ( <Register />)
        },
        {
          path: 'login', element:
            (<Login />)
        },
        {
          path: '*', element:
          ( <ProtectedRoutes>
              <Notfound />
            </ProtectedRoutes>)
        },
        {
          path: '/loader', element:
          (<ProtectedRoutes>
            <Loader/>
          </ProtectedRoutes>)
          },
        {
          path: '/details/:id/:category'
          , element:
          (<ProtectedRoutes>
            <AllProductDetails/>
          </ProtectedRoutes>)
          },
          {
            path: '/allorders'
            , element:
            (<ProtectedRoutes>
              <MyOrder/>
            </ProtectedRoutes>)
            },
            {
              path: 'wishlist'
              , element:
              (<ProtectedRoutes>
                <MyWishList/>
              </ProtectedRoutes>)
              },
              {
                path: 'getproducts'
                , element:
                (<ProtectedRoutes>
                  <GetProducts/>
                </ProtectedRoutes>)
                },

      ]
    },
  ])

  return (<>
    <ContextProvider>
      <CartContextProvider>
        <WishlistProvider>
          <RouterProvider router={x}></RouterProvider>
        </WishlistProvider>
        <ToastContainer />
      </CartContextProvider>
    </ContextProvider>
  </>)
}
export default App