import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import { FaSearch, FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import summeryAPI from './../../common/index'; // Ensure this import is correct
import { toast } from 'react-toastify';
import { setUserDetails } from './../../store/userSlice'; // Ensure this import is correct
import './Header.css';
import { useContext } from 'react';
import Context from './../../context/index';

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const context = useContext(Context);
  const cartCount = context.countCartProduct;
  // console.log('Faulty context:', cartCount);

  const handleLogout = async () => {
    try {
      const response = await fetch(summeryAPI.logout_user.url, {
        method: summeryAPI.logout_user.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      if (data.success) {
        dispatch(setUserDetails(null));
        toast.success(data.message);
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to log out. Please try again.');
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <Logo height={40} />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search product here ..." />
          <div className="search-icon">
            <FaSearch />
          </div>
        </div>

        {/* User Section */}
        <div className="user-section">
          {/* User Profile */}
          {user?._id &&
          <div className="user-profile">
            <div className="profile-image">
              {user?.profilePhoto ? (
                <img src={user?.profilePhoto} alt="user" className="profile-img" />
              ) : (
                <FaRegUserCircle className="profile-icon" />
              )}
            </div>
            {/* User Panel - Visible on Hover */}
            <div className="user-panel">
              <Link to='/admin-panel' className="user-panel-link">Admin Panel</Link>
            </div>
          </div>
          }

          {/* Cart Section */}
          {
            user?._id && <Link to='/cart' className="cart-section">
              <span className="cart-count">{cartCount}</span>
              <FaShoppingCart className="cart-icon" />
            </Link>
          }


          {/* Authentication Button */}
          <div className="auth-section">
            {user?._id ? (
              <button onClick={handleLogout} className="logout-button">Logout</button>
            ) : (
              <Link to="/login" className="login-button">Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;