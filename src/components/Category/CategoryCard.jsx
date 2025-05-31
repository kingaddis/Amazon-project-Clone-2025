import React from 'react'
import { Link } from 'react-router-dom';

import classes from './category.module.css';


function CatagoryCard({ data }) {
  // console.log(data) 
  return (
    <div className={classes.category}>
      {/* <Link to={`/category/${ data.name}`}> */}
        <Link to={`/category/${ data.category }`}>
          <h2>{data.category}</h2>
        
        <img src={data.image} alt={data.category} />
        <p>Shop now</p>
      </Link>
    </div>
  );
}

export default CatagoryCard;

