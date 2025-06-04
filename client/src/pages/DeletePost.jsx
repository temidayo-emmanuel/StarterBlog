import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';
import { UserContext } from '../context/userContext.jsx';

function DeletePost({ postId: id }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  const removePost = async (event) => {
    // Prevent any default behavior
    event.preventDefault();

    setLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/posts/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate('/'); // Redirect after successful deletion
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error("Couldn't delete the post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="btn sm danger"
      onClick={removePost}
      disabled={loading}
      style={loading ? { cursor: 'not-allowed', opacity: 0.7 } : {}}
    >
      {loading ? (
        <>
          <FaSpinner className="spinner" /> Deleting...
        </>
      ) : (
        'Delete'
      )}
    </button>
  );
}

export default DeletePost;