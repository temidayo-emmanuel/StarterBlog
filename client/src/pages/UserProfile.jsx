import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaSpinner } from 'react-icons/fa';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from '../components/BackButton';

const UserProfile = () => {
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // Fetch user details
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/${currentUser.id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const { name, email, avatar } = response.data;
        setName(name);
        setEmail(email);
        setAvatar(avatar);
        setAvatarPreview(`${import.meta.env.VITE_ASSETS_URL}/uploads/${avatar}`);
      } catch (error) {
        toast.error('Failed to fetch user details.', { autoClose: 1500 });
      }
    };

    if (token) {
      getUser();
    }
  }, [currentUser.id, token]);

  // Handle avatar change and upload immediately
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setAvatarLoading(true);

      try {
        const formData = new FormData();
        formData.append('avatar', file);

        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/change-avatar`,
          formData,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setAvatar(response.data.avatar);
        setAvatarPreview(`${import.meta.env.VITE_ASSETS_URL}/uploads/${response.data.avatar}`);
        toast.success('Avatar updated successfully', { autoClose: 2000 });
      } catch (error) {
        toast.error('Failed to change avatar! Please try again...', { autoClose: 2000 });
      } finally {
        setAvatarLoading(false);
      }
    }
  };

  // Handle user details update
  const updateUserDetails = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = new FormData();
      userData.append('name', name);
      userData.append('email', email);
      userData.append('currentPassword', currentPassword);
      userData.append('newPassword', newPassword);
      userData.append('confirmNewPassword', confirmNewPassword);

      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/users/edit-user`,
        userData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        toast.success('User details updated! Please login...', { autoClose: 1500 });
        setTimeout(() => {
          navigate('/logout');
        }, 2000);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'An error occurred while updating user details.',
        { autoClose: 1500 }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="profile">
      <ToastContainer className="custom-toast-container"/>
      <div className="container profile__container">
        <Link to={`/myposts/${currentUser.id}`} className="btn">My posts</Link>
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img
                src={avatarPreview || `${import.meta.env.VITE_ASSETS_URL}/uploads/${avatar}`}
                alt="User Avatar"
              />
            </div>
            <form className="avatar__form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={handleAvatarChange}
                accept="image/png, image/jpg, image/jpeg"
                disabled={avatarLoading}
              />
              <label htmlFor="avatar">
                {avatarLoading ? <FaSpinner className="spinner" /> : <FaEdit />}
              </label>
            </form>
          </div>

          <h2>{currentUser.name}</h2>

          <form className="form profile__form" onSubmit={updateUserDetails}>
            <input
              required
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              required
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              required
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              required
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button
              type="submit"
              className="btn primary"
              disabled={loading}
              style={loading ? { cursor: 'not-allowed', opacity: 0.7 } : {}}
            >
              {loading ? (
                <>
                   <FaSpinner className="spinner" /> Updating...
                </>
              ) : (
                'Update'
              )}
            </button>
          </form>
        </div>
      </div>
      <BackButton />
    </section>
  );
};

export default UserProfile;