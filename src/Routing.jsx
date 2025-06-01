
import React from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './Pages/Landing/Landing';
import Auth from './Pages/Auth/Auth';
import Payment from './Pages/Payment/Payment';
import Orders from './Pages/Orders/Orders';
import Cart from './Pages/Cart/Cart';
import Results from './Pages/Results/Results';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const stripePromise=loadStripe("pk_test_51RTEz9EP5haT8CnHreMSWp8h0pVauy3sqDcWAvy0O8NNjW79rsk7oY6TBoaCJIG4UGdCDfMl7RNiWHz7R7hiQKdv00SCfRZl7i")

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={

            <ProtectedRoute 
              msg={"You must be logged in to make a payment."}
              redirect={"/payments"}>
            <Elements 
            stripe={stripePromise}>
              <Payment />
            </Elements></ProtectedRoute>

          }
        />
        {/* <Route path="/payments" element={<Payment />} /> */}
        <Route path="/orders" element={
              <ProtectedRoute 
                    msg={"You must be logged in to see your Orders."}
                    redirect={"/orders"}>
                <Orders />
              </ProtectedRoute>
          
          } />

        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        {/* 🔁 Catch-all route */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Router>
  );
}

export default Routing;
