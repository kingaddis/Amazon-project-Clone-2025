
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import classes from './Product.module.css';
import Loader from '../Loader/Loader'; 
import ProductUrl from '../../API/APIENDPOINT';
function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
   
      .get(ProductUrl)

      .then(response => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <section className={classes.product_container}>
      {products.map((singleProduct) => (
        <ProductCard 
        key={singleProduct.id} 
        product={singleProduct}
        renderAdd={true} />
      ))}
    </section>
  );
}

export default Product;
