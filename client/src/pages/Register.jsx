import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify'; // Import toast for notifications
import { FaSpinner, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showPassword2, setShowPassword2] = useState(false); // State to toggle confirm password visibility
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value.trim(), // Trim input to avoid trailing spaces
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();

    // Client-side validation for password matching
    if (userData.password !== userData.password2) {
      toast.error('Passwords do not match!');
      return;
    }

    // Prevent multiple submissions while loading
    if (loading) return;

    setLoading(true); // Enable loading state

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          password2: userData.password2
        }
      );

      toast.success('Registration successful! Please login...', {
        autoClose: 1500,
        onClose: () => navigate('/login'), // Navigate after toast closes
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'An error occurred during registration.';
      toast.error(errorMessage, { autoClose: 1500 });
    } finally {
      setLoading(false); // Disable loading state
    }
  };

  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register__form" onSubmit={registerUser}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Username"
              name="name"
              value={userData.name}
              onChange={changeInputHandler}
              required
            />
          </div>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={userData.email}
              onChange={changeInputHandler}
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              placeholder="Password"
              name="password"
              value={userData.password}
              onChange={changeInputHandler}
              required
            />
            <div
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)} // Toggle visibility
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword2 ? 'text' : 'password'} // Toggle confirm password visibility
              placeholder="Confirm password"
              name="password2"
              value={userData.password2}
              onChange={changeInputHandler}
              required
            />
            <div
              className="eye-icon"
              onClick={() => setShowPassword2(!showPassword2)} // Toggle visibility
            >
              {showPassword2 ? <FaEyeSlash /> : <FaEye />}
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
                 <FaSpinner className="spinner" /> Registering...
              </>
            ) : (
              'Register'
            )}
          </button>
        </form>
        <small>
          Already have an account? <Link to="/login">Sign in</Link>
        </small>
      </div>
      <ToastContainer className="custom-toast-container" />
    </section>
  );
};

export default Register;