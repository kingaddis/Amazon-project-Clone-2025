import React from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import classes from './Header.module.css';  // Adjust the path & filename as needed

function LowerHeader() {
  return (
    <nav className={classes.lower_container}>
      <ul>
        <li>
          <AiOutlineMenu size={20} />
          All
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </nav>
  );
}

export default LowerHeader;
