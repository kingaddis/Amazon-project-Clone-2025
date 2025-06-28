
import React, { useContext } from 'react';
import classes from "./Header.module.css";
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import LowerHeader from './LowerHeader';
import { DataContext } from '../../components/DataProvider/DataProvider';
import { auth } from '../../Utility/firebase'; // ✅ Correct

function Header() {
  const [{ user,basket }, dispatch] = useContext(DataContext);
  const totalItem=basket?.reduce((amount,item)=>{
    return item.amount + amount
  },0)

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
            <IoSearch size={38} />
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

              <Link to={!user && "/auth"}>
                <div>
                  {user ? (
                    <>
                      <p>Hello, {user?.email?.split("@")[0]}</p>
                      <span onClick={()=>auth.signOut()}>Sign Out</span>
                    </>
                   ) : (     
                     <>    
                      <p>Hello, Sign In</p>
                            <span>Account & Lists</span>
                    </>
               
                  )}

                </div>
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

