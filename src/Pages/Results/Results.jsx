// import React from 'react'
// import classes from './Results.module.css'
// import LayOut from '../../Componets/LayOut/LayOut'
// import { useParams } from 'react-router-dom'
// function Results() {
//   const {categoryName}=useParams()
//   console.log(categoryName)
//   return (
//     <LayOut>    
//         <div>Results</div>
//         </LayOut>

//   )
// }

// export default Results

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LayOut from '../../Componets/LayOut/LayOut';
import classes from './Results.module.css';
import ProductCard from '../../Componets/Product/ProductCard';

function Results() {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
   
  axios
    .get(`https://fakestoreapi.com/products/category/${categoryName}`)
    .then((res) => {
      setResults(res.data); 
    })
    .catch((err) => {
      console.error('Error fetching products:', err);
    });
  }, [categoryName]);

  return (
    <LayOut>
      <section>
        <h1 style={{padding:"30px"}}>Results</h1>
        <p style={{padding:"30px"}}>Catagory/{categoryName}</p>
        <hr />
        <div className={classes.products_Container}>
              {results?.map((product) => (
                <ProductCard key={product.id} product={product}/>
                
              ))}
        </div>
      </section>
    </LayOut>
  );
}

export default Results;
