import React, { useContext } from 'react';
import classes from './Cart.module.css';
import LayOut from '../../Componets/LayOut/LayOut';
import { DataContext } from '../../Componets/DataProvider/DataProvider';
import ProdactCrad from '../../Componets/Product/ProductCard';
import CurrencyFormat from '../../Componets/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import {type} from '../../Utility/action.type'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

   const total = basket.reduce((amount, item) =>  item.price * item.amount + amount, 0);
   const increment=(item)=>{
    dispatch({
      type:type.ADD_TO_BASKET,item
    })
   }

      const decrement=(item)=>{
    dispatch({
      type:type.REMOVE_FROM_BASKET,
      id: item.id 
    })
   }
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          {
            basket?.length === 0 ? (
              <p>Oops! No item in the cart.</p>
            ) : (
              basket.map((item, i) => {
                return <section className={classes.cart_product}>
                <ProdactCrad
                  key={i}
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />
                <div className={classes.btn_container}>
                  <button className={classes.btn}onClick={()=>increment(item)}><IoIosArrowUp size={20}/></button>
                  <span>{item.amount}</span>
                  <button  className={classes.btn}onClick={()=>decrement(item)}><IoIosArrowDown size={20}/></button>
                    {/* <span>{item.amount}</span> */}
                </div>
                </section>
                
})
            )
          }
        </div>
    {    basket?.length !== 0 &&(
       <div className={classes.subtotal}>
        <div>
          <p>Subtotal({basket?.length} items)</p>
          <CurrencyFormat amount={total}/>
        </div>
        <span>
          <input type="checkbox"  />
          <small>This Order Contains a Gift</small>
        </span>
        <Link to="/payments" className={classes.checkoutBtn}>Continue to Checkout</Link>
       </div>
    )}
       
      </section>
    </LayOut>
  );
}

export default Cart;
