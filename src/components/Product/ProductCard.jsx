import React, { useContext } from 'react';
import Rating from "@mui/material/Rating";
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import classes from './Product.module.css';
import { Link } from 'react-router-dom';
import { DataContext } from '../../Components/DataProvider/DataProvider';//components
import {type} from '../../Utility/action.type'

function ProductCard({ product, flex, renderDesc,renderAdd }) {
  const { image, title, id, rating, price, description } = product;

  const [state, dispatch] = useContext(DataContext); 

// console.log(state)
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
        {
            renderAdd &&        <button className={classes.button} onClick={addToCart}>
          Add to cart
        </button>
        }

      </div>
    </div>
  );
}

export default ProductCard;
