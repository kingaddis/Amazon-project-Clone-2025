
import React, { useContext, useState, useEffect } from 'react';
import classes from './Payment.module.css';
import LayOut from '../../components/LayOut/LayOut';
import { DataContext } from '../../components/DataProvider/DataProvider';
import ProductCard from '../../components/Product/ProductCard';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import axiosInstance from '../../API/axios';
import { ClipLoader } from 'react-spinners';
import { db } from "../../Utility/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // Add null checks for basket
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0) || 0;
  const total = basket?.reduce((amount, item) => item.price * item.amount + amount, 0) || 0;

  // Add missing handleChange function
  const handleChange = (event) => {
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError("");
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      if (!user?.uid) {
        setCardError("You must be logged in to make a payment.");
        return;
      }

      if (!stripe || !elements) {
        setCardError("Payment system not ready");
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
      if (!clientSecret) {
        setCardError("Invalid payment setup");
        setProcessing(false);
        return;
      }

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

      await setDoc(
        doc(db, "users", user.uid, "orders", confirmation.paymentIntent.id),
        {
          basket,
          amount: confirmation.paymentIntent.amount,
          created: confirmation.paymentIntent.created,
        }
      );

      dispatch({ type: "EMPTY_BASKET" });
      navigate("/orders", { state: { msg: "You have placed a new Order" } });

    } catch (error) {
      console.error("Payment error:", error);
      setCardError(error.message || "Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  // Add early return if no user or empty basket
  if (!user) {
    return (
      <LayOut>
        <div className={classes.Payment_header}>Please log in to continue</div>
      </LayOut>
    );
  }

  if (!basket?.length) {
    return (
      <LayOut>
        <div className={classes.Payment_header}>Your basket is empty</div>
      </LayOut>
    );
  }

  return (
    <LayOut>
      <div className={classes.Payment_header}>
        Checkout ({totalItem}) items
      </div>

      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>

        <hr />

        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, index) => (
              <ProductCard key={index} product={item} flex={true} />
            ))}
          </div>
        </div>

        <hr />

        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.Payment_card_container}>
            <div className={classes.Payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && <small style={{color:"red"}}>{cardError}</small>}

                <CardElement onChange={handleChange}/>

                <div className={classes.Payment_price}>
                  <span style={{display:"flex",gap:"10px"}}>
                      Total Order | <CurrencyFormat amount={total}/>
                  </span>  
                  <button type="submit" disabled={!stripe || processing}>
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12}/>
                        <p>Please wait...</p>
                      </div>
                    ) : "Pay Now"}
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