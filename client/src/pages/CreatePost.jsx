import React, { useState, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSpinner } from 'react-icons/fa';

import { UserContext } from '../context/userContext';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);  // Ensure it's null initially
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // Add loading state

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // Redirect to login page if user is not logged in
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  const POST_CATEGORIES = [
    'Agriculture',
    'Business',
    'Education',
    'Entertainment',
    'Art',
    'Investment',
    'Uncategorized',
    'Weather',
    "Technology"
  ];

  const createPost = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true

    const postData = new FormData();
    postData.append('title', title);
    postData.append('category', category);
    postData.append('description', description);

    if (thumbnail) {
      postData.append('thumbnail', thumbnail);
    } else {
      setError('Thumbnail is required.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts`,
        postData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        toast.success('Post created!', { autoClose: 2000 });
        setTimeout(() => {
          navigate('/');
        }, 2500); // Adjusted delay to 2500ms
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);  // Set loading to false when done
    }
  };

  return (
    <section className="create-post">
      <div className="container">
        <form className="form create-post__form" onSubmit={createPost}>
          <input
            required
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {POST_CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <ReactQuill
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
          />
          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="image/png, image/jpg, image/jpeg"
          />
          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? (
              <>
                 <FaSpinner className="spinner" /> Creating...
              </>
            ) : (
              'Create'
            )}
          </button>
        </form>
        <ToastContainer className="custom-toast-container" />
      </div>
    </section>
  );
}

export default CreatePost;