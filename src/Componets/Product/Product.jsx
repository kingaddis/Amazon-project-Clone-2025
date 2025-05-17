import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import classes from './Product.module.css'

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <section className={classes.product_container}>
      {products.map((singleProduct) => (
        <ProductCard key={singleProduct.id} product={singleProduct} />
      ))}
    </section>
  );
}

export default Product;

