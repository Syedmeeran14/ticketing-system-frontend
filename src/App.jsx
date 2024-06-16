import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import AppRoutes from './utils/AppRoutes'
import './index.css'

function App() {
  const router = createBrowserRouter(AppRoutes)
  
  return <>
  <RouterProvider router={router}></RouterProvider>
  </>
}

export default App