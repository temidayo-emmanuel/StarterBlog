import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostItem from './PostItem';
import SkeletonLoader from '../components/SkeletonLoader';
import LoaderGif from '../images/loader.gif'; // Import your loader GIF

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(3); // Initially show 3 posts
    const [loading, setLoading] = useState(false);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false); // For "Load More" loader
    const [hasMorePosts, setHasMorePosts] = useState(false);


    // Fetch posts from the API
    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`);
            if (response?.data?.length > 0) {
                const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(sortedPosts);
                setHasMorePosts(sortedPosts.length > visibleCount);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle "Load More" button click
    const handleLoadMore = () => {
        setLoadMoreLoading(true);

        setTimeout(() => {
            setVisibleCount((prevCount) => {
                const newCount = prevCount + 3;
                if (newCount >= posts.length) {
                    setHasMorePosts(false); // No more posts to load
                }
                return newCount;
            });
            setLoadMoreLoading(false);
        }, 1000); // Simulate delay
    };

    // Initial fetch when the component is mounted
    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <section className="posts">
            {loading ? (
                <div className="container posts__container">
                    {[...Array(3)].map((_, index) => (
                        <SkeletonLoader key={index} />
                    ))}
                </div>
            ) : posts.length > 0 ? (
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
                <h2 className="center">No posts found</h2>
            )}

            {hasMorePosts && (
                <div className="center">
                    {!loadMoreLoading && (
                        <button className="btn load-more" onClick={handleLoadMore}>
                            Load More
                        </button>
                    )}

                    {loadMoreLoading && <img src={LoaderGif} alt="Loading..." className="loader-gif" />}
                </div>
            )}
        </section>
    );
};

export default Posts;