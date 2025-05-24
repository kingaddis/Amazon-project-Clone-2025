
import React, { useContext } from 'react';
import classes from "./Header.module.css";
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import LowerHeader from './LowerHeader';
import { DataContext } from '../../Componets/DataProvider/DataProvider';

function Header() {
  const [{ basket }, dispatch] = useContext(DataContext);
  const totalItem=basket?.reduce((amount,item)=>{
    return item.amount + amount
  },0)
  // console.log(basket.length)
  return (
    <>
    <section className={classes.sticky}>
      <header className={classes.header_container}>
        
        {/* Logo and Delivery */}
        <div className={classes.logo_container}>
          <Link to="/">
            <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon Logo" />
          </Link>
          <div className={classes.delivery}>
            <span>
              <FaMapMarkerAlt />
            </span>
          
            <div>
              <p>Deliver to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className={classes.search}>
          <select>
            <option value="all">All</option>
            <option value="books">Books</option>
            <option value="electronics">Electronics</option>
          </select>
          <input type="text" placeholder="Search Amazon" />
          <button>
            <IoSearch size={25} />
          </button>
        </div>

        {/* Right Links */}
        <div className={classes.right_container}>
          <Link to='#' className={classes.language}>
              <img src="https://www.shutterstock.com/shutterstock/photos/551168752/display_1500/stock-vector-usa-vector-flag-551168752.jpg" alt="flag" />
            <select name="" id="">
              <option value="">EN</option>
            </select>
          
          </Link>

          <Link to=''>
            <p>Hello, Sign in</p>
            <span>Account & Lists</span>
          </Link>

          <Link to='/orders'>
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          <Link to='/cart' className={classes.cart}>
            <IoIosCart size={35} />
            <span>{totalItem}</span>
          </Link>
        </div>
      </header>
      <LowerHeader/>
    </section>
    </>
  );
}

export default Header;

//https://www.shutterstock.com/discover/unlimited?asset-selector=image&pl=PPC_GOO_US_BD-745122174377&cr=bc&kw=shutter%20stock&ds_eid=700000001400310&utm_source=GOOGLE&utm_campaign=CO%3DUS_LG%3DEN_BU%3DIMG_AD%3DBRAND_TS%3Dlggeneric_RG%3DAMER_AB%3DACQ_CH%3DSEM_OG%3DCONV_PB%3DGoogle&ds_cid=71700000014879517&ds_ag=FF%3DBrand-Shutterstock-Exact_AU%3DProspecting&ds_agid=58700001317767582&utm_medium=cpc&gad_source=1&gad_campaignid=311173745&gbraid=0AAAAAD9FeHCg3arykSGiMeXGB9bgh6z1K&gclid=Cj0KCQjwxJvBBhDuARIsAGUgNfg5FC6STcf4tSk2ZEQnxy9AECX6hYNlYf2-UlN2eGOMqCc6jOCanMsaAsA1EALw_wcB&gclsrc=aw.ds