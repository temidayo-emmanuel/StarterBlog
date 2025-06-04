import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

import { UserContext } from '../context/userContext';

function Header() {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800);
  const { currentUser } = useContext(UserContext);

  // Update navbar visibility on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsNavShowing(window.innerWidth > 800);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const closeNavHandler = () => {
    // Close the navbar only when the screen width is small
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    }
  };

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo" onClick={closeNavHandler}>
          <h4><i>Starter</i></h4>
        </Link>

        {currentUser?.id && isNavShowing && (
          <ul className="nav__menu">
            <li>
              <Link to="/create" onClick={closeNavHandler} className='nav__link'>
                Write
              </Link>
            </li>
            <li>
              <Link to="/tags" onClick={closeNavHandler} className='nav__link'>
                Tags
              </Link>
            </li>
            <li>
              <Link to="/authors" onClick={closeNavHandler} className='nav__link'>
                Users
              </Link>
            </li>
            <li>
              <Link to={`/profile/${currentUser.id}`} onClick={closeNavHandler} className='nav__link'>
               My Profile
              </Link>
            </li>
            <li>
              <Link to="/logout" onClick={closeNavHandler} className='nav__link'>
                Logout (<i>{currentUser?.name}</i> )
              </Link>
            </li>
          </ul>
        )}

        {!currentUser?.id && isNavShowing && (
          <ul className="nav__menu">
            <li>
              <Link to="/create" onClick={closeNavHandler} className='nav__link'>
                Write
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={closeNavHandler} className='nav__link'>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" onClick={closeNavHandler} className='nav__link'>
                Sign up
              </Link>
            </li>
          </ul>
        )}

        <button
          className="nav__toggle-btn"
          onClick={() => setIsNavShowing(!isNavShowing)}
        >
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
}

export default Header;