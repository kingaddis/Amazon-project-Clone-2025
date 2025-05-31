
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LayOut from '../../Components/LayOut/LayOut';
import classes from './Results.module.css';
import ProductCard from '../../Components/Product/ProductCard';
import Loader from '../../Components/Loader/Loader'; 
function Results() {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true); //  loading state

  useEffect(() => {
    setLoading(true); //  start loader
    axios
      .get(`https://fakestoreapi.com/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setLoading(false); //  stop loader
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, [categoryName]);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />
        
        {loading ? (
          <Loader /> //  Show loader while fetching
        ) : (
          <div className={classes.products_Container}>
            {results.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                renderDesc={false}
                renderAdd={true}/>
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;
