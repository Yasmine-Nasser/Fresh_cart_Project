import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Products({children}) {
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to={'./login'} />
    
  }
  return children; 
}
