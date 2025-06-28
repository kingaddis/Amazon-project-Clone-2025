import React, { useContext, useState, useEffect } from "react";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import LayOut from "../../components/LayOut/LayOut";
import ProductCard from "../../components/Product/ProductCard";
import classes from "./Orders.module.css";

import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
} from "firebase/firestore";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const ordersRef = collection(doc(db, "users", user.uid), "orders");
      const q = query(ordersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      // Cleanup listener on unmount
      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  // Delete order handler
  const handleDeleteOrder = async (orderId) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "orders", orderId));
      alert("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order. Please try again.");
    }
  };

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>

          {orders.length === 0 && <p>You don't have any orders.</p>}

          {orders.map((eachOrder, i) => (
            <div key={eachOrder.id} className={classes.order_block}>
              <hr />
              <p>
                Order ID: {eachOrder.id}
                <button
                  className={classes.deleteBtn}
                  onClick={() => handleDeleteOrder(eachOrder.id)}
                  title="Delete this order"
                >
                  Delete
                </button>
              </p>
              {eachOrder.data.basket?.map((order, index) => (
                <ProductCard key={index} product={order} flex={true} />
              ))}
            </div>
          ))}
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
