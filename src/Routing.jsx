import React from 'react'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Landing from './Pages/Landing/Landing'
import Signin from './Pages/Auth/Signup'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
// import Resualt from './Pages/Results/Results'
import Results from './Pages/Results/Results'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
function Routing() {
  return (
    <Router> 
        <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Signin />} />
        <Route path="/payments" element={<Payment />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryName" element={<Results />} />
       <Route path="/products/:productId" element={<ProductDetail />} />



        </Routes>

    </Router>
  )
}

export default Routing