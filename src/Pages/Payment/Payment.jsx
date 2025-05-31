import React, { useContext,useState } from 'react';
import classes from './Payment.module.css';
import LayOut from '../../components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) =>  item.price * item.amount + amount, 0);
  const [cardError,setCardError]=useState(null)
  const stripe = useStripe();
  const elements = useElements();

  const handleChange=(e)=>{
  
    e.error.message?setCardError(e?.error?.message):setCardError("")

  }
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
            <div>abebe@gmail.com</div>
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
              <form action="">
                {/* error */}
                {cardError && <small style={{color:"red"}}>{cardError}</small>}


                {/* card element */}
                <CardElement onChange={handleChange}/>


                {/* price */}

                <div className={classes.Payment_price}>
                  <span style={{display:"flex",gap:"10px"}}>
                      Total Order | <CurrencyFormat amount={total}/>
                  </span>  
                  <button>Pay Now</button>
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
