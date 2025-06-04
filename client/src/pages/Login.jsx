import React, { useState, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext.jsx';
import { FaSpinner, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons

function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );

      const user = response.data;
      setCurrentUser(user);

      toast.success('Login successful!', {
        autoClose: 1000,
        onClose: () => navigate('/'),
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        (err.response?.status === 401
          ? 'Invalid credentials!'
          : 'An error occurred. Please try again.');
      toast.error(errorMessage, { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login">
      <div className="container">
        <h2>Sign In</h2>
        <form className="form login__form" onSubmit={handleLogin}>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              required
              type="email"
              placeholder="Enter your email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              required
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              placeholder="Enter your password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
            />
            <div
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)} // Toggle visibility
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button
            type="submit"
            className="btn primary"
            disabled={loading}
            style={loading ? { cursor: 'not-allowed', opacity: 0.7 } : {}}
          >
            {loading ? (
              <>
                <FaSpinner className="spinner" /> Logging in 
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <small>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </small>
        <small>Lost Password? <Link to="/">Click Here</Link></small>
      </div>
      <ToastContainer className="custom-toast-container" />
    </section>
  );
}

export default Login;