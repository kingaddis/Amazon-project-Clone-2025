import React, { useContext,useState } from 'react';
import classes from './Payment.module.css';
import LayOut from '../../components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import  axiosInstance  from '../../API/axios';
import { ClipLoader } from 'react-spinners';
// import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Utility/firebase";
import { doc, setDoc, collection } from "firebase/firestore";

import { useNavigate } from 'react-router-dom';


function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);


  const total = basket.reduce((amount, item) =>  item.price * item.amount + amount, 0);
  const [cardError,setCardError]=useState(null)
  const [processing,setProcessing] = useState(false)

  const stripe = useStripe();
  const elements = useElements();
  const navigate=useNavigate()

const handleChange = (e) => {
  if (e.error?.message) {
    setCardError(e.error.message);
  } else {
    setCardError("");
  }
};
const handlePayment = async (e) => {
  e.preventDefault();

  try {
    if (!user) {
      setCardError("You must be logged in to make a payment.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setCardError("Please enter card details.");
      return;
    }

    setCardError("");
    setProcessing(true);

    const response = await axiosInstance({
      method: "POST",
      url: `/payment/create?total=${Math.round(total * 100)}`,
    });

    const clientSecret = response.data?.clientSecret;

    const confirmation = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (confirmation.error) {
      setCardError(confirmation.error.message);
      setProcessing(false);
      return;
    }

    const paymentIntent = confirmation.paymentIntent;

    if (!user || !user.uid) {
      setCardError("User information is missing.");
      setProcessing(false);
      return;
    }

    await setDoc(
      doc(db, "users", user.uid, "orders", paymentIntent.id),
      {
        basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      }
    );
    dispatch({ type: "EMPTY_BASKET" });
    setProcessing(false);
    navigate("/orders", { state: { msg: "you have placed new Order" } });

  } catch (error) {
    console.error("Payment error:", error);
    setCardError("Payment failed. Please try again.");
    setProcessing(false);
  }
};


  return (
    <LayOut>
      {/* Header */}
      <div className={classes.Payment_header}>
        Checkout ({totalItem}) items
      </div>

      {/* Payment Method Section */}
      <section className={classes.payment}>
        {/* Delivery Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            {/* <div>abebe@gmail.com</div> */}
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>

        <hr />

        {/* Products List */}
          <div className={classes.flex}>
            <h3>Review items and delivery</h3>
            <div>
              {basket?.map((item, index) => (
                <ProductCard key={index} product={item} flex={true} />
              ))}
            </div>
          </div>
       

        <hr />

        {/* Card Form Placeholder */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.Payment_card_container}>
            <div className={classes.Payment_details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && <small style={{color:"red"}}>{cardError}</small>}


                {/* card element */}
                <CardElement onChange={handleChange}/>


                {/* price */}

                <div className={classes.Payment_price}>
                  <span style={{display:"flex",gap:"10px"}}>
                      Total Order | <CurrencyFormat amount={total}/>
                  </span>  
                    <button type="submit">
                      {
                        processing?(
                          <div className={classes.loading}>
                            <ClipLoader color="gray" size={12}/>
                            <p>Please wait ...</p>
                          </div>
                        ): ("Pay Now") 
                      }
                    
                      </button>
                </div>
              
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;


// Card Number: 4242 4242 4242 4242

// Expiration Date: Any future date (e.g., 12/34)

// CVC: Any 3-digit number (e.g., 123)

// ZIP/Postal Code: Any valid ZIP (e.g., 10001)