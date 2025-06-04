import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserContext } from '../context/userContext';
import Loader from '../components/Loader';
import DeletePost from './DeletePost';
import BackButton from '../components/BackButton';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // Redirect to login page if the user is not logged in
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // Fetch posts for the logged-in user
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/users/${id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPosts(response.data);
      } catch (error) {
        toast.error("Failed to load posts. Please try again.");
        console.error(error);
      }

      setLoading(false);
    };

    fetchPosts();
  }, [id, token]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="dashboard">
      <ToastContainer 
        position="top-right" 
        autoClose={10000} // Adjust the timeout for the toast
        hideProgressBar={false} 
        closeOnClick 
        pauseOnHover 
        draggable
      />
      {posts.length ? (
        <div className="container dashboard__container">
          {posts.map((post) => (
            <article key={post._id} className="dashboard__post">
              <div className="dashboard__post-info">
                <div className="dashboard__post-thumbnail">
                  <img
                    src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${post.thumbnail}`}
                    alt=""
                  />
                </div>
                <h5 dangerouslySetInnerHTML={{ __html: post.title }}></h5>
              </div>
              <div className="dashboard__post-actions">
                <Link to={`/posts/${post._id}`} className="btn sm">
                  View
                </Link>
                <Link to={`/posts/${post._id}/edit`} className="btn sm primary">
                  Edit
                </Link>
                <DeletePost postId={post._id} showToast={toast} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h2 className="center">You have no posts yet</h2>
      )}
      <BackButton />
    </section>
  );
}

export default Dashboard;