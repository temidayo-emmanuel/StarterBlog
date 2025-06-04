import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import PostItem from '../components/PostItem';
import Loader from '../components/Loader';
import BackButton from '../components/BackButton';

const AuthorPosts = () => {
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); // Number of posts to display at a time
  const [loading, setLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(false); // To track if more posts can be loaded
  const { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/users/${id}`);
        const sortedPosts = response?.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by most recent
        setPosts(sortedPosts);
        setHasMorePosts(sortedPosts.length > visibleCount);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchPosts();
  }, [id, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => {
      const newCount = prevCount + 3;
      if (newCount >= posts.length) {
        setHasMorePosts(false); // No more posts to load
      }
      return newCount;
    });
  };

  if (loading && posts.length === 0) {
    return <Loader />;
  }

  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts__container">
          {posts.slice(0, visibleCount).map(({ _id: id, thumbnail, category, title, description, creator, createdAt }) => (
            <PostItem
              key={id}
              postID={id}
              thumbnail={thumbnail}
              category={category}
              title={title}
              description={description}
              authorID={creator}
              createdAt={createdAt}
            />
          ))}
        </div>
      ) : (
        <h2 className="center">No posts found by this user</h2>
      )}

      {/* "Load More" button */}
      {hasMorePosts && (
        <div className="center">
          <button className="btn load-more" onClick={handleLoadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      <BackButton />
    </section>
  );
};

export default AuthorPosts;