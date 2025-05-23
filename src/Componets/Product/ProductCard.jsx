// import React from 'react'
// import Rating from "@mui/material/Rating"
// import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
// import classes from './Product.module.css'
// // import { Link } from '@mui/material';
// import {Link} from 'react-router-dom'


// function ProductCard({ product, flex,renderDesc }) {
//    const { image, title, id, rating, price,description } = product;
//   return (
//     <div className={`${classes.card_container} ${flex ? classes.product_flexed : ''}`}>

//         <Link to={`/products/${id}`}>
//             <img src={image} alt="" />
//             </Link>
//             <div>
//                 <h3>{title}</h3>
//                { renderDesc && <div style={{width:"500px"}}>{description}</div>}
//                 <div className={classes.rating}>
//                         {/* { rating} */}
//                         <Rating value={rating.rate} precision={0.1}/>
//                         {/* { coumt */}
//                         <small>{rating.count}</small>


//                 </div>
//                 <div>
//                     {/* {price} */}
//                     <CurrencyFormat amount={price}/>
//                 </div>
//                 <button className={classes.button}> 
//                     add to cart
//                 </button>
//             </div>
//     </div>
//   )
// }

// export default ProductCard
// npm install numeral
//npm install @mui/material @emotion/react @emotion/styled tO instal materyal UI


import React, { useContext } from 'react';
import Rating from "@mui/material/Rating";
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import classes from './Product.module.css';
import { Link } from 'react-router-dom';
import { DataContext } from '../../Componets/DataProvider/DataProvider';
import {type} from '../../Utility/action.type'

function ProductCard({ product, flex, renderDesc }) {
  const { image, title, id, rating, price, description } = product;

  const [state, dispatch] = useContext(DataContext); 

console.log(state)
  const addToCart = () => {
    dispatch({
      type: type.ADD_TO_BASKET,
      item: {
        id,
        title,
        price,
        image,
        rating,
        description
      }
    });
  };

  return (
    <div className={`${classes.card_container} ${flex ? classes.product_flexed : ''}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ width: "500px" }}>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating.rate} precision={0.1} readOnly />
          <small>{rating.count}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        <button className={classes.button} onClick={addToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
