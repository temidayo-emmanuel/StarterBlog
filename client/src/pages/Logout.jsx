import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext.jsx';

function Logout() {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Perform the logout actions inside useEffect
    setCurrentUser(null);
    localStorage.removeItem('user'); // Clear local storage if user data is stored
    navigate('/login'); // Redirect to login page
  }, [setCurrentUser, navigate]);

  return null; // No need to render anything for the Logout component
}

export default Logout;