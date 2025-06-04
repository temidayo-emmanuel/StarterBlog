import React, { useContext, useEffect, useState } from 'react';
import SocialShare from '../components/SocialShare';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import PostAuthor from '../components/PostAuthor';
import Loader from '../components/Loader';
import DeletePost from './DeletePost';
import { UserContext } from '../context/userContext';
import BackButton from '../components/BackButton';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching the post.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="post-detail">
      {error && <p className="error">{error}</p>}
      {post && (
        <div className="container post-detail__container">
          <div className="post-detail__header">
            <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
            {currentUser?.id === post?.creator && (
              <div className="post-detail__buttons">
                <Link to={`/posts/${post._id}/edit`} className="btn sm primary">
                  Edit
                </Link>
                <DeletePost postId={post._id} />
              </div>
            )}
          </div>
          <h2 dangerouslySetInnerHTML={{ __html: post.title }}></h2>
          <div className="post-detail__thumbnail">
            <img
              src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${post.thumbnail}`}
              alt={post.title || 'Post thumbnail'}
            />
          </div>
          <p dangerouslySetInnerHTML={{ __html: post.description }}></p>

          {/* Always Visible Social Share Icons */}
          <div className="social-share-icons">
            <h4>Share this post</h4>
            <SocialShare post={post} isVisible={true} />
          </div>
        </div>
      )}
      <BackButton />
    </section>
  );
}

export default PostDetail;