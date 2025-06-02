import React, { useContext, useState, useEffect } from "react";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import LayOut from "../../Components/LayOut/LayOut";
import ProductCard from "../../Components/Product/ProductCard";
import classes from "./Orders.module.css";





import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
            const ordersRef = collection(doc(db, "users", user.uid), "orders");
      const q = query(ordersRef, orderBy("created", "desc"));
      onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

     
    }
    setOrders([])
  }, []);

  return (
<LayOut>
  <section className={classes.container}>
    <div className={classes.orders_container}>
      <h2>Your Orders</h2>
       {
        orders?.length == 0 && <div>
          you don't have order.
        </div>
       }

      {/* ordered item */}
      <div>
        {
          orders.map((eachOrder, i) => {
            return (
              <div key={i}>
                <hr />
                <p>Order ID: {eachOrder?.id}</p>
                {
                  eachOrder?.data.basket?.map((order, index) => (
                    <ProductCard
                      flex={true}
                      product={order}
                      key={index}
                    />
                  ))
                }
              </div>
            );
          })
        }
      </div>
    </div>
  </section>
</LayOut>

  );
}

export default Orders;
