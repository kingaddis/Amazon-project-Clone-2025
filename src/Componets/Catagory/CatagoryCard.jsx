import React from 'react'


import classes from './catagory.module.css';

function CatagoryCard({ data }) {
  return (
    <div className={classes.category}>
      <a href="">
        
          <h2>{data.category}</h2>
        
        <img src={data.image} alt={data.category} />
        <p>Shop now</p>
      </a>
    </div>
  );
}

export default CatagoryCard;

